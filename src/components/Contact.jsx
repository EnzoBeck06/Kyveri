import { assets } from "../assets.js";
import { WHATSAPP_NUMBER } from "../config/whatsapp.js";
import { Icon } from "./Icon.jsx";

export default function Contact({ onRequestBriefing }) {
  return (
    <section id="contato" className="contact-section" aria-labelledby="contact-title">
      <div className="container contact-inner">
        <div className="contact-copy" data-reveal>
          <p className="eyebrow">Contato</p>
          <h2 id="contact-title">Seu próximo projeto<br />começa com uma conversa.</h2>
          <p>Conte sua ideia e vamos conversar sobre uma Landing Page personalizada para o seu negócio.</p>
          <button className="button button-primary" type="button" onClick={onRequestBriefing}>
            Solicitar orçamento <Icon name="arrow" />
          </button>
          {!/^\d{10,15}$/.test(WHATSAPP_NUMBER) && (
            <p className="contact-availability">Canal de WhatsApp em preparação. Você pode organizar e revisar seu briefing nesta página.</p>
          )}
        </div>
        <figure className="contact-visual">
          <picture>
            <source srcSet={assets.contact.webp} type="image/webp" />
            <img
              src={assets.contact.fallback}
              width="1536"
              height="1024"
              loading="lazy"
              alt="Simulação visual de conversa: Olá! Quero um orçamento para o meu projeto. Resposta: Claro! Vamos conversar sobre o seu projeto. Me conta mais detalhes."
            />
          </picture>
          <figcaption>Simulação ilustrativa de conversa</figcaption>
        </figure>
      </div>
    </section>
  );
}