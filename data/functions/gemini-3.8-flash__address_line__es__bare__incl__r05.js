function validate(addressLine) {
  if (typeof addressLine !== 'string') {
    return false;
  }

  const trimmed = addressLine.trim();

  // Longitud razonable para una línea de calle (mínimo 2 caracteres, máximo 200)
  if (trimmed.length < 2 || trimmed.length > 200) {
    return false;
  }

  // No debe ser una URL
  if (/https?:\/\//i.test(trimmed)) {
    return false;
  }

  // Debe contener al menos una letra o número en cualquier sistema de escritura/alfabeto
  if (!/[\p{L}\p{N}]/u.test(trimmed)) {
    return false;
  }

  // Permite:
  // - \p{L}: Cualquier letra Unicode (latino, cirílico, árabe, devanagari, kanji, etc.)
  // - \p{M}: Marcas diacríticas / acentos combinados
  // - \p{N}: Números en cualquier sistema de numeración
  // - \p{P}: Signos de puntuación (#, -, ., ,, /, etc.)
  // - \p{Zs}: Espacios separadores horizontales
  // - +: Utilizado en Open Location Codes / Plus Codes
  // - ° y №: Símbolos habituales de grado y número
  const validCharsRegex = /^[\p{L}\p{M}\p{N}\p{P}\p{Zs}+°№]+$/u;

  return validCharsRegex.test(trimmed);
}
