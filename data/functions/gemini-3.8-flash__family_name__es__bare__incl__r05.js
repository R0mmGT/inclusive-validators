function validate(lastName) {
  if (typeof lastName !== 'string') {
    return false;
  }

  // Verifica que tenga una longitud razonable (1 a 100 caracteres)
  // y que contenga al menos un carácter alfabético Unicode.
  // Admite letras de cualquier idioma/alfabeto (\p{L}) y marcas diacríticas (\p{M}).
  // Permite apóstrofes (incluyendo prefijos como 't Hooft), guiones y espacios internos simples.
  const regex = /^(?=.{1,100}$)(?=.*\p{L})[\p{L}\p{M}'’]+(?:[ \-][\p{L}\p{M}'’]+)*$/u;

  return regex.test(lastName);
}
