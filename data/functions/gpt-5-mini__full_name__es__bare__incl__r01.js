function validate(name) {
  // Solo strings
  if (typeof name !== 'string') return false;

  // Trim para evitar espacios extremos
  const s = name.trim();
  if (s.length === 0 || s.length > 100) return false;

  // Reglas generales:
  // - Permitir letras de cualquier alfabeto (\p{L}) y marcas diacríticas (\p{M})
  // - Permitir guiones, apóstrofes (varias formas), puntos (para iniciales),
  //   y puntos medios usados en algunos nombres (·)
  // - Permitir espacios entre partes del nombre
  // - No permitir dígitos ni símbolos como @ # $ % & * / etc.
  // - No permitir secuencias de puntuación pegadas (p. ej. "--", "''", "..")
  // - No permitir múltiples espacios consecutivos
  // - El nombre debe comenzar y acabar con una letra
  const allowedRe = /^[\p{L}\p{M}\-.'·ʼ\u02BC\u2019\u2018\u00B7\u2027\u2010\u2011\u2012\u2013\u2014\s]+$/u;
  if (!allowedRe.test(s)) return false;

  // No múltiples espacios consecutivos
  if (/\s{2,}/u.test(s)) return false;

  // No secuencias de puntuación (sin espacios) como ".." o "--" o "''"
  if (/[.\-'\u02BC\u2019\u2018·]{2,}/u.test(s)) return false;

  // Debe empezar y terminar por una letra
  if (!/^\p{L}/u.test(s) || !/\p{L}$/u.test(s)) return false;

  // Debe contener al menos una letra (redundante pero explícito)
  if (!/\p{L}/u.test(s)) return false;

  // Opcionalmente podríamos exigir múltiples "componentes" (ej. nombre y apellido),
  // pero hay muchas culturas con un único nombre válido; por eso no lo exigimos.
  // Si se desea exigir al menos dos palabras, descomente la siguiente comprobación:
  // if (s.split(/\s+/).length < 2) return false;

  return true;
}
