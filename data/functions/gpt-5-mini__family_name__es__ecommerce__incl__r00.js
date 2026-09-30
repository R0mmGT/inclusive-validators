// Valida apellidos de forma amplia y multicultural.
// - Acepta cualquier letra Unicode (\p{L}), marcas de combinación (\p{M}) y los caracteres de unión U+200C/U+200D.
// - Permite separadores internos: espacios Unicode (\p{Zs}), guiones/dashes (\p{Pd}), apóstrofes comunes y variantes, y el punto medio (·).
// - No permite dígitos ni otros signos de puntuación, ni separadores al principio/fin, ni separadores repetidos.
// - Límite razonable de longitud para evitar entradas absurdamente largas (100 puntos de código).
function validate(name) {
  if (typeof name !== 'string') return false;

  // Normalizar espacios en los bordes y comprobar vacío
  name = name.trim();
  if (!name) return false;

  // Límite en número de puntos de código Unicode (no unidades de código UTF-16)
  if ([...name].length > 100) return false;

  // Patrón:
  // - Empieza con una o más letras/marcas/zwj/zwnj
  // - Luego cero o más repeticiones de: (separador válido) + (una o más letras/marcas/zwj/zwnj)
  // Separadores válidos: espacios Unicode (\p{Zs}), cualquier carácter de dash (\p{Pd}),
  // apóstrofes (', ’, ‘, ʼ) y el punto medio (·).
  const re = /^[\p{L}\p{M}\u200C\u200D]+(?:(?:\p{Zs}|\p{Pd}|['\u2019\u2018\u02BC\u00B7])[\p{L}\p{M}\u200C\u200D]+)*$/u;

  return re.test(name);
}
