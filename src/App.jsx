import { useRef, useState } from "react";
import About from "./components/About.jsx";
import BriefingDialog from "./components/BriefingDialog.jsx";
import Comparison from "./components/Comparison.jsx";
import Contact from "./components/Contact.jsx";
import FAQ from "./components/FAQ.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import { IconLibrary } from "./components/Icon.jsx";
import Projects from "./components/Projects.jsx";
import Process from "./components/Process.jsx";
import Services from "./components/Services.jsx";
import useGsapAnimations from "./hooks/useGsapAnimations.js";
import useSiteNavigation from "./hooks/useSiteNavigation.js";

export default function App() {
  const rootRef = useRef(null);
  const [briefingOpen, setBriefingOpen] = useState(false);

  useGsapAnimations(rootRef);
  useSiteNavigation(rootRef);

  const requestBriefing = () => setBriefingOpen(true);

  return (
    <div ref={rootRef}>
      <IconLibrary />
      <Header onRequestBriefing={requestBriefing} />
      <main>
        <div className="hero-services">
          <div className="hero-atmosphere" aria-hidden="true">
            <div className="hero-atmosphere-light" />
          </div>
          <Hero onRequestBriefing={requestBriefing} />
          <Services />
        </div>
        <Process onRequestBriefing={requestBriefing} />
        <Comparison />
        <Projects />
        <About />
        <FAQ onRequestBriefing={requestBriefing} />
        <Contact onRequestBriefing={requestBriefing} />
      </main>
      <Footer />
      <BriefingDialog open={briefingOpen} onClose={() => setBriefingOpen(false)} />
    </div>
  );
}
