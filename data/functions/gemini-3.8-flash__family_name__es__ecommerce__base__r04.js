function validate(lastName) {
  if (typeof lastName !== 'string') {
    return false;
  }

  const trimmed = lastName.trim();

  // Comprueba longitud razonable (entre 1 y 60 caracteres)
  if (trimmed.length < 1 || trimmed.length > 60) {
    return false;
  }

  // Permite letras de cualquier alfabeto (Unicode), incluyendo tildes y diéresis,
  // y permite guiones, apóstrofes o espacios siempre que estén entre letras
  // (evita caracteres especiales consecutivos o al inicio/final).
  const regex = /^\p{L}+(?:[' -]\p{L}+)*$/u;

  return regex.test(trimmed);
}
