function validate(s) {
  // Debe ser string
  if (typeof s !== 'string') return false;

  // Quitar espacios al principio y final
  const str = s.trim();

  // Longitud razonable para un apellido (ajustable)
  if (str.length < 2 || str.length > 60) return false;

  // Permitimos letras Unicode (con marcas), guion, espacio y apóstrofes comunes (ASCII y U+2019).
  // Reglas:
  // - No puede empezar ni terminar con separador (espacio/guion/apóstrofe)
  // - No puede contener separadores consecutivos
  // - Grupos de letras deben estar separados solo por un único separador
  const re = /^(?!.*[ \-\u0027\u2019]{2})(?![ \-\u0027\u2019])(?!.*[ \-\u0027\u2019]$)[\p{L}\p{M}]+(?:[ \-\u0027\u2019][\p{L}\p{M}]+)*$/u;

  return re.test(str);
}
