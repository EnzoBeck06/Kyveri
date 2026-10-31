import { memo, useRef, useState } from "react";
import { assets } from "../assets.js";

// Both versions use real HTML and the same existing image. This is a design
// illustration, never a customer result or a screenshot used as a background.
const DemoPage = memo(function DemoPage({ refined }) {
  return (
    <div className={`comparison-demo ${refined ? "comparison-demo-refined" : "comparison-demo-basic"}`}>
      <div className="comparison-demo-nav">
        <span>Seu negócio</span>
        <span>Início · Sobre · Contato</span>
      </div>
      <div className="comparison-demo-body">
        <div className="comparison-demo-copy">
          <span className="comparison-demo-kicker">Um espaço para a sua marca</span>
          <h3>{refined ? <>Sua marca.<br />Seu espaço.</> : "Conheça o nosso negócio."}</h3>
          <p>Apresente sua proposta e crie um caminho para iniciar uma conversa.</p>
          <span className="comparison-demo-cta">{refined ? "Conheça a proposta ↗" : "Saiba mais"}</span>
        </div>
        <picture className="comparison-demo-art">
          <source srcSet={assets.studio.webp} type="image/webp" />
          <img src={assets.studio.fallback} width="1536" height="1024" loading="lazy" alt="" draggable="false" />
        </picture>
      </div>
      <div className="comparison-demo-footer">Identidade <span>Clareza</span> Contato</div>
    </div>
  );
});

export default function Comparison() {
  const [position, setPosition] = useState(50);
  const stageRef = useRef(null);
  const inputRef = useRef(null);
  const pointerRef = useRef(null);

  function updatePosition(clientX) {
    const bounds = stageRef.current.getBoundingClientRect();
    if (!bounds.width) return;
    setPosition(Math.round(Math.max(0, Math.min(100, (clientX - bounds.left) / bounds.width * 100))));
  }

  return (
    <section id="comparacao" className="section comparison-section" aria-labelledby="comparison-title">
      <div className="comparison-inner container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Design em perspectiva</p>
            <h2 id="comparison-title">A mesma ideia.<br />Outra presença.</h2>
            <p className="section-description">
              Hierarquia, espaço e direção visual mudam a maneira de apresentar uma proposta. Explore duas interpretações do mesmo conteúdo.
            </p>
            <p className="comparison-note" id="comparison-note">
              Comparação conceitual e ilustrativa. Não representa um cliente real ou resultado comercial comprovado.
            </p>
          </div>
        </div>
        <figure className="comparison-figure" style={{ "--comparison-position": `${position}%` }}>
          <div className="comparison-labels" aria-hidden="true"><span>Antes · genérico</span><span>Depois · com direção</span></div>
          <div
            className="comparison-stage"
            ref={stageRef}
            aria-hidden="true"
            onPointerDown={(event) => {
              if (event.button !== 0 || !event.isPrimary) return;
              pointerRef.current = event.pointerId;
              event.currentTarget.setPointerCapture(event.pointerId);
              inputRef.current.focus({ preventScroll: true });
              updatePosition(event.clientX);
            }}
            onPointerMove={(event) => {
              if (pointerRef.current === event.pointerId) updatePosition(event.clientX);
            }}
            onPointerUp={(event) => {
              if (pointerRef.current !== event.pointerId) return;
              pointerRef.current = null;
              event.currentTarget.releasePointerCapture(event.pointerId);
            }}
            onPointerCancel={() => { pointerRef.current = null; }}
            onLostPointerCapture={() => { pointerRef.current = null; }}
          >
            <div className="comparison-layer comparison-after"><DemoPage refined /></div>
            <div className="comparison-layer comparison-before"><DemoPage refined={false} /></div>
            <div className="comparison-divider"><span>‹ ›</span></div>
          </div>
          <figcaption className="comparison-controls">
            <label htmlFor="comparison-position">Posição da divisão antes e depois</label>
            <input
              ref={inputRef}
              id="comparison-position"
              type="range"
              min="0"
              max="100"
              value={position}
              aria-valuetext={`${position}% antes e ${100 - position}% depois`}
              aria-describedby="comparison-help comparison-note"
              onChange={(event) => setPosition(Number(event.target.value))}
            />
            <p id="comparison-help">Arraste a divisão com mouse ou toque. No controle, use as setas, Home ou End.</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
