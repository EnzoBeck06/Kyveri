import { assets } from "../assets.js";

const links = [
  ["Início", "#inicio"],
  ["Projetos", "#projetos"],
  ["Serviços", "#servicos"],
  ["Sobre", "#sobre"],
  ["Contato", "#contato"],
];

export default function Footer() {
  const year = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  }).format(new Date());

  return (
    <footer className="site-footer container">
      <a className="wordmark" href="#inicio" aria-label="Kyveri — voltar ao início">
        <img src={assets.mark} width="22" height="30" alt="" aria-hidden="true" />
        <span>KYVERI</span>
      </a>
      <nav aria-label="Navegação do rodapé">
        {links.map(([label, href]) => (
          <a href={href} key={href}>
            {label}
          </a>
        ))}
      </nav>
      <p>© {year} Kyveri. Todos os direitos reservados.</p>
    </footer>
  );
}
