import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";

const here = path.dirname(fileURLToPath(import.meta.url));
const screenshotsDir = path.resolve(here, "../test-results/screenshots");
const viewports = [
  { width: 320, height: 700 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
];

async function settleVisuals(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const images = [...document.images];
    images.forEach((image) => { image.loading = "eager"; });
    await Promise.all(images.map((image) => image.decode().catch(() => undefined)));
    for (const section of document.querySelectorAll("main section")) {
      window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY, behavior: "instant" });
      await new Promise((resolve) => window.setTimeout(resolve, 700));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(500);
}

function collectRuntimeProblems(page) {
  const errors = [];
  const failedRequests = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("requestfailed", (request) => {
    if (request.url().startsWith("http://127.0.0.1:5173/")) {
      failedRequests.push(`${request.method()} ${request.url()}: ${request.failure()?.errorText}`);
    }
  });
  page.on("response", (response) => {
    if (response.status() >= 400 && response.url().startsWith("http://127.0.0.1:5173/")) {
      failedRequests.push(`${response.status()} ${response.url()}`);
    }
  });
  return { errors, failedRequests };
}

test.describe("KYVERI 3.0 — responsividade e screenshots", () => {
  for (const { width, height } of viewports) {
    test(`${width} × ${height}`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      const runtime = collectRuntimeProblems(page);
      await page.goto("/", { waitUntil: "networkidle" });
      await settleVisuals(page);

      await mkdir(screenshotsDir, { recursive: true });
      await page.screenshot({
        path: path.join(screenshotsDir, `${width}x${height}.png`),
        fullPage: true,
        animations: "disabled",
      });

      await expect(page).toHaveTitle(/KYVERI/i);
      await expect(page.locator("#hero-title")).toBeVisible();
      await expect(page.locator("#hero-title")).toContainText(/Sua ideia merece uma presença digital.*à altura\./s);

      for (const id of ["inicio", "servicos", "projetos", "sobre", "contato"]) {
        await expect(page.locator(`#${id}`), `seção #${id}`).toBeVisible();
      }

      const layout = await page.evaluate(() => {
        const width = document.documentElement.clientWidth;
        const boxes = [
          ["navigation", document.querySelector(".site-header")],
          ["headline", document.querySelector("#hero-title")],
          ["hero actions", document.querySelector(".hero-actions")],
          ["project grid", document.querySelector("#project-grid")],
          ["footer", document.querySelector(".site-footer")],
        ].filter(([, element]) => element && getComputedStyle(element).display !== "none")
          .map(([name, element]) => {
            const rect = element.getBoundingClientRect();
            return { name, left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) };
          });
        const imageResults = [...document.images].map((image) => ({
          alt: image.alt,
          src: image.currentSrc || image.src,
          loaded: image.complete && image.naturalWidth > 0,
        }));
        const rect = (selector) => {
          const element = document.querySelector(selector);
          if (!element) return null;
          const box = element.getBoundingClientRect();
          return { left: box.left, right: box.right, top: box.top, bottom: box.bottom };
        };
        const textRects = ["#hero-title", ".hero .description", ".hero-actions"].map(rect);
        const textOverlaps = [];
        for (let i = 0; i < textRects.length; i += 1) {
          for (let j = i + 1; j < textRects.length; j += 1) {
            const a = textRects[i];
            const b = textRects[j];
            if (a && b && a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top) {
              textOverlaps.push(`${i}:${j}`);
            }
          }
        }
        const contactImage = document.querySelector(".contact-visual img");
        const contactSection = document.querySelector("#contato");
        const imageBox = contactImage?.getBoundingClientRect();
        const sectionBox = contactSection?.getBoundingClientRect();
        const intersectionWidth = imageBox && sectionBox
          ? Math.max(0, Math.min(imageBox.right, sectionBox.right) - Math.max(imageBox.left, sectionBox.left))
          : 0;
        const intersectionHeight = imageBox && sectionBox
          ? Math.max(0, Math.min(imageBox.bottom, sectionBox.bottom) - Math.max(imageBox.top, sectionBox.top))
          : 0;
        const contactImageVisibleRatio = imageBox?.width && imageBox?.height
          ? Number(((intersectionWidth * intersectionHeight) / (imageBox.width * imageBox.height)).toFixed(2))
          : 0;
        return {
          viewport: width,
          document: document.documentElement.scrollWidth,
          boxes,
          images: imageResults,
          textOverlaps,
          contactImageVisibleRatio,
          fonts: {
            inter: document.fonts.check("16px Inter"),
            manrope: document.fonts.check("16px Manrope"),
          },
        };
      });

      expect(layout.document, `overflow horizontal: ${JSON.stringify(layout.boxes)}`).toBeLessThanOrEqual(width);
      expect(layout.boxes.filter((box) => box.left < -1 || box.right > width + 1), "elementos estruturais fora da largura visível").toEqual([]);
      expect(layout.images.filter((image) => !image.loaded), "imagens não carregadas").toEqual([]);
      expect(layout.fonts, "fontes de identidade carregadas").toEqual({ inter: true, manrope: true });
      expect(layout.textOverlaps, "headline, descrição e CTAs não devem se sobrepor").toEqual([]);
      if (layout.contactImageVisibleRatio < 0.55) {
        console.warn(`[visual audit ${width}x${height}] imagem de contato cortada pelo contêiner: ${layout.contactImageVisibleRatio} visível`);
      }
      expect(runtime.failedRequests, "recursos locais com falha").toEqual([]);
      expect(runtime.errors, "erros JavaScript/console").toEqual([]);
    });
  }
});

