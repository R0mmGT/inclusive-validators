function validate(name) {
  // Debe ser una cadena
  if (typeof name !== 'string') return false;

  // Normalizar espacios al principio/final y comprobar longitud
  name = name.trim();
  if (!name || name.length > 200) return false;

  // No se permiten dígitos
  if (/\d/.test(name)) return false;

  // Rechazar caracteres claramente inválidos para nombres (excepto letras, guión, apóstrofo, punto y espacios)
  if (/[^ \p{L}\-'\.\u00A0]/u.test(name)) return false;
  // Nota: el regex anterior permite letras Unicode (\p{L}), espacios, guiones, apóstrofos y puntos.

  // Separar por espacios (uno o más)
  const parts = name.split(/\s+/);
  // Debe constar de al menos dos partes (nombre y apellido como mínimo)
  if (parts.length < 2) return false;

  // Expresiones para partes válidas:
  // - fullRe: palabra compuesta solo por letras, opcionalmente con guiones o apóstrofos internos (ej. "María-José", "O'Connor")
  // - initialRe: inicial con un solo carácter letra seguido de punto (ej. "J.")
  const fullRe = /^\p{L}+(?:[\'\-]\p{L}+)*$/u;
  const initialRe = /^\p{L}\.$/u;

  let hasFullWord = false; // al menos una parte debe ser una palabra completa (no solo inicial)

  for (const part of parts) {
    if (fullRe.test(part)) {
      // Rechazar una "palabra completa" de un solo carácter (p. ej. "A" sin punto)
      if (part.length === 1) return false;
      hasFullWord = true;
      continue;
    }
    if (initialRe.test(part)) {
      continue;
    }
    // Si no encaja en ninguna, no es válido
    return false;
  }

  // Al menos una parte debe ser palabra completa (no solo iniciales)
  return hasFullWord;
}
