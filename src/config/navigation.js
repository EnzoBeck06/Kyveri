export const navigationLinks = [
  ["Início", "#inicio"],
  ["Serviços", "#servicos"],
  ["Processo", "#processo"],
  ["Projetos", "#projetos"],
  ["Sobre", "#sobre"],
  ["Contato", "#contato"],
];

export const footerLinks = [
  ...navigationLinks.slice(0, 3),
  ["Comparação", "#comparacao"],
  ...navigationLinks.slice(3, -1),
  ["Perguntas", "#perguntas"],
  navigationLinks[navigationLinks.length - 1],
];
