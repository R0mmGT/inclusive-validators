function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Verifica una longitud razonable (entre 2 y 50 caracteres)
  if (name.length < 2 || name.length > 50) {
    return false;
  }

  // Permite letras de cualquier idioma (\p{L}), incluyendo tildes y diéresis,
  // y permite espacios, guiones o apóstrofes únicamente entre letras (no consecutivos ni en los extremos).
  const nameRegex = /^\p{L}+(?:[' -]\p{L}+)*$/u;

  return nameRegex.test(name);
}
