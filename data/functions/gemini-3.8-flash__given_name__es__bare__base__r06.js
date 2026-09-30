function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Verifica que tenga una longitud razonable (entre 2 y 50 caracteres)
  if (name.length < 2 || name.length > 50) {
    return false;
  }

  // Permite letras (incluyendo acentos y diacríticos Unicode),
  // admitiendo nombres compuestos separados por un único espacio o guion
  const regex = /^\p{L}+(?:[ -]\p{L}+)*$/u;

  return regex.test(name);
}
