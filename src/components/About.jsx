import { assets } from "../assets.js";
import { Icon } from "./Icon.jsx";

const principles = [
  ["diamond", <>Foco em<br />qualidade</>],
  ["layers", <>Atendimento<br />personalizado</>],
  ["bolt", <>Navegação<br />intuitiva</>],
  ["pages", <>Landing Pages<br />personalizadas</>],
];

export default function About() {
  return (
    <section
      id="sobre"
      className="section about-section container"
      aria-labelledby="about-title"
    >
      <figure className="about-visual" data-reveal>
        <picture>
          <source srcSet={assets.studio.webp} type="image/webp" />
          <img
            src={assets.studio.fallback}
            width="1536"
            height="1024"
            loading="lazy"
            alt="Composição ilustrativa de um escritório em tons escuros com laptop Kyveri e iluminação quente."
          />
        </picture>
        <figcaption>Ambiente conceitual</figcaption>
      </figure>
      <div className="about-copy" data-reveal>
        <p className="eyebrow">Sobre</p>
        <h2 id="about-title">
          Uma presença digital<br />feita com propósito.
        </h2>
        <p>
          A Kyveri cria Landing Pages modernas, funcionais e personalizadas, com
          atenção à clareza, consistência visual e navegação.
        </p>
        <a className="button button-primary" href="#about-details">
          Conheça a Kyveri
          <Icon name="arrow" />
        </a>
        <div id="about-details" className="about-details">
          <p>
            Cada página parte do contexto do negócio. Conteúdo, direção visual e
            navegação são organizados para comunicar a proposta com clareza.
          </p>
        </div>
        <ul className="about-principles">
          {principles.map(([icon, label]) => (
            <li key={icon}>
              <Icon name={icon} />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
