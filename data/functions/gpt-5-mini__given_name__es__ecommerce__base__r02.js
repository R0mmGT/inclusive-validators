function validate(name) {
  // Debe ser string
  if (typeof name !== 'string') return false;

  // Recortar espacios al inicio/final
  const s = name.trim();

  // Longitud razonable (ajustable). Evita valores vacíos o extremadamente largos.
  if (s.length < 2 || s.length > 60) return false;

  // Caracteres permitidos:
  // - Letras Unicode (\p{L}) y marcas diacríticas (\p{M})
  // - Espacio normal (U+0020), guion medio (-), apóstrofo simple (') y apóstrofo tipográfico (U+2019)
  // No se permiten dígitos, puntuación diversa, símbolos ni saltos de línea.
  const allowedRe = /^[\p{L}\p{M} '\-’]+$/u;
  if (!allowedRe.test(s)) return false;

  // Debe empezar y terminar por una letra
  if (!/^\p{L}/u.test(s) || !/\p{L}$/u.test(s)) return false;

  // No permitir separadores repetidos o adyacentes (ej.: doble espacio, espacio+guion, --, '' etc.)
  if (/[ '\-’]{2,}/u.test(s)) return false;

  // Cada "parte" separada por espacios debe contener al menos una letra
  // y no puede empezar/terminar por guion o apóstrofo.
  const parts = s.split(' ');
  for (const part of parts) {
    if (!/\p{L}/u.test(part)) return false;
    if (/^[\-'’]/.test(part) || /[\-'’]$/.test(part)) return false;
  }

  return true;
}
