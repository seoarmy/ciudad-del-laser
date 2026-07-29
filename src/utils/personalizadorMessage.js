// Arma el mensaje de WhatsApp compartido por Mate y Placa a partir de una lista
// de specs {label, value} y warnings de producción. El warning no bloquea el
// envío a propósito: preferimos recibir la consulta igual (con la alerta
// incluida en el mensaje) y que el humano la resuelva, antes que perder el lead.
export function buildPersonalizadorMessage(productLabel, specs, warnings = []) {
  const specLines = specs
    .filter((s) => s.value != null && s.value !== '')
    .map((s) => `${s.label}: ${s.value}`)
    .join('\n');

  const warningLines = warnings.filter(Boolean).map((w) => `⚠️ ${w}`).join('\n');

  return [`Hola! Quiero cotizar ${productLabel}.`, specLines, warningLines]
    .filter(Boolean)
    .join('\n');
}
