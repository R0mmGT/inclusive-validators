function validate(line) {
  // Debe ser string
  if (typeof line !== 'string') return false;
  const s = line.trim();
  // Longitud razonable
  if (s.length < 3 || s.length > 120) return false;

  // Sólo caracteres comúnmente usados en una línea de calle (letras unicode, dígitos, espacios y puntuación permitida)
  const allowedRe = /^[\p{L}\d\s\.\,\/\-\#ºª°()'":;&+¿?¡!]+$/u;
  if (!allowedRe.test(s)) return false;

  // Debe contener al menos una letra (nombre de la vía)
  const hasLetter = /\p{L}/u.test(s);
  if (!hasLetter) return false;

  // Expresiones para "sin número" (S/N) y para números de portal
  const snRe = /\b(?:S\s*\/\s*N|S\.?N\.?|s\/n|sin(?:\s+n(?:ú|u)?mero)?)\b/i;
  const numTokenRe = /\d{1,5}(?:[A-Za-z0-9ºª°\-\/]{0,3})?/g;

  // Si aparece S/N, asegurarnos de que vaya precedido por algún nombre de vía (no aceptar "S/N" aislado)
  const snMatch = snRe.exec(s);
  if (snMatch) {
    const idx = snMatch.index;
    const leftHasLetter = /\p{L}/u.test(s.slice(0, idx));
    return leftHasLetter;
  }

  // Buscar el último token numérico (probable número de portal)
  const matches = [...s.matchAll(numTokenRe)];
  if (matches.length === 0) return false;
  const lastMatch = matches[matches.length - 1];
  const numIdx = lastMatch.index;
  // Debe haber letras (nombre de vía) antes del número de portal encontrado
  const leftHasLetter = /\p{L}/u.test(s.slice(0, numIdx));
  if (!leftHasLetter) return false;

  // Rechazar cadenas que son esencialmente solo números u otros tokens sin nombre de vía
  // (ej. "12345" ya queda rechazado por leftHasLetter == false)
  return true;
}
