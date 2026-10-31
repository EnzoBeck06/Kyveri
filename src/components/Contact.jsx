import { useRef, useState } from "react";
import { assets } from "../assets.js";
import { WHATSAPP_NUMBER } from "../config/whatsapp.js";
import { Icon } from "./Icon.jsx";

export default function Contact() {
  const dialogRef = useRef(null);
  const nameRef = useRef(null);
  const [status, setStatus] = useState("");

  function openBriefing() {
    setStatus("");
    dialogRef.current?.showModal();
    requestAnimationFrame(() => nameRef.current?.focus());
  }

  function closeBriefing() {
    dialogRef.current?.close();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
      setStatus(
        "O WhatsApp oficial ainda não foi configurado. Seu briefing continua apenas nesta página e não foi enviado.",
      );
      return;
    }

    const fields = new FormData(form);
    const lines = [
      "Olá! Gostaria de conversar sobre uma Landing Page.",
      "",
      `Nome: ${fields.get("name").trim()}`,
      fields.get("business").trim() && `Negócio: ${fields.get("business").trim()}`,
      fields.get("segment").trim() && `Segmento: ${fields.get("segment").trim()}`,
      `Objetivo: ${fields.get("goal").trim()}`,
      fields.get("notes").trim() && `Observações: ${fields.get("notes").trim()}`,
    ].filter(Boolean);
    const message = encodeURIComponent(lines.join("\n"));

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank",
      "noopener,noreferrer",
    );
    closeBriefing();
  }

  return (
    <section
      id="contato"
      className="contact-section"
      aria-labelledby="contact-title"
    >
      <div className="container contact-inner">
        <div className="contact-copy" data-reveal>
          <p className="eyebrow">Contato</p>
          <h2 id="contact-title">
            Seu próximo projeto<br />começa com uma conversa.
          </h2>
          <p>
            Conte sua ideia e vamos conversar sobre uma Landing Page
            personalizada para o seu negócio.
          </p>
          <button
            className="button button-primary"
            type="button"
            onClick={openBriefing}
          >
            Solicitar orçamento
            <Icon name="arrow" />
          </button>
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
      <dialog
        className="briefing-dialog"
        aria-labelledby="briefing-title"
        ref={dialogRef}
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            const bounds = dialogRef.current.getBoundingClientRect();
            const outside =
              event.clientX < bounds.left ||
              event.clientX > bounds.right ||
              event.clientY < bounds.top ||
              event.clientY > bounds.bottom;
            if (outside) closeBriefing();
          }
        }}
      >
        <button
          className="dialog-close briefing-close"
          type="button"
          aria-label="Fechar formulário"
          onClick={closeBriefing}
        >
          ×
        </button>
        <div className="briefing-content">
          <p className="eyebrow">Orçamento</p>
          <h2 id="briefing-title">Conte um pouco sobre sua ideia.</h2>
          <p className="briefing-intro">
            Essas informações ajudam a iniciar a conversa. Você poderá revisar a
            mensagem antes de enviá-la.
          </p>
          <form id="briefing-form" onSubmit={handleSubmit}>
            <label htmlFor="briefing-name">Seu nome</label>
            <input
              ref={nameRef}
              id="briefing-name"
              name="name"
              autoComplete="name"
              maxLength={100}
              required
            />
            <label htmlFor="briefing-business">
              Empresa ou negócio <span>(opcional)</span>
            </label>
            <input
              id="briefing-business"
              name="business"
              autoComplete="organization"
              maxLength={120}
            />
            <label htmlFor="briefing-segment">
              Segmento <span>(opcional)</span>
            </label>
            <input id="briefing-segment" name="segment" maxLength={100} />
            <label htmlFor="briefing-goal">
              O que você gostaria de apresentar?
            </label>
            <textarea
              id="briefing-goal"
              name="goal"
              rows={3}
              maxLength={500}
              required
            />
            <label htmlFor="briefing-notes">
              Observações <span>(opcional)</span>
            </label>
            <textarea
              id="briefing-notes"
              name="notes"
              rows={3}
              maxLength={1000}
            />
            <p className="briefing-privacy" id="briefing-privacy">
              O site não armazena seus dados. Eles só são incluídos na mensagem
              aberta no WhatsApp.
            </p>
            <p className="briefing-status" role="status" aria-live="polite" hidden={!status}>
              {status}
            </p>
            <button className="button button-primary briefing-submit" type="submit">
              Continuar no WhatsApp
              <Icon name="arrow" />
            </button>
          </form>
        </div>
      </dialog>
    </section>
  );
}
