function validate(surname) {
  if (typeof surname !== 'string') {
    return false;
  }

  const trimmed = surname.trim();

  // Comprueba la longitud (mínimo 2 caracteres, máximo 60)
  if (trimmed.length < 2 || trimmed.length > 60) {
    return false;
  }

  // Permite letras (con soporte Unicode para tildes, eñes, etc.)
  // y permite guiones, apóstrofes o espacios no consecutivos entre letras.
  const regex = /^\p{L}+(?:[' -]\p{L}+)*$/u;

  return regex.test(trimmed);
}
