import { Icon } from "./Icon.jsx";

const steps = [
  ["Primeiro contato", "Você compartilha a ideia, o contexto do negócio e o que gostaria de criar."],
  ["Briefing", "Organizamos os objetivos, o público e as informações que a página precisa apresentar."],
  ["Planejamento", "Definimos a estrutura do conteúdo e a direção visual para comunicar a proposta."],
  ["Design e desenvolvimento", "Transformamos a direção escolhida em uma página com identidade e atenção às diferentes telas."],
  ["Revisão e ajustes", "Conferimos a apresentação e as interações para alinhar os detalhes do projeto."],
  ["Entrega", "Organizamos a entrega do projeto de acordo com o escopo combinado."],
];

export default function Process({ onRequestBriefing }) {
  return (
    <section id="processo" className="section process-section container" aria-labelledby="process-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Processo</p>
          <h2 id="process-title">Da primeira ideia<br />à entrega.</h2>
          <p className="section-description">
            Clareza em cada etapa. Um projeto começa com a sua ideia e ganha forma nas decisões de conteúdo, design e desenvolvimento.
          </p>
        </div>
        <button className="button button-outline" type="button" onClick={onRequestBriefing}>
          Vamos conversar <Icon name="arrow" />
        </button>
      </div>
      <ol className="process-timeline">
        {steps.map(([title, description], index) => (
          <li className="process-step" key={title}>
            <span className="process-rail" aria-hidden="true" />
            <span className="process-step-index" aria-hidden="true">0{index + 1}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </li>
        ))}
      </ol>
      <p className="process-note">O escopo, as etapas e as condições são alinhados para cada projeto.</p>
    </section>
  );
}
