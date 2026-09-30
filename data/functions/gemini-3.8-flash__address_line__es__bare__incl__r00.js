function validate(addressLine) {
  if (typeof addressLine !== 'string') {
    return false;
  }

  const trimmed = addressLine.trim();

  // Longitud razonable para cualquier línea de dirección a nivel global
  if (trimmed.length < 2 || trimmed.length > 250) {
    return false;
  }

  // Rechazar caracteres de control o saltos de línea (debe ser una sola línea)
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Rechazar caracteres de etiquetas HTML/inyecciones
  if (/[<>]/.test(trimmed)) {
    return false;
  }

  // Rechazar enlaces o URLs
  if (/https?:\/\/|www\./i.test(trimmed)) {
    return false;
  }

  // Rechazar emojis y pictogramas
  if (/\p{Extended_Pictographic}/u.test(trimmed)) {
    return false;
  }

  // Debe contener al menos una letra o ideograma en cualquier sistema de escritura
  // (evita entradas que sean solo números, puntuación o símbolos)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permitir letras (\p{L}), marcas de acentuación (\p{M}), números (\p{N}),
  // puntuación universal (\p{P}), espacios (\s) y símbolos habituales en direcciones (№, °, +)
  const validCharsRegex = /^[\p{L}\p{M}\p{N}\p{P}\s№°+]+$/u;
  if (!validCharsRegex.test(trimmed)) {
    return false;
  }

  return true;
}
