function validate(surname) {
  if (typeof surname !== 'string') {
    return false;
  }

  // Permite apellidos de entre 1 y 100 caracteres.
  // Admite caracteres alfabéticos internacionales (incluyendo tildes, ñ, diéresis, etc.)
  // Admite guiones, apóstrofes y espacios internos simples (no consecutivos ni en los bordes).
  const surnameRegex = /^\p{L}+(?:[' -]\p{L}+)*$/u;

  return surname.length >= 1 && surname.length <= 100 && surnameRegex.test(surname);
}
