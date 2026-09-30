function validate(addressLine) {
  if (typeof addressLine !== 'string') {
    return false;
  }

  const trimmed = addressLine.trim();

  // Longitud razonable para una línea de calle en cualquier parte del mundo
  if (trimmed.length < 2 || trimmed.length > 200) {
    return false;
  }

  // Debe contener al menos una letra o número de cualquier sistema de escritura (alfabetos, ideogramas, etc.)
  if (!/[\p{L}\p{N}]/u.test(trimmed)) {
    return false;
  }

  // Caracteres permitidos:
  // \p{L}  - Letras en cualquier idioma/script (latino, cirílico, árabe, kanji, etc.)
  // \p{M}  - Marcas diacríticas / acentos combinables (árabe, devanagari, tailandés, etc.)
  // \p{N}  - Números en cualquier sistema numeral
  // \p{P}  - Puntuación común (#, ., ,, -, ', /, (, ), &, etc.)
  // \p{Zs} - Espacios en blanco (espacio regular, no rompible, ideográfico japonés, etc.)
  // ° y №  - Símbolos comúnmente utilizados en números de dirección o planta
  const addressRegex = /^[\p{L}\p{M}\p{N}\p{P}\p{Zs}°№]+$/u;

  return addressRegex.test(trimmed);
}
