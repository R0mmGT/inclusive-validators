function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Comprueba límites de longitud razonables (desde monónimos de 1 caracter hasta nombres extensos)
  if (trimmed.length < 1 || trimmed.length > 150) {
    return false;
  }

  // Debe contener al menos un carácter que sea una letra o ideograma
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permite:
  // - \p{L}: cualquier letra en cualquier sistema de escritura (alfabético, ideográfico, etc.)
  // - \p{M}: marcas diacríticas y combinatorias (tildes, acentos, vocales en escrituras abugida)
  // - \p{Pd}: guiones y rayas (para nombres compuestos)
  // - \s: espacios
  // - '’ʻʼ: apóstrofes y signos glotales (comunes en lenguas polinesias, semíticas, celtas, etc.)
  // - .·: puntos (abreviaturas e iniciales) y puntos medios (catalán, transliteraciones)
  const validNamePattern = /^[\p{L}\p{M}\p{Pd}\s'’ʻʼ.·]+$/u;

  return validNamePattern.test(trimmed);
}
