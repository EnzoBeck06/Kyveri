import { useEffect } from "react";

export default function useSiteNavigation(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const header = root.querySelector(".site-header");
    const links = [...root.querySelectorAll('.navigation a[href^="#"]')];
    const targets = links
      .map((link) => ({ link, element: root.querySelector(link.getAttribute("href")) }))
      .filter(({ element }) => element);
    let frame = 0;

    function updateNavigation() {
      header.classList.toggle("is-scrolled", window.scrollY > 16);
      let current = targets[0];

      for (const target of targets) {
        if (target.element.getBoundingClientRect().top <= window.innerHeight * 0.35) {
          current = target;
        }
      }

      if (
        window.scrollY > 0 &&
        Math.ceil(window.scrollY + window.innerHeight) >=
          document.documentElement.scrollHeight - 2
      ) {
        current = targets[targets.length - 1];
      }

      for (const { link } of targets) {
        const active = link === current?.link;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
      frame = 0;
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateNavigation);
    }

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    updateNavigation();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [rootRef]);
}
