function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  if (name.length < 2 || name.length > 50) {
    return false;
  }

  // Permite letras (incluyendo acentos y caracteres Unicode),
  // y separa nombres compuestos con un solo espacio o guion.
  const nameRegex = /^\p{L}+(?:[' -]\p{L}+)*$/u;

  return nameRegex.test(name);
}
