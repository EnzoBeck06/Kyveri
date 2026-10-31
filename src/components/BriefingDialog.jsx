import { useEffect, useRef, useState } from "react";
import { WHATSAPP_NUMBER } from "../config/whatsapp.js";
import { buildBriefingMessage } from "../utils/briefing.js";
import { Icon } from "./Icon.jsx";

export default function BriefingDialog({ open, onClose }) {
  const dialogRef = useRef(null);
  const nameRef = useRef(null);
  const reviewRef = useRef(null);
  const [step, setStep] = useState("details");
  const [briefing, setBriefing] = useState({});
  const [status, setStatus] = useState("");
  const configured = /^\d{10,15}$/.test(WHATSAPP_NUMBER);
  const message = buildBriefingMessage(briefing);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open) {
      if (dialog.open) dialog.close();
      return undefined;
    }
    setStep("details");
    setStatus("");
    if (!dialog.open) dialog.showModal();
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const frame = requestAnimationFrame(() => {
      const target = step === "review" ? reviewRef.current : nameRef.current;
      const dialog = dialogRef.current;
      dialog.scrollTop = 0;
      target?.focus({ preventScroll: true });
      // Keep the focused field visible in short windows / with a mobile keyboard.
      if (target && target.getBoundingClientRect().bottom > dialog.getBoundingClientRect().bottom - 12) {
        target.scrollIntoView({ block: "nearest", behavior: "instant" });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [step, open]);

  function prepareMessage(event) {
    event.preventDefault();
    const form = event.currentTarget;
    for (const key of ["name", "goal", "description"]) {
      const field = form.elements.namedItem(key);
      field.setCustomValidity(field.value.trim() ? "" : "Preencha este campo com uma informação válida.");
    }
    if (!form.reportValidity()) return;
    setBriefing(Object.fromEntries([...new FormData(form)].map(([key, value]) => [key, value.trim()])));
    setStatus("");
    setStep("review");
  }

  function openWhatsApp() {
    if (!configured) {
      setStatus("O WhatsApp oficial ainda não foi configurado. Seu briefing continua apenas nesta página e não foi enviado.");
      return;
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    dialogRef.current.close();
  }

  return (
    <dialog
      className="briefing-dialog"
      aria-labelledby="briefing-title"
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target !== dialogRef.current) return;
        const bounds = dialogRef.current.getBoundingClientRect();
        if (
          event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom
        ) dialogRef.current.close();
      }}
    >
      <button className="dialog-close briefing-close" type="button" aria-label="Fechar formulário" onClick={() => dialogRef.current.close()}>×</button>
      <div className="briefing-content">
        <p className="eyebrow">Orçamento</p>
        <h2 id="briefing-title">Conte um pouco sobre sua ideia.</h2>
        <p className="briefing-intro">Organize o contexto do projeto e confira a mensagem antes de continuar no WhatsApp.</p>
        {!configured && <p className="briefing-channel">WhatsApp oficial em preparação. Você pode explorar o briefing, mas nenhuma informação será enviada.</p>}
        <ol className="briefing-progress" aria-label="Etapas do briefing">
          <li aria-current={step === "details" ? "step" : undefined}>01 · Seu projeto</li>
          <li aria-current={step === "review" ? "step" : undefined}>02 · Revisar mensagem</li>
        </ol>
        {step === "details" ? (
          <form id="briefing-form" onSubmit={prepareMessage} aria-describedby="briefing-privacy" onInput={(event) => event.target.setCustomValidity?.("")}>
            <label htmlFor="briefing-name">Seu nome</label>
            <input ref={nameRef} id="briefing-name" name="name" autoComplete="name" maxLength={100} defaultValue={briefing.name ?? ""} required />
            <label htmlFor="briefing-type">Tipo de projeto</label>
            <select id="briefing-type" name="projectType" defaultValue={briefing.projectType ?? ""} required>
              <option value="" disabled>Selecione uma opção</option>
              <option>Landing Page</option>
              <option>Redesign de Landing Page</option>
              <option>Ainda quero definir</option>
            </select>
            <label htmlFor="briefing-goal">Objetivo principal</label>
            <input id="briefing-goal" name="goal" maxLength={500} placeholder="Ex.: apresentar um serviço e facilitar o contato" defaultValue={briefing.goal ?? ""} required />
            <label htmlFor="briefing-description">Descrição do projeto</label>
            <textarea id="briefing-description" name="description" rows={3} maxLength={1000} defaultValue={briefing.description ?? ""} required />
            <label htmlFor="briefing-business">Empresa ou negócio <span>(opcional)</span></label>
            <input id="briefing-business" name="business" autoComplete="organization" maxLength={120} defaultValue={briefing.business ?? ""} />
            <label htmlFor="briefing-segment">Segmento <span>(opcional)</span></label>
            <input id="briefing-segment" name="segment" maxLength={100} defaultValue={briefing.segment ?? ""} />
            <label htmlFor="briefing-notes">Informações adicionais <span>(opcional)</span></label>
            <textarea id="briefing-notes" name="notes" rows={3} maxLength={1000} defaultValue={briefing.notes ?? ""} />
            <p className="briefing-privacy" id="briefing-privacy">As informações ficam apenas nesta página. Não há envio para um servidor ou armazenamento permanente.</p>
            <button className="button button-primary briefing-submit" type="submit">Revisar mensagem <Icon name="arrow" /></button>
          </form>
        ) : (
          <div className="briefing-review">
            <h3 className="briefing-review-title" ref={reviewRef} tabIndex="-1">Confira sua mensagem.</h3>
            <label htmlFor="briefing-message">Mensagem preparada para WhatsApp</label>
            <textarea id="briefing-message" readOnly value={message} rows={10} />
            <p className="briefing-privacy">Abrir o WhatsApp não envia a mensagem automaticamente. Você poderá conferir e enviar no aplicativo.</p>
            <p className="briefing-status" role="status" aria-live="polite" hidden={!status}>{status}</p>
            <div className="briefing-review-actions">
              <button className="button button-secondary" type="button" onClick={() => setStep("details")}>Voltar e editar</button>
              <button className="button button-primary" type="button" onClick={openWhatsApp}>Abrir no WhatsApp <Icon name="arrow" /></button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}
