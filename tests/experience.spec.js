import { expect, test } from "@playwright/test";
import { buildBriefingMessage } from "../src/utils/briefing.js";

const viewports = [
  { width: 320, height: 700 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
];

async function fillBriefing(dialog) {
  await dialog.getByLabel("Seu nome").fill("Pessoa de teste");
  await dialog.getByLabel("Tipo de projeto").selectOption("Redesign de Landing Page");
  await dialog.getByLabel("Objetivo principal").fill("Apresentar meu serviço");
  await dialog.getByLabel("Descrição do projeto").fill("Uma página com apresentação e contato.");
}

for (const viewport of viewports) {
  test(`experiência comercial em ${viewport.width} × ${viewport.height}`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const range = page.getByRole("slider", { name: "Posição da divisão antes e depois" });
    await range.focus();
    await page.keyboard.press("Home");
    await expect(range).toHaveValue("0");
    await expect(range).toHaveAttribute("aria-valuetext", "0% antes e 100% depois");
    await page.keyboard.press("End");
    await expect(range).toHaveValue("100");
    await page.keyboard.press("ArrowLeft");
    await expect(range).toHaveValue("99");
    await page.keyboard.press("ArrowRight");
    await expect(range).toHaveValue("100");

    const stage = page.locator(".comparison-stage");
    await stage.scrollIntoViewIfNeeded();
    const bounds = await stage.boundingBox();
    await page.mouse.move(bounds.x + bounds.width * .25, bounds.y + bounds.height / 2);
    await page.mouse.down();
    await page.mouse.move(bounds.x + bounds.width * .75, bounds.y + bounds.height / 2, { steps: 8 });
    await page.mouse.up();
    await expect.poll(async () => Number(await range.inputValue())).toBe(75);

    await expect(page.locator(".process-timeline > li")).toHaveCount(6);
    const questions = page.locator(".faq-item h3 button");
    await expect(questions).toHaveCount(6);
    await questions.first().focus();
    await page.keyboard.press("Enter");
    await expect(questions.first()).toHaveAttribute("aria-expanded", "true");
    const panelId = await questions.first().getAttribute("aria-controls");
    await expect(page.locator(`#${panelId}`)).toBeVisible();
    await page.keyboard.press("Space");
    await expect(page.locator(`#${panelId}`)).toBeHidden();

    const open = page.locator(".contact-copy button");
    await open.click();
    const dialog = page.locator(".briefing-dialog");
    await fillBriefing(dialog);
    await dialog.getByRole("button", { name: "Revisar mensagem" }).click();
    await expect(dialog.getByRole("heading", { name: "Confira sua mensagem." })).toBeFocused();
    await expect(dialog.getByLabel("Mensagem preparada para WhatsApp")).toHaveValue(/Tipo de projeto: Redesign de Landing Page/);
    await dialog.getByRole("button", { name: "Abrir no WhatsApp" }).scrollIntoViewIfNeeded();
    expect(await dialog.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(false);
    await page.keyboard.press("Escape");
    await expect(open).toBeFocused();

    const layout = await page.evaluate(() => {
      const headerLogo = document.querySelector(".header-inner > .wordmark").getBoundingClientRect();
      const nav = document.querySelector("#main-nav");
      const navBox = nav.getBoundingClientRect();
      return {
        overflow: document.documentElement.scrollWidth > innerWidth,
        overlappingNavigation: getComputedStyle(nav).display !== "none" && headerLogo.right > navBox.left,
        brokenAnchors: [...document.querySelectorAll('a[href^="#"]')].filter((link) => !document.querySelector(link.getAttribute("href"))).length,
      };
    });
    expect(layout).toEqual({ overflow: false, overlappingNavigation: false, brokenAnchors: 0 });
    expect(errors).toEqual([]);
  });
}

for (const width of [320, 390]) {
  test(`comparador responde a arraste por toque em ${width}px`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width, height: 844 }, hasTouch: true, isMobile: true, reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:5173/");
    const stage = page.locator(".comparison-stage");
    await stage.scrollIntoViewIfNeeded();
    const box = await stage.boundingBox();
    const session = await context.newCDPSession(page);
    const y = box.y + box.height / 2;
    await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: box.x + box.width * .2, y }] });
    for (let index = 1; index <= 6; index += 1) {
      await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: box.x + box.width * (.2 + index * .1), y }] });
    }
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect(page.getByRole("slider")).toHaveValue("80");
    await context.close();
  });
}

test("FAQ comunica expansão e mantém só uma resposta aberta", async ({ page }) => {
  await page.goto("/");
  const buttons = page.locator(".faq-item h3 button");
  for (const button of await buttons.all()) {
    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    const panel = page.locator(`#${await button.getAttribute("aria-controls")}`);
    await expect(panel).toHaveAttribute("aria-labelledby", await button.getAttribute("id"));
    await expect(panel).toBeVisible();
    await expect(page.locator(".faq-panel:not([hidden])")).toHaveCount(1);
  }
});

