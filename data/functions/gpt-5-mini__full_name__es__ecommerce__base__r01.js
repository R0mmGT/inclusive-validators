function validate(name) {
  if (typeof name !== 'string') return false;

  // Normalize spaces
  const s = name.trim().replace(/\s+/g, ' ');
  if (s.length < 2 || s.length > 100) return false;

  const parts = s.split(' ');
  if (parts.length < 2) return false; // debe haber al menos nombre y apellido

  // Inicial (una letra seguida de punto), o palabra compuesta por letras
  // con posibles guiones o apóstrofes entre segmentos.
  const initialRe = /^\p{L}\.$/u;
  const wordRe = /^[\p{L}]+(?:['-][\p{L}]+)*$/u;

  let hasNonInitial = false;

  for (const part of parts) {
    if (!part) return false; // por seguridad

    // Permitir iniciales tipo "J."
    if (initialRe.test(part)) continue;

    // Las demás partes deben ser palabras válidas (sin dígitos ni símbolos)
    if (!wordRe.test(part)) return false;

    // Contar solo letras (ignorar guiones/apóstrofes); cada parte "completa"
    // debe tener al menos 2 letras (evita aceptar una única letra sin punto).
    const lettersCount = [...part].reduce((c, ch) => c + (/\p{L}/u.test(ch) ? 1 : 0), 0);
    if (lettersCount < 2) return false;

    hasNonInitial = true;
  }

  // Debe existir al menos una parte que no sea solo una inicial (por ejemplo, el apellido)
  return hasNonInitial;
}
