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

      motion.add("(prefers-reduced-motion: no-preference)", () => {
        const mobile = window.matchMedia("(max-width: 720px)").matches;
        const tablet = window.matchMedia(
          "(min-width: 721px) and (max-width: 900px)",
        ).matches;
        const distance = mobile ? 10 : tablet ? 13 : 17;
        const select = (selector) => [...root.querySelectorAll(selector)];
        const one = (selector) => root.querySelector(selector);

        const sectionTimeline = (trigger) =>
          gsap.timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
              trigger,
              start: "top 78%",
              toggleActions: "play none none none",
              once: true,
            },
          });

        const reveal = (timeline, selector, options = {}, position) => {
          const targets = select(selector);
          if (!targets.length) return;
          timeline.from(
            targets,
            {
              autoAlpha: 0,
              y: options.y ?? distance,
              duration: options.duration ?? (mobile ? 0.42 : 0.5),
              stagger: options.stagger ?? 0,
              scale: options.scale,
              ease: options.ease || "power2.out",
              clearProps: "transform,opacity,visibility",
            },
            position,
          );
        };

        const hero = gsap.timeline({ defaults: { ease: "power2.out" } });
        hero.from(select(".site-header .header-inner"), {
          autoAlpha: 0,
          y: -5,
          duration: 0.32,
          clearProps: "transform,opacity,visibility",
        });
        hero.from(
          select(".hero-copy .eyebrow"),
          { autoAlpha: 0, y: 6, duration: 0.3, clearProps: "transform,opacity,visibility" },
          "-=0.14",
        );
        hero.from(
          select(".hero-copy h1"),
          {
            autoAlpha: 0,
            y: 16,
            duration: 0.52,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
          },
          "-=0.04",
        );
        hero.from(
          select(".hero-copy > .description"),
          { autoAlpha: 0, y: 8, duration: 0.38, clearProps: "transform,opacity,visibility" },
          "-=0.24",
        );
        hero.from(
          select(".hero-actions .button"),
          {
            autoAlpha: 0,
            y: 7,
            duration: 0.36,
            stagger: mobile ? 0.045 : 0.07,
            clearProps: "transform,opacity,visibility",
          },
          "-=0.18",
        );
        hero.from(
          select(".hero-indicators li"),
          {
            autoAlpha: 0,
            y: 6,
            duration: 0.32,
            stagger: mobile ? 0.035 : 0.055,
            clearProps: "transform,opacity,visibility",
          },
          "-=0.14",
        );
        hero.from(
          select(".hero-visual"),
          {
            autoAlpha: 0,
            scale: 0.995,
            y: 6,
            duration: 0.65,
            clearProps: "transform,opacity,visibility",
          },
          "-=0.2",
        );
        hero.from(
          select(".scroll-cue"),
          { autoAlpha: 0, duration: 0.22, clearProps: "transform,opacity,visibility" },
          "-=0.25",
        );

        const services = sectionTimeline(one("#servicos"));
        reveal(services, "#servicos .section-heading .eyebrow");
        reveal(services, "#servicos .section-heading h2", { duration: 0.46 }, "-=0.22");
        reveal(services, "#servicos .section-description", { y: 8, duration: 0.4 }, "-=0.2");
        reveal(services, "#servicos .section-heading > .button", { y: 7, duration: 0.36 }, "-=0.25");
        reveal(services, "#servicos .service-card", { y: 9, duration: 0.45, stagger: mobile ? 0.055 : 0.085 }, "-=0.08");

        const projects = sectionTimeline(one("#projetos"));
        reveal(projects, "#projetos .section-heading .eyebrow");
        reveal(projects, "#projetos .section-heading h2", { duration: 0.46 }, "-=0.22");
        reveal(projects, "#projetos .section-description", { y: 8, duration: 0.4 }, "-=0.2");
        reveal(projects, "#projetos .section-heading > .button", { y: 7, duration: 0.36 }, "-=0.24");

        const projectCards = select("#projetos .project-card");
        projectCards.forEach((card, index) => {
          const image = card.querySelector(".project-art img");
          const info = card.querySelector(".project-info");
          const openButton = card.querySelector(".project-open");
          const cardStart = index === 0 ? "-=0.08" : ">-0.56";
          projects.from(
            card,
            { autoAlpha: 0, y: 8, scale: 0.997, duration: 0.38, clearProps: "transform,opacity,visibility" },
            cardStart,
          );
          if (image) {
            projects.from(
              image,
              { clipPath: "inset(0 0 6% 0)", duration: 0.5, clearProps: "clipPath" },
              "<",
            );
          }
          if (info) {
            projects.from(
              info,
              { autoAlpha: 0, y: 5, duration: 0.34, clearProps: "transform,opacity,visibility" },
              ">-0.22",
            );
          }
          if (openButton) {
            projects.from(
              openButton,
              { autoAlpha: 0, scale: 0.97, duration: 0.24, clearProps: "transform,opacity,visibility" },
              ">-0.14",
            );
          }
        });

        const about = sectionTimeline(one("#sobre"));
        reveal(about, "#sobre .about-visual", { y: 9, duration: 0.56 });
        reveal(about, "#sobre .about-copy .eyebrow", { y: 6, duration: 0.3 }, "-=0.28");
        reveal(about, "#sobre .about-copy h2", { y: distance, duration: 0.48 }, "-=0.12");
        reveal(about, "#sobre .about-copy > p:not(.eyebrow)", { y: 7, duration: 0.38 }, "-=0.2");
        reveal(about, "#sobre .about-copy > .button", { y: 6, duration: 0.34 }, "-=0.16");
        reveal(about, "#sobre .about-principles li", { y: 6, duration: 0.34, stagger: mobile ? 0.035 : 0.055 }, "-=0.1");

        const contact = sectionTimeline(one("#contato"));
        reveal(contact, "#contato .contact-copy .eyebrow", { y: 6, duration: 0.3 });
        reveal(contact, "#contato .contact-copy h2", { y: distance + 2, duration: 0.52, ease: "power3.out" }, "-=0.12");
        reveal(contact, "#contato .contact-copy > p:not(.eyebrow)", { y: 7, duration: 0.4 }, "-=0.18");
        reveal(contact, "#contato .contact-copy > .button", { y: 6, duration: 0.36 }, "-=0.14");
        reveal(contact, "#contato .contact-visual", { y: 12, duration: 0.62 }, "-=0.12");

        const parallax = gsap.matchMedia();
        parallax.add("(min-width: 901px)", () => {
          const heroImage = one(".hero-visual img");
          const aboutImage = one(".about-visual img");
          if (heroImage) {
            gsap.to(heroImage, {
              yPercent: 1.5,
              ease: "none",
              scrollTrigger: {
                trigger: one(".hero"),
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          }
          if (aboutImage) {
            gsap.to(aboutImage, {
              yPercent: -1,
              ease: "none",
              scrollTrigger: {
                trigger: one("#sobre"),
                start: "top bottom",
                end: "bottom top",
                scrub: 0.7,
              },
            });
          }
        });
        return () => parallax.revert();
      });

      return () => motion.revert();
    }, root);

    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      window.cancelAnimationFrame(refreshFrame);
      context.revert();
    };
  }, [rootRef]);
}
