function validate(fullName) {
  // Debe ser una cadena
  if (typeof fullName !== 'string') return false;

  // Normalizar espacios al principio/final y reducir múltiples espacios
  const name = fullName.trim().replace(/\s+/g, ' ');
  if (name.length < 2 || name.length > 100) return false;

  // Requiere al menos nombre y apellido
  const parts = name.split(' ');
  if (parts.length < 2) return false;

  // Expresiones regulares Unicode:
  // - \p{L} : cualquier letra
  // - \p{M} : marcas combinantes (acentos)
  // Inicial permitido: una sola letra seguida de punto (p. ej. "J.")
  const initialRe = /^[\p{L}]\.$/u;
  // Nombre "normal": empieza por letra y sigue con letras, marcas, apóstrofes o guiones
  const nameRe = /^\p{L}[\p{L}\p{M}\u2019'\-]*$/u;
  // Detectar dos caracteres consecutivos que no sean letras (evita "--", "''", "-'", etc.)
  const consecutiveNonLetterRe = /[^\p{L}\p{M}][^\p{L}\p{M}]/u;
  // Prohibir inicio/fin con apostrofe o guion
  const edgeBadRe = /^[\u2019'\-]|[\u2019'\-]$/u;

  for (const part of parts) {
    if (part.length === 0 || part.length > 50) return false;

    // Si es inicial (J.) está permitido
    if (initialRe.test(part)) continue;

    // Debe cumplir patrón de nombre
    if (!nameRe.test(part)) return false;

    // No puede empezar/terminar con guion o apóstrofe
    if (edgeBadRe.test(part)) return false;

    // No puede tener dos signos/puntuaciones consecutivas
    if (consecutiveNonLetterRe.test(part)) return false;
  }

  return true;
}
