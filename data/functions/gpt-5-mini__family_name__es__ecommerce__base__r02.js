function validate(surname) {
  // Debe ser una cadena
  if (typeof surname !== 'string') return false;

  // Trim para eliminar espacios iniciales/finales
  const str = surname.trim();

  // Longitud razonable: entre 2 y 60 caracteres
  if (str.length < 2 || str.length > 60) return false;

  // Permite letras Unicode (y marcas diacríticas), separadas opcionalmente por
  // un solo espacio, guion o apóstrofo (incluye U+2019).
  // No permite dígitos ni otros signos, ni separadores al inicio/final, ni consecutivos.
  const re = /^[\p{L}\p{M}]+(?:[ \-'\u2019][\p{L}\p{M}]+)*$/u;

  return re.test(str);
}
