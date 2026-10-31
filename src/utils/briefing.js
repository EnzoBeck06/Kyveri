const text = (value) => String(value ?? "").trim();

export function buildBriefingMessage(briefing) {
  return [
    "Olá! Gostaria de conversar sobre um projeto com a Kyveri.",
    "",
    `Nome: ${text(briefing.name)}`,
    `Tipo de projeto: ${text(briefing.projectType)}`,
    text(briefing.business) ? `Negócio: ${text(briefing.business)}` : null,
    text(briefing.segment) ? `Segmento: ${text(briefing.segment)}` : null,
    "",
    `Objetivo principal: ${text(briefing.goal)}`,
    `Descrição do projeto: ${text(briefing.description)}`,
    text(briefing.notes) ? `Informações adicionais: ${text(briefing.notes)}` : null,
  ].filter((line) => line !== null).join("\n");
}
