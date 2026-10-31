import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useGsapAnimations(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const context = gsap.context(() => {
      const motion = gsap.matchMedia();
      motion.add(
        {
          allowMotion: "(prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 720px)",
          desktop: "(min-width: 721px)",
        },
        ({ conditions }) => {
          if (!conditions.allowMotion) return;
          const mobile = conditions.mobile;
          const one = (selector) => root.querySelector(selector);
          const all = (selector) => [...root.querySelectorAll(selector)];
          const hero = one(".hero");
          const services = one("#servicos");
          const light = one(".hero-atmosphere-light");

          if (hero && services && light) {
            gsap.fromTo(light, { y: 0 }, {
              y: () => Math.min(hero.offsetHeight * 0.025, mobile ? 8 : 18),
              ease: "none",
              scrollTrigger: {
                id: "hero-services-atmosphere",
                trigger: hero,
                start: "top top",
                endTrigger: services,
                end: "top 15%",
                scrub: 0.9,
                invalidateOnRefresh: true,
              },
            });
          }

          // Short entrances leave content at its native CSS position afterwards.
          if (hero && window.scrollY < hero.offsetTop + hero.offsetHeight) {
            const intro = gsap.timeline({ defaults: {
              ease: "power2.out", duration: 0.55,
              clearProps: "transform,opacity,visibility",
            } });
            intro.from(all(".hero-copy > .eyebrow, .hero-copy > h1, .hero-copy > .description, .hero-actions"), {
              autoAlpha: 0, y: mobile ? 8 : 12, stagger: 0.08,
            });
            intro.from(one(".hero-visual"), { autoAlpha: 0, duration: 0.75 }, 0.12);
          }

          const reveal = (targets, trigger) => {
            if (!targets.length) return;
            gsap.from(targets, {
              autoAlpha: 0,
              y: mobile ? 8 : 14,
              duration: 0.6,
              stagger: 0.07,
              ease: "power2.out",
              clearProps: "transform,opacity,visibility",
              scrollTrigger: { trigger, start: "top 90%", once: true },
            });
          };

          for (const heading of all(".section-heading")) {
            reveal([...heading.children], heading);
          }
          // Each card enters when reached, including lower rows on narrow screens.
          for (const card of all(".service-card")) reveal([card], card);
          for (const card of all(".project-card")) {
            reveal([...card.children], card);
          }
          for (const step of all(".process-step")) {
            reveal([...step.querySelectorAll(".process-step-index, h3, p")], step);
            gsap.from(step.querySelector(".process-rail"), {
              ...(mobile ? { scaleY: 0 } : { scaleX: 0 }),
              transformOrigin: "top left",
              ease: "none",
              scrollTrigger: {
                trigger: step,
                start: "top 85%",
                end: "top 50%",
                scrub: 0.5,
              },
            });
          }
          for (const element of all(".about-visual, .about-copy, .contact-copy, .contact-visual")) {
            reveal([element], element);
          }
        },
      );
      return () => motion.revert();
    }, root);

    let frame = 0;
    let disposed = false;
    const scheduleRefresh = () => {
      if (disposed || frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        ScrollTrigger.refresh();
      });
    };
    // Fonts, expanded details and responsive reflow can move section boundaries.
    const observer = new ResizeObserver(scheduleRefresh);
    observer.observe(root);
    document.fonts.ready.then(scheduleRefresh);
    scheduleRefresh();

    return () => {
      disposed = true;
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      context.revert();
    };
  }, [rootRef]);
}
