import { Icon } from "./Icon.jsx";

const services = [
  {
    icon: "monitor",
    title: "Landing Pages",
    summary: "Páginas dedicadas a apresentar sua oferta com clareza.",
    detail:
      "Uma estrutura pensada para comunicar sua proposta e orientar o visitante ao próximo passo.",
  },
  {
    icon: "pen",
    title: "Design personalizado",
    summary: "Linguagem visual alinhada ao seu negócio.",
    detail:
      "Composição, cor e tipografia aplicadas de forma consistente à apresentação da sua marca.",
  },
  {
    icon: "pages",
    title: "Experiência responsiva",
    summary: "Conteúdo organizado para diferentes telas.",
    detail:
      "Layout planejado para facilitar leitura e interação em celulares, tablets e computadores.",
  },
  {
    icon: "phone",
    title: "Contato facilitado",
    summary: "Um caminho simples para iniciar uma conversa.",
    detail:
      "Integração com canais de contato, como WhatsApp, quando o canal oficial estiver configurado.",
  },
];

export default function Services() {
  return (
    <section
      id="servicos"
      className="section services-section container"
      aria-labelledby="services-title"
    >
      <div className="section-heading" data-reveal>
        <div>
          <p className="eyebrow">Serviços</p>
          <h2 id="services-title">
            Landing Pages<br />para o seu negócio.
          </h2>
          <p className="section-description">
            Planejamento, design e desenvolvimento para apresentar sua oferta
            com clareza e facilitar o contato.
          </p>
        </div>
        <a className="button button-outline" href="#services-grid">
          Explorar capacidades
          <Icon name="arrow" />
        </a>
      </div>
      <div id="services-grid" className="service-grid">
        {services.map(({ icon, title, summary, detail }) => (
          <article className="service-card" data-reveal key={title}>
            <Icon name={icon} className="service-icon" />
            <h3>{title}</h3>
            <p>{summary}</p>
            <details>
              <summary>
                Saiba mais
                <Icon name="arrow" />
              </summary>
              <div className="service-detail">
                {detail}
                <a href="#contato">Conversar sobre este serviço →</a>
              </div>
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}
