function validate(str) {
  if (typeof str !== 'string') {
    return false;
  }

  const trimmed = str.trim();

  // Longitud razonable entre 2 y 50 caracteres
  if (trimmed.length < 2 || trimmed.length > 50) {
    return false;
  }

  // Permite letras (incluye acentos, diéresis, ñ y caracteres de cualquier idioma usando \p{L}),
  // así como espacios, guiones o apóstrofes internos entre letras (no consecutivos ni en los extremos).
  const nameRegex = /^\p{L}+(?:[' -]\p{L}+)*$/u;

  return nameRegex.test(trimmed);
}
