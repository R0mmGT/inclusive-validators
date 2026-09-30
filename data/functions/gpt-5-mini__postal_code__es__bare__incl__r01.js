// Validador genérico de códigos postales pensado para soportar la mayor
// variedad posible de países y escrituras (alfabetos latinos y no latinos).
// Heurística:
// - Acepta letras Unicode y dígitos Unicode, espacios simples y guiones medios.
// - Rechaza entradas vacías, con longitud demasiado corta o excesiva,
//   o que tengan caracteres extraños, separadores repetidos o al inicio/final.
// - Permite formatos comunes como "12345", "12345-6789", "A1A 1A1", "SW1A 1AA", "〒123-4567", etc.
//   (nota: el símbolo "〒" no se acepta por defecto; puede eliminarse externamente si aparece).
// LIMITACIONES: no existe una validación perfecta sin conocer el país; esto es una
// validación amplia y conservadora que cubre la mayoría de formatos reales.
function validate(input) {
  if (typeof input !== 'string') return false;

  // Normalizamos espacios Unicode y recortamos
  let value = input.replace(/\u00A0/g, ' ').trim();

  // Rechazar cadenas demasiado cortas o demasiado largas (incluyendo separadores).
  // Ajuste estos límites si necesita admitir códigos extremadamente largos.
  if (value.length < 2 || value.length > 12) return false;

  // Permitir solo letras (de cualquier alfabeto), números, espacios y guiones medios.
  // Usa escapes de propiedades Unicode; requiere soporte ES2018+.
  const allowedRe = /^[\p{L}\p{N}\- ]+$/u;
  if (!allowedRe.test(value)) return false;

  // No puede empezar ni acabar por espacio o por guion.
  if (/^[\- ]|[\- ]$/.test(value)) return false;

  // No permitir separadores consecutivos (p. ej. "--", "  ", "- ", " -").
  if (/[ \-]{2,}/.test(value)) return false;

  // Debe contener al menos una letra o dígito (evita strings compuestos solo de separadores).
  if (!/[\p{L}\p{N}]/u.test(value)) return false;

  // Dividir por separadores y validar cada segmento:
  // - cada segmento debe ser solo letras/dígitos (ya garantizado),
  // - y su longitud debe ser razonable (evita segmentos absurdamente largos).
  const segments = value.split(/[ \-]/).filter(Boolean);
  if (segments.length === 0) return false;
  for (const seg of segments) {
    if (seg.length < 1 || seg.length > 10) return false;
  }

  // Reglas adicionales simples para formatos muy comunes:
  // - Si todo es numérico, permitir longitudes típicas (2..10).
  // - Si existe mezcla o letras, ya la hemos aceptado por las comprobaciones anteriores.
  if (/^[\p{N}]+$/u.test(value)) {
    const digitsOnlyLen = value.length;
    // Aceptar longitudes numéricas típicas entre 2 y 10 (p. ej. códigos 2..5, o "12345-6789" sería 10 con guion).
    if (digitsOnlyLen < 2 || digitsOnlyLen > 10) return false;
  }

  // Si llegó hasta aquí, lo consideramos un código postal válido (según heurística amplia).
  return true;
}
