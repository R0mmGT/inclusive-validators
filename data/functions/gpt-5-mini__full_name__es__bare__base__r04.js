function validate(name) {
  // Entrada debe ser string
  if (typeof name !== 'string') return false;

  // Limpiar espacios al inicio y fin
  name = name.trim();

  // Longitud razonable
  if (name.length < 2 || name.length > 200) return false;

  // No permitir dígitos ni caracteres de control
  if (/\p{N}/u.test(name) || /[\u0000-\u001F\u007F]/.test(name)) return false;

  // No permitir caracteres claramente inválidos para nombres (salvo los permitidos más abajo)
  if (/[@#$%^&*+=<>\/\\\[\]{}|~`]/.test(name)) return false;

  // Separar por uno o más espacios en blanco
  const parts = name.split(/\s+/);
  // Debe haber al menos nombre y apellido
  if (parts.length < 2) return false;

  // Patrones para partes válidas:
  // 1) letra única (inicial sin punto): "J"
  // 2) inicial con punto: "J."
  // 3) nombre/apellido compuesto: empieza y termina con letra, puede contener marcas diacríticas, apóstrofe, guion o punto en el interior
  const singleLetter = /^[\p{L}]$/u;
  const initialDot = /^[\p{L}]\.$/u;
  const namePart = /^[\p{L}][\p{L}\p{M}'\-.]*[\p{L}\p{M}]$/u;

  // No permitir secuencias de puntuación inválidas dentro de una parte, como "--", "''", "..", "-'", etc.
  const badPunctSeq = /['\-.]{2,}/;

  for (const p of parts) {
    // Longitud razonable por parte
    if (p.length === 0 || p.length > 60) return false;

    // No empezar/terminar con apóstrofe/guion/punto (namePart ya lo evita, pero chequeo extra)
    if (/^[\'\-.]/.test(p) || /[\'\-.]$/.test(p)) return false;

    // No secuencias de puntuación
    if (badPunctSeq.test(p)) return false;

    // Debe coincidir con alguno de los patrones permitidos
    if (singleLetter.test(p) || initialDot.test(p) || namePart.test(p)) {
      continue;
    }
    return false;
  }

  return true;
}
