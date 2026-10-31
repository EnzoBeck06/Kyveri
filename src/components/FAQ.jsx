import { useState } from "react";
import { Icon } from "./Icon.jsx";

const questions = [
  ["Como funciona a criação de uma Landing Page?", "A ideia passa por briefing, planejamento, design e desenvolvimento, revisão e entrega. O escopo e os detalhes de cada etapa são alinhados para o projeto."],
  ["Como solicitar um orçamento?", "Use Solicitar orçamento para organizar o briefing e revisar a mensagem antes de abrir o WhatsApp. Enquanto o número oficial não estiver configurado, as informações permanecem apenas nesta página."],
  ["A página funciona no celular?", "A experiência responsiva faz parte da proposta da Kyveri. Conteúdo, navegação e interações são organizados para diferentes tamanhos de tela."],
  ["Posso solicitar um design personalizado?", "Sim. A direção visual considera o contexto do negócio, sua identidade e o que a página precisa comunicar. O briefing é o ponto de partida para essa conversa."],
  ["O prazo depende da complexidade do projeto?", "O prazo é alinhado conforme o escopo, a complexidade e os materiais necessários. Esse ponto faz parte da conversa de orçamento; não há um prazo único para todos os projetos."],
  ["Como funciona a comunicação durante o desenvolvimento?", "O briefing reúne as informações iniciais. A forma de acompanhamento e os canais de comunicação são alinhados na conversa sobre o projeto. O WhatsApp oficial da Kyveri ainda está em preparação."],
];

export default function FAQ({ onRequestBriefing }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="perguntas" className="section faq-section container" aria-labelledby="faq-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Perguntas frequentes</p>
          <h2 id="faq-title">Antes de<br />começar.</h2>
          <p className="section-description">Algumas respostas para dar o próximo passo com mais clareza.</p>
        </div>
        <button className="button button-outline" type="button" onClick={onRequestBriefing}>
          Solicitar orçamento <Icon name="arrow" />
        </button>
      </div>
      <div className="faq-list">
        {questions.map(([question, answer], index) => (
          <article className="faq-item" key={question}>
            <h3>
              <button
                id={`faq-question-${index}`}
                type="button"
                aria-expanded={expanded === index}
                aria-controls={`faq-panel-${index}`}
                onClick={() => setExpanded((current) => current === index ? null : index)}
              >
                <span>{question}</span><span className="faq-toggle" aria-hidden="true">+</span>
              </button>
            </h3>
            <div
              className="faq-panel"
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              hidden={expanded !== index}
            >
              <p className="faq-answer">{answer}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
