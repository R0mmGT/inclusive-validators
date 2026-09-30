function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Comprueba una longitud razonable para nombres a nivel global (de 2 a 120 caracteres)
  if (trimmed.length < 2 || trimmed.length > 120) {
    return false;
  }

  // Rechaza saltos de línea y otros caracteres de control
  if (/[\r\n\t\f\v]/.test(trimmed)) {
    return false;
  }

  // Permite letras Unicode (\p{L}), marcas diacríticas/combinadas (\p{M}),
  // espacios y signos válidos en nombres (' ’ ʼ . - · ・)
  const validChars = /^[\p{L}\p{M} '’ʼ.\-·・]+$/u;
  if (!validChars.test(trimmed)) {
    return false;
  }

  // Debe contener como mínimo una letra Unicode (evita cadenas solo de símbolos o puntuación)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Evita espacios múltiples consecutivos
  if (/\s{2,}/.test(trimmed)) {
    return false;
  }

  // Evita signos de puntuación consecutivos (ej. "..", "--", ".-")
  if (/[.\-'’ʼ·・]{2,}/u.test(trimmed)) {
    return false;
  }

  // No debe comenzar con signos de puntuación, ni terminar con guiones o puntos medios
  // (se permite terminar con punto para iniciales como "Jr." o "A.")
  if (/^[.\-'’ʼ·・]/u.test(trimmed) || /[\-·・]$/u.test(trimmed)) {
    return false;
  }

  return true;
}
