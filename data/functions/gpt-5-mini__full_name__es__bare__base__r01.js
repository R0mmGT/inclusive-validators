function validate(name) {
  // Devuelve true si `name` parece un nombre completo válido (al menos dos componentes)
  // Reglas aplicadas:
  // - Debe ser una cadena no vacía con al menos dos tokens separados por espacios.
  // - Cada token puede ser:
  //    * una inicial (una letra + punto, ej. "J.") o
  //    * una palabra compuesta sólo por letras (Unicode) y opcionalmente unida por guiones o apóstrofes (ej. "María-José", "O'Neill").
  // - No se permiten dígitos ni otros signos de puntuación.
  // - Al menos un token debe ser una palabra (no sólo inicial) con al menos 2 letras.
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (!s) return false;

  const parts = s.split(/\s+/);
  if (parts.length < 2) return false;

  // Regex con soporte Unicode:
  // \p{L} = cualquier letra Unicode
  // permitimos apóstrofe normal ' y apóstrofe tipográfico ’ (U+2019)
  const initialRe = /^\p{L}\.$/u;
  const wordRe = /^\p{L}+(?:[-'\u2019]\p{L}+)*$/u;

  let hasNonInitialWord = false;

  for (const p of parts) {
    if (initialRe.test(p)) {
      // es una inicial como "J."
      continue;
    }
    if (wordRe.test(p)) {
      // cantidad de letras reales (sin guiones/apóstrofes)
      const lettersOnly = p.replace(/[-'\u2019]/g, '');
      // Rechazamos palabras demasiado cortas (ej. una sola letra sin punto), pero aceptamos "Li", "Ng", "de", etc.
      if (lettersOnly.length < 2) return false;
      hasNonInitialWord = true;
      continue;
    }
    // si no cumple ningún patrón, es inválido
    return false;
  }

  return hasNonInitialWord;
}
