function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Permite nombres de 2 a 50 caracteres compuestos por letras (incluidos acentos y caracteres Unicode),
  // permitiendo espacios, guiones o apóstrofes solo como separadores internos entre palabras.
  const regex = /^\p{L}+(?:[' -]\p{L}+)*$/u;

  return name.length >= 2 && name.length <= 50 && regex.test(name);
}
