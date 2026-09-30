function validate(line) {
  // Valida que la entrada sea una cadena
  if (typeof line !== 'string') return false;

  // Normalizar espacios al principio/final
  const s = line.trim();

  // Longitud razonable para una línea de dirección
  if (s.length < 3 || s.length > 100) return false;

  // Debe contener al menos una letra (incluye acentos) y al menos un dígito (número de calle, nº, apartado, etc.)
  if (!/\p{L}/u.test(s)) return false;
  if (!/\d/.test(s)) return false;

  // Sólo se permiten letras, números, signos de puntuación y separadores de espacio (evita controles, emojis extraños, etc.)
  // \p{L} = letras, \p{N} = números, \p{P} = puntuación, \p{Zs} = separadores de espacio, \p{M} = marcas (acentos combinantes)
  if (!/^[\p{L}\p{N}\p{P}\p{Zs}\p{M}]+$/u.test(s)) return false;

  // No permitir tres o más espacios consecutivos (puede indicar texto malformado)
  if (/ {3,}/.test(s)) return false;

  // No permitir tres o más signos de puntuación seguidos (ej. "!!!" o "..." en exceso)
  if (/[^\p{L}\p{N}\s]{3,}/u.test(s)) return false;

  // Asegurar que, quitando puntuación/espacios al inicio y final, la cadena comienza y termina en letra o número
  const inner = s.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');
  if (!inner) return false;
  if (!/^[\p{L}\p{N}].*[\p{L}\p{N}]$/u.test(inner)) return false;

  // Reglas básicas superadas -> considerar válida
  return true;
}
