function validate(name) {
  // Debe ser una cadena
  if (typeof name !== 'string') return false;

  // Trim y límites de longitud razonables
  const s = name.trim();
  if (s.length === 0 || s.length > 60) return false;

  // Solo permitimos letras (cualquier letra unicode), espacios, guiones y apóstrofes (incluye ’ U+2019)
  const allowedChars = /^[\p{L}\u2019' \-]+$/u;
  if (!allowedChars.test(s)) return false;

  // No permitir múltiples espacios consecutivos
  if (/\s{2,}/.test(s)) return false;

  // Cada "palabra" (separada por espacios) debe:
  // - Empezar por una letra
  // - Permitir grupos de letras separados por un solo guion o apóstrofe (ej. O'Connor, Smith-Jones)
  const wordRegex = /^\p{L}+(?:['\u2019\-]\p{L}+)*$/u;
  const parts = s.split(' ');
  for (const part of parts) {
    if (!wordRegex.test(part)) return false;
  }

  return true;
}
