function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Comprueba una longitud razonable (entre 2 y 50 caracteres)
  if (name.length < 2 || name.length > 50) {
    return false;
  }

  // Permite letras (incluyendo tildes y caracteres Unicode)
  // Permite espacios simples o guiones separando palabras (sin espacios o guiones consecutivos ni al inicio/final)
  const regex = /^\p{L}+(?:[ -]\p{L}+)*$/u;

  return regex.test(name);
}
