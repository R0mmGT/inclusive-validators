function validate(surname) {
  if (typeof surname !== 'string') {
    return false;
  }

  // Permite letras (incluyendo acentos y caracteres Unicode), espacios, guiones y apóstrofes.
  // No permite separadores consecutivos, ni al inicio o al final.
  const surnameRegex = /^\p{L}+(?:[' -]\p{L}+)*$/u;

  return surname.length >= 1 && surname.length <= 100 && surnameRegex.test(surname);
}
