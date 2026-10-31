import { WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from "../config/whatsapp.js";
import { Icon } from "./Icon.jsx";

export default function WhatsAppLink({
  className,
  onUnavailable,
  onRequestBriefing,
  children,
}) {
  const configured = /^\d{10,15}$/.test(WHATSAPP_NUMBER);
  const href = configured
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
    : "#contato";

  return (
    <a
      className={className}
      href={href}
      target={configured ? "_blank" : undefined}
      rel={configured ? "noopener noreferrer" : undefined}
      onClick={(event) => {
        if (onRequestBriefing) {
          event.preventDefault();
          onRequestBriefing();
          return;
        }
        if (!configured) {
          event.preventDefault();
          onUnavailable?.();
        }
      }}
    >
      {children ?? (
        <>
          <Icon name="whatsapp" />Falar no WhatsApp
          <Icon name="arrow" />
        </>
      )}
    </a>
  );
}