test("briefing permite revisar e editar sem transmitir dados", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => { window.__opened = []; window.open = (...args) => { window.__opened.push(args); }; });
  await page.locator(".hero-actions").getByRole("link", { name: /Solicitar orçamento/ }).click();
  const dialog = page.locator(".briefing-dialog");
  await fillBriefing(dialog);
  await dialog.getByLabel("Empresa ou negócio").fill("Negócio de teste");
  await dialog.getByLabel("Segmento").fill("Serviços");
  await dialog.getByLabel("Informações adicionais").fill("Texto com acentos, & e <tags>.");
  await dialog.getByRole("button", { name: "Revisar mensagem" }).click();
  const preview = dialog.getByLabel("Mensagem preparada para WhatsApp");
  await expect(preview).toHaveValue(/Negócio: Negócio de teste/);
  await expect(preview).toHaveValue(/Texto com acentos, & e <tags>\./);
  await dialog.getByRole("button", { name: "Voltar e editar" }).click();
  await expect(dialog.getByLabel("Seu nome")).toBeFocused();
  await expect(dialog.getByLabel("Descrição do projeto")).toHaveValue("Uma página com apresentação e contato.");
  await dialog.getByLabel("Objetivo principal").fill("Apresentar um portfólio");
  await dialog.getByRole("button", { name: "Revisar mensagem" }).click();
  await expect(preview).toHaveValue(/Objetivo principal: Apresentar um portfólio/);
  await dialog.getByRole("button", { name: "Abrir no WhatsApp" }).click();
  await expect(dialog.getByRole("status")).toContainText("não foi enviado");
  expect(await page.evaluate(() => window.__opened)).toEqual([]);
});

test("CTAs compartilham um único briefing e restauram o foco", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const selector of [".header-cta", ".hero-actions .button-primary", ".process-section .button", ".faq-section .button", ".contact-copy button"]) {
    const trigger = page.locator(selector);
    await trigger.click();
    await expect(page.locator(".briefing-dialog")).toHaveCount(1);
    await expect(page.locator(".briefing-dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
  }
});

test("mensagem de briefing inclui campos e omite opcionais vazios", () => {
  const message = buildBriefingMessage({ name: "  Ana  ", projectType: "Landing Page", goal: "Contato", description: "Página de serviços.", notes: "  " });
  expect(message).toContain("Nome: Ana\nTipo de projeto: Landing Page");
  expect(message).toContain("Objetivo principal: Contato\nDescrição do projeto: Página de serviços.");
  expect(message).not.toContain("Negócio:");
  expect(message).not.toContain("Informações adicionais:");
});

test("janela curta e zoom emulado mantêm os controles utilizáveis", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 450 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator(".hero-actions").getByRole("link", { name: /Solicitar orçamento/ }).click();
  const dialog = page.locator(".briefing-dialog");
  await expect(dialog.getByLabel("Seu nome")).toBeFocused();
  await expect(dialog.getByLabel("Seu nome")).toBeInViewport({ ratio: 1 });
  await fillBriefing(dialog);
  await dialog.getByRole("button", { name: "Revisar mensagem" }).click();
  await dialog.getByRole("button", { name: "Abrir no WhatsApp" }).scrollIntoViewIfNeeded();
  expect(await dialog.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(false);
  await page.keyboard.press("Escape");

  const session = await page.context().newCDPSession(page);
  await session.send("Emulation.setPageScaleFactor", { pageScaleFactor: 2 });
  expect(await page.evaluate(() => visualViewport.scale)).toBe(2);
  const range = page.getByRole("slider");
  await range.focus();
  await page.keyboard.press("Home");
  await expect(range).toHaveValue("0");
  expect(await page.locator(".comparison-stage").evaluate((element) => getComputedStyle(element).touchAction)).toContain("pinch-zoom");
  const question = page.locator(".faq-item h3 button").first();
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await session.send("Emulation.setPageScaleFactor", { pageScaleFactor: 1 });
});

test("GSAP limpa gatilhos em StrictMode, desmontagem e movimento reduzido", async ({ page }) => {
  await page.route("**/src/main.jsx*", (route) => route.fulfill({ contentType: "text/javascript", body: "" }));
  await page.goto("/");
  await page.evaluate(async () => {
    const [{ default: React }, dom, { default: App }] = await Promise.all([
      import("/node_modules/.vite/deps/react.js"), import("/node_modules/.vite/deps/react-dom_client.js"), import("/src/App.jsx"),
    ]);
    const createRoot = dom.createRoot || dom.default.createRoot;
    window.mountTest = () => {
      window.testRoot = createRoot(document.getElementById("root"));
      window.testRoot.render(React.createElement(React.StrictMode, null, React.createElement(App)));
    };
    window.mountTest();
  });
  const triggers = () => page.evaluate(async () => {
    const url = performance.getEntriesByType("resource").find((entry) => /gsap_ScrollTrigger/.test(entry.name))?.name;
    if (!url) return { total: -1, backdrop: -1 };
    const { ScrollTrigger } = await import(url);
    return { total: ScrollTrigger.getAll().length, backdrop: ScrollTrigger.getAll().filter((trigger) => trigger.vars.id === "hero-services-atmosphere").length };
  });
  await expect.poll(async () => (await triggers()).backdrop).toBe(1);
  await page.evaluate(() => window.testRoot.unmount());
  expect((await triggers()).total).toBe(0);
  await page.evaluate(() => window.mountTest());
  await expect.poll(async () => (await triggers()).backdrop).toBe(1);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect.poll(async () => (await triggers()).backdrop).toBe(1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(async () => (await triggers()).total).toBe(0);
  await page.evaluate(() => window.testRoot.unmount());
});
