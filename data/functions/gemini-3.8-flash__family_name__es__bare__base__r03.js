function validate(surname) {
  if (typeof surname !== 'string') {
    return false;
  }

  const trimmed = surname.trim();

  // Debe coincidir con la cadena original (sin espacios al inicio o final) y tener longitud válida
  if (trimmed !== surname || surname.length < 1 || surname.length > 100) {
    return false;
  }

  // Permite letras (incluyendo tildes y caracteres internacionales de cualquier alfabeto),
  // y separadores válidos internos no consecutivos: espacios, guiones y apóstrofes.
  const surnameRegex = /^[\p{L}]+(?:['\s\-][\p{L}]+)*$/u;

  return surnameRegex.test(surname);
}
