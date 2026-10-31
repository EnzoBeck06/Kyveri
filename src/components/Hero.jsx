import { assets } from "../assets.js";
import { Icon } from "./Icon.jsx";
import WhatsAppLink from "./WhatsAppLink.jsx";

export default function Hero({ onRequestBriefing }) {
  return (
    <section
      id="inicio"
      className="hero"
      aria-labelledby="hero-title"
      tabIndex="-1"
    >
      <div className="hero-inner container">
        <div className="hero-copy">
          <p className="eyebrow">Design & desenvolvimento</p>
          <h1 id="hero-title">
            Sua ideia merece uma presença digital <span>à altura.</span>
          </h1>
          <p className="description">
            Landing Pages com design personalizado, clareza e atenção aos detalhes.
            Uma presença própria para apresentar o seu negócio.
          </p>
          <div className="hero-actions">
            <WhatsAppLink
              className="button button-primary"
              onRequestBriefing={onRequestBriefing}
            >
              <Icon name="whatsapp" />
              Solicitar orçamento
              <Icon name="arrow" />
            </WhatsAppLink>
            <a className="button button-secondary" href="#projetos">
              Ver projetos
              <Icon name="arrow" />
            </a>
          </div>
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
        <div className="hero-bottom">
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
          <a
            className="scroll-cue"
            href="#servicos"
            aria-label="Conheça nossos serviços"
          >
            <span aria-hidden="true">Explore os serviços</span>
            <Icon name="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
