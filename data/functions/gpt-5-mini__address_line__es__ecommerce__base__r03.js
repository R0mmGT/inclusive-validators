function validate(input) {
  // Debe ser string
  if (typeof input !== 'string') return false;

  // Trabajamos con la versión recortada (usuarios suelen teclear espacios extras)
  const s = input.trim();

  // Longitud razonable para una línea de dirección
  if (s.length < 3 || s.length > 120) return false;

  // Reglas generales:
  // - debe contener al menos una letra (evita entradas solo numéricas)
  // - sólo se permiten letras Unicode, dígitos, espacios y algunos signos comunes en direcciones
  // - no permitir dos signos de puntuación consecutivos (como ".." o "/-")
  // - debe empezar y terminar con letra o dígito (no con signos ni espacios)
  //
  // Usamos escapes Unicode (\p{L} para letras, \p{N} para números). El flag "u" es necesario.

  // Contiene al menos una letra
  if (!/\p{L}/u.test(s)) return false;

  // Caracteres permitidos
  const allowedRe = /^[\p{L}\p{N}\s\.,\-\/#ºª°'()]+$/u;
  if (!allowedRe.test(s)) return false;

  // No empezar/terminar con signo (sólo letras o números)
  if (!/^[\p{L}\p{N}].*[\p{L}\p{N}]$/u.test(s)) return false;

  // No permitir dos signos de puntuación consecutivos (ignorando espacios)
  const noSpaces = s.replace(/\s+/g, '');
  if (/[.,\-\/#ºª°'()]{2,}/.test(noSpaces)) return false;

  return true;
}
