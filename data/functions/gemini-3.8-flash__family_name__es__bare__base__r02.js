function validate(surname) {
  if (typeof surname !== 'string') {
    return false;
  }

  // Verifica que tenga una longitud razonable (entre 2 y 100 caracteres)
  if (surname.length < 2 || surname.length > 100) {
    return false;
  }

  // Permite letras Unicode (incluyendo tildes, ñ, etc.), espacios, guiones y apóstrofes intermedios
  const surnameRegex = /^\p{L}+(?:['’\s\-]\p{L}+)*$/u;

  return surnameRegex.test(surname);
}
