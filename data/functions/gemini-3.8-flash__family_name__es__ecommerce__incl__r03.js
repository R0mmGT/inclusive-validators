function validate(surname) {
  if (typeof surname !== 'string') {
    return false;
  }

  // Limitar longitud entre 1 y 100 caracteres
  if (surname.length < 1 || surname.length > 100) {
    return false;
  }

  // Debe contener al menos una letra Unicode (soporta alfabetos latinos, cirílicos, asiáticos, árabes, etc.)
  if (!/\p{L}/u.test(surname)) {
    return false;
  }

  // Evitar caracteres especiales o espacios repetidos consecutivamente
  if (/\s{2,}|[-\u2010\u2011\u2013]{2,}|\.{2,}|['’ʼ]{2,}/u.test(surname)) {
    return false;
  }

  // Permite letras (\p{L}), marcas diacríticas/acentos (\p{M}), apóstrofes, guiones, puntos y espacios.
  // Debe iniciar con letra o apóstrofe (ej. 't Hart) y terminar con letra o punto (ej. St. John).
  const surnameRegex = /^[\p{L}\p{M}'’ʼ](?:[\p{L}\p{M}'’ʼ.\-‐‑–\s]*[\p{L}\p{M}'’ʼ.])?$/u;

  return surnameRegex.test(surname);
}
