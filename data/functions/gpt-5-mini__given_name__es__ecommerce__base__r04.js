// Valida un nombre de pila (primero) razonable:
// - acepta letras unicode (incluye acentos y otros signos diacríticos)
// - permite espacios simples, guiones, apóstrofes y puntos entre letras
// - no permite caracteres repetidos de separación (ej. "--", "  ", ".'")
// - requiere que empiece y termine por una letra
// - longitud (tras recortar) entre 2 y 60 caracteres
function validate(input) {
  if (typeof input !== 'string') return false;
  const name = input.trim();
  if (name.length < 2 || name.length > 60) return false;
  // \p{L} = cualquier letra, \p{M} = marcas diacríticas (para combinar con letras)
  // Se usa el modificador u para soportar escapes de propiedad unicode.
  const re = /^(?=.{2,60}$)[\p{L}\p{M}](?:[\p{L}\p{M}]|[ '\-\.](?=[\p{L}\p{M}]))*$/u;
  return re.test(name);
}
