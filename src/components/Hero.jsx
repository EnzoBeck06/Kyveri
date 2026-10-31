import { assets } from "../assets.js";
import { Icon } from "./Icon.jsx";
import WhatsAppLink from "./WhatsAppLink.jsx";

export default function Hero({ onWhatsAppUnavailable }) {
  return (
    <section
      id="inicio"
      className="hero"
      aria-labelledby="hero-title"
      tabIndex="-1"
    >
      <div className="hero-inner container">
        <div className="hero-copy">
          <p className="eyebrow">Agência digital</p>
          <h1 id="hero-title">
            Sua ideia merece uma presença digital <span>à altura.</span>
          </h1>
          <p className="description">
            Criamos Landing Pages estratégicas, responsivas e pensadas para
            comunicar com clareza, transmitir valor e transformar ideias em
            experiências digitais.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projetos">
              Ver projetos
              <Icon name="arrow" />
            </a>
            <WhatsAppLink
              className="button button-secondary"
              onUnavailable={onWhatsAppUnavailable}
            >
              <Icon name="whatsapp" />
              Solicitar orçamento
              <Icon name="arrow" />
            </WhatsAppLink>
          </div>
          <ul className="hero-indicators" aria-label="Nossa proposta">
            <li>
              <span>Conceitos</span>
              <small>demonstrativos</small>
            </li>
            <li>
              <span>Design</span>
              <small>estratégico</small>
            </li>
            <li>
              <span>Experiência</span>
              <small>bem pensada</small>
            </li>
          </ul>
        </div>
        <figure className="hero-visual">
          <picture>
            <source srcSet={assets.hero.webp} type="image/webp" />
            <img
              src={assets.hero.fallback}
              width="1536"
              height="1024"
              fetchPriority="high"
              alt="Notebook e smartphone sobre pedra escura apresentam uma demonstração do site Kyveri."
            />
          </picture>
        </figure>
        <a
          className="scroll-cue"
          href="#servicos"
          aria-label="Conheça nossos serviços"
        >
          <span aria-hidden="true">EXPLORE · KYVERI</span>
          <Icon name="arrow" />
        </a>
      </div>
    </section>
  );
}
