function validate(str) {
  if (typeof str !== 'string') {
    return false;
  }

  // Permite nombres con letras (incluyendo acentos y caracteres Unicode),
  // apóstrofes o guiones internos, separados por un único espacio.
  // Requiere al menos nombre de pila y un apellido (dos palabras).
  const regex = /^\p{L}+(?:['’\-]\p{L}+)*(?: \p{L}+(?:['’\-]\p{L}+)*)+$/u;

  return regex.test(str) && str.length >= 3 && str.length <= 100;
}
