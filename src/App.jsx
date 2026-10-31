import { useEffect, useRef, useState } from "react";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import { IconLibrary } from "./components/Icon.jsx";
import Projects from "./components/Projects.jsx";
import Services from "./components/Services.jsx";
import useGsapAnimations from "./hooks/useGsapAnimations.js";
import useSiteNavigation from "./hooks/useSiteNavigation.js";

export default function App() {
  const rootRef = useRef(null);
  const [notice, setNotice] = useState("");

  useGsapAnimations(rootRef);
  useSiteNavigation(rootRef);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(""), 6500);
    const dismissOnEscape = (event) => {
      if (event.key === "Escape") setNotice("");
    };
    document.addEventListener("keydown", dismissOnEscape);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", dismissOnEscape);
    };
  }, [notice]);

  const showWhatsAppNotice = () =>
    setNotice("Nosso canal de orçamentos estará disponível em breve.");

  return (
    <div ref={rootRef}>
      <IconLibrary />
      <Header onWhatsAppUnavailable={showWhatsAppNotice} />
      <main>
        <Hero onWhatsAppUnavailable={showWhatsAppNotice} />
        <Services />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
      <div
        className="notice"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        hidden={!notice}
      >
        <p>{notice}</p>
        <button
          type="button"
          aria-label="Fechar aviso"
          onClick={() => setNotice("")}
        >
          ×
        </button>
      </div>
    </div>
  );
}
