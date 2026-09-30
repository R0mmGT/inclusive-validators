function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const length = name.length;
  if (length < 2 || length > 50) {
    return false;
  }

  // Permite letras (incluyendo acentos y caracteres internacionales),
  // y permite espacios o guiones simples entre palabras (nombres compuestos).
  const nameRegex = /^\p{L}+(?:[ -]\p{L}+)*$/u;

  return nameRegex.test(name);
}