test.describe("KYVERI 3.0 — interações e animações", () => {
  test("navegação e menu mobile abrem, navegam e fecham", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const runtime = collectRuntimeProblems(page);
    await page.goto("/");
    const menu = page.locator(".menu-toggle");
    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#main-nav")).toBeVisible();

    await page.locator('#main-nav a[href="#servicos"]').click();
    await expect(page.locator(".menu-toggle")).toHaveAttribute("aria-expanded", "false");
    await expect(page).toHaveURL(/#servicos$/);
    await expect(page.locator("#servicos")).toBeFocused();
    await expect(runtime.errors, "erros JavaScript/console").toEqual([]);
  });

  test("navegação desktop percorre as âncoras da página", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const runtime = collectRuntimeProblems(page);
    await page.goto("/");
    await page.locator('#main-nav a[href="#projetos"]').click();
    await expect(page).toHaveURL(/#projetos$/);
    await expect(page.locator("#projetos")).toBeInViewport();
    await expect(runtime.errors, "erros JavaScript/console").toEqual([]);
  });

  test("modal de projeto e briefing de contato funcionam sem número inventado", async ({ page }) => {
    const runtime = collectRuntimeProblems(page);
    await page.goto("/");
    await page.evaluate(() => window.scrollTo({ top: document.querySelector("#projetos").offsetTop, behavior: "instant" }));
    await page.waitForTimeout(900);
    const openProject = page.locator(".project-open").first();
    await expect(openProject).toBeVisible();
    await openProject.click({ timeout: 8_000 });
    const projectDialog = page.locator("dialog.project-dialog");
    await expect(projectDialog).toBeVisible();
    await expect(projectDialog.locator("#dialog-title")).toBeVisible();
    await projectDialog.getByRole("button", { name: "Fechar demonstração" }).click();
    await expect(projectDialog).not.toBeVisible();

    await page.evaluate(() => window.scrollTo({ top: document.querySelector("#contato").offsetTop, behavior: "instant" }));
    await page.waitForTimeout(900);
    await page.locator(".contact-copy").getByRole("button", { name: /Solicitar orçamento/ }).click({ timeout: 8_000 });
    const briefing = page.locator("dialog.briefing-dialog");
    await expect(briefing).toBeVisible();
    await briefing.getByLabel("Seu nome").fill("Teste Playwright");
    await briefing.getByLabel("O que você gostaria de apresentar?").fill("Uma página demonstrativa.");
    await briefing.getByRole("button", { name: /Continuar no WhatsApp/ }).click();
    await expect(briefing.getByRole("status")).toContainText(/WhatsApp oficial ainda não foi configurado/i);
    await expect(runtime.errors, "erros JavaScript/console").toEqual([]);
  });

  test("CTA do WhatsApp informa que o número está pendente sem navegar para fora", async ({ page }) => {
    const runtime = collectRuntimeProblems(page);
    await page.goto("/");
    await page.locator(".hero-actions .button-secondary").click();
    await expect(page.getByRole("status")).toContainText(/canal de orçamentos estará disponível em breve/i);
    await expect(page).toHaveURL(/\/$/);
    await expect(runtime.errors, "erros JavaScript/console").toEqual([]);
  });

  test("GSAP e ScrollTrigger são carregados e movimento reduzido é respeitado", async ({ page }) => {
    const gsapRequests = [];
    page.on("request", (request) => {
      if (/gsap/i.test(request.url())) gsapRequests.push(request.url());
    });
    const runtime = collectRuntimeProblems(page);
    await page.goto("/");
    await expect.poll(() => gsapRequests.some((url) => /scroll.?trigger/i.test(url))).toBeTruthy();
    await page.locator("#servicos").scrollIntoViewIfNeeded();
    await expect(page.locator("#servicos .service-card").first()).toBeVisible();
    await expect(runtime.errors, "erros de animação").toEqual([]);

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    await expect(page.locator("#hero-title")).toBeVisible();
    await expect.poll(() => page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
    await expect.poll(() => page.locator("#hero-title").evaluate((element) => getComputedStyle(element).opacity)).toBe("1");
  });
});
