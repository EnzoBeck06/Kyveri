import { assets } from "../assets.js";
import { footerLinks } from "../config/navigation.js";

export default function Footer() {
  const year = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  }).format(new Date());

  return (
    <footer className="site-footer container">
      <div className="footer-brand">
        <a className="wordmark" href="#inicio" aria-label="Kyveri — voltar ao início">
          <img src={assets.mark} width="22" height="30" alt="" aria-hidden="true" />
          <span>KYVERI</span>
        </a>
        <p>Design com intenção. Presença com identidade.</p>
      </div>
      <nav aria-label="Navegação do rodapé">
        {footerLinks.map(([label, href]) => (
          <a href={href} key={href}>
            {label}
          </a>
        ))}
      </nav>
      <p>© {year} Kyveri. Todos os direitos reservados.</p>
    </footer>
  );
}
