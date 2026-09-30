function validate(str) {
  if (typeof str !== 'string') {
    return false;
  }

  // Permite letras (incluyendo tildes, diéresis y la ñ), apóstrofes, guiones y espacios internos.
  // No permite números ni caracteres especiales, ni que empiece o termine con espacios/guiones/apóstrofes.
  const regex = /^[\p{L}]+(?:[' -][\p{L}]+)*$/u;

  return str.length >= 1 && str.length <= 100 && regex.test(str);
}
