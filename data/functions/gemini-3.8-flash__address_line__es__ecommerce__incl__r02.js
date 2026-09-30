function validate(addressLine) {
  // Debe ser un string
  if (typeof addressLine !== 'string') {
    return false;
  }

  const trimmed = addressLine.trim();

  // Longitud razonable para una línea de calle internacional
  if (trimmed.length < 3 || trimmed.length > 200) {
    return false;
  }

  // Rechazar caracteres de control y posibles inyecciones HTML (< o >)
  if (/[\u0000-\u001F\u007F-\u009F<>]/.test(trimmed)) {
    return false;
  }

  // Debe contener al menos una letra o ideograma en cualquier alfabeto/idioma
  // (latino, cirílico, árabe, kanji/hanzi, devanagari, etc.)
  // Esto previene entradas compuestas solo por números (códigos postales/teléfonos) o signos
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // No permitir emojis
  if (/\p{Extended_Pictographic}/u.test(trimmed)) {
    return false;
  }

  return true;
}
