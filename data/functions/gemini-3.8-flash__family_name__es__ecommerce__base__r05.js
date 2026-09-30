function validate(surname) {
  if (typeof surname !== 'string') {
    return false;
  }

  const trimmed = surname.trim();

  // Longitud razonable para un apellido (entre 1 y 60 caracteres)
  if (trimmed.length < 1 || trimmed.length > 60) {
    return false;
  }

  // Permite letras unicode (incluye acentos, ñ, etc.), espacios, apóstrofes y guiones.
  // No permite números ni caracteres especiales extraños, ni separadores consecutivos o en los extremos.
  const surnameRegex = /^\p{L}+(?:['’ -]\p{L}+)*$/u;

  return surnameRegex.test(trimmed);
}
