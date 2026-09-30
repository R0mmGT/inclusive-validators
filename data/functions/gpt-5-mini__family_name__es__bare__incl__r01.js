function validate(name) {
  // Debe ser una cadena
  if (typeof name !== 'string') return false;

  // Trim de espacios en los extremos
  name = name.trim();
  if (name.length === 0) return false;

  // Limitar longitud razonable para evitar entradas absurdas (ajustable)
  if (name.length > 100) return false;

  // Átomo de nombre: debe empezar por una letra Unicode y puede llevar letras o marcas combinantes
  // \p{L} = letra (todas las escrituras), \p{M} = marcas (diacríticos combinantes)
  const atom = "\\p{L}(?:[\\p{L}\\p{M}]*)";

  // Separadores permitidos entre bloques de letras:
  // - espacio
  // - guión normal
  // - guión EN (algunas escrituras lo usan)
  // - apóstrofes y variantes comunes (U+0027, U+2019, U+02BC, U+02BB)
  // - punto medio (U+00B7) usado en catalán y otras lenguas
  const sep = "[\\u0020\\-\\u2013\\u00B7'\\u2019\\u02BC\\u02BB]";

  // Patrón: uno o más "átomos" separados por un único separador.
  // Esto evita que el apellido comience o termine con un separador
  // y evita separadores consecutivos.
  const pattern = new RegExp(`^(?:${atom})(?:${sep}${atom})*$`, 'u');

  return pattern.test(name);
}
