function validate(str) {
  if (typeof str !== 'string' || str.length < 1 || str.length > 100) {
    return false;
  }

  // Permite letras Unicode (incluyendo tildes, ñ, etc.), espacios, apóstrofes y guiones.
  // No permite separadores consecutivos ni al principio o final.
  const surnameRegex = /^[\p{L}]+(?:['’ -][\p{L}]+)*$/u;

  return surnameRegex.test(str);
}
