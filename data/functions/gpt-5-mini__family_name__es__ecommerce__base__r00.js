function validate(surname) {
  // Debe ser string
  if (typeof surname !== 'string') return false;

  // Normalizar y recortar espacios alrededor
  surname = surname.normalize('NFC').trim();

  // Longitud razonable (ajustable)
  if (surname.length < 2 || surname.length > 100) return false;

  // Permitir letras Unicode (incluye acentos y ñ), marcas diacríticas,
  // y separadores comunes en apellidos: espacio, guion (-) y apóstrofo (ASCII y U+2019).
  // Cada "parte" debe comenzar y continuar con letras/marcas (evita separadores consecutivos).
  const re = /^[\p{L}\p{M}]+(?:[ '\u2019\-][\p{L}\p{M}]+)*$/u;

  return re.test(surname);
}
