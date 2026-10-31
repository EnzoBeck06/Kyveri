import { useEffect, useRef, useState } from "react";
import { assets } from "../assets.js";
import { Icon } from "./Icon.jsx";
import WhatsAppLink from "./WhatsAppLink.jsx";
import { navigationLinks } from "../config/navigation.js";

export default function Header({ onRequestBriefing }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;

    function closeOnOutsideClick(event) {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
    }

    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    }

    function closeOnDesktop() {
      setMenuOpen(false);
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    const desktop = window.matchMedia("(min-width: 721px)");
    desktop.addEventListener("change", closeOnDesktop);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [menuOpen]);

  function handleNavigationClick(event) {
    const link = event.target.closest("a[href^='#']");
    if (!link) return;

    const wasOpen = menuOpen;
    setMenuOpen(false);
    if (wasOpen) {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    }
  }

  return (
    <header className="site-header" ref={headerRef}>
      <div className="header-inner container">
        <a className="wordmark" href="#inicio" aria-label="Kyveri — Início">
          <img src={assets.mark} width="24" height="32" alt="" aria-hidden="true" />
          <span>KYVERI</span>
        </a>
        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-controls="main-nav"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
        </button>
        <nav
          id="main-nav"
          className={`navigation${menuOpen ? " is-open" : ""}`}
          aria-label="Navegação principal"
          onClick={handleNavigationClick}
        >
          {navigationLinks.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>
        <WhatsAppLink
          className="button button-primary header-cta"
          onRequestBriefing={onRequestBriefing}
        >
          <Icon name="whatsapp" />
          Solicitar orçamento
          <Icon name="arrow" />
        </WhatsAppLink>
      </div>
    </header>
  );
}
