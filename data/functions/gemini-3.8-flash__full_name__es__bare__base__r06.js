function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Exige al menos dos palabras formadas por letras (soporta acentos y caracteres Unicode)
  // Permite apóstrofes, guiones y puntos (para abreviaturas/iniciales) dentro o al final de las palabras.
  const fullNameRegex = /^\p{L}+(?:['’.-]\p{L}+)*\.?(?:\s+\p{L}+(?:['’.-]\p{L}+)*\.?)+$/u;

  return fullNameRegex.test(trimmed);
}
