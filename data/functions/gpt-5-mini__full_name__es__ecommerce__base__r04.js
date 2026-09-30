function validate(name) {
  // Valida que `name` sea un "nombre completo" razonable:
  // - debe ser string no vacío (tras trim)
  // - debe contener al menos dos palabras separadas por espacios (p. ej. nombre y apellido)
  // - no permite caracteres numéricos ni signos distintos a letras, guión o apóstrofe
  // - permite letras Unicode (acentos, ñ, etc.) usando \p{L}
  // - no permite puntos, comas u otros signos; no permite espacios consecutivos
  // - cada "token" (palabra) puede contener guiones/apóstrofes internos, p. ej. "O'Connor" o "Anne-Marie"
  if (typeof name !== 'string') return false;

  // Recortar espacios al inicio y final
  name = name.trim();
  if (name.length === 0) return false;

  // Longitud máxima razonable para un nombre completo
  if (name.length > 100) return false;

  // No permitir espacios consecutivos
  if (/\s{2,}/.test(name)) return false;

  // Debe haber al menos un espacio (al menos dos palabras)
  if (!name.includes(' ')) return false;

  // Solo permitir letras Unicode, espacios, guiones y apóstrofes
  if (!/^[\p{L}\s'-]+$/u.test(name)) return false;

  // Validación de cada palabra: empieza y termina en letra, puede tener guiones o apóstrofes internos
  const tokenRe = /^\p{L}+(?:['-]\p{L}+)*$/u;
  const parts = name.split(' ');

  // Al menos dos tokens (palabras)
  if (parts.length < 2) return false;

  for (const part of parts) {
    // Rechazar tokens vacíos (ya debería evitarse por checks previos) y tokens inválidos
    if (!tokenRe.test(part)) return false;
  }

  return true;
}
