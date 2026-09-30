function validate(surname) {
  if (typeof surname !== 'string') {
    return false;
  }

  const trimmed = surname.trim();

  // Longitud mínima de 1 carácter y máxima razonable de 70
  if (trimmed.length < 1 || trimmed.length > 70) {
    return false;
  }

  // Permite letras con cualquier acento/grafía Unicode (\p{L})
  // Admite espacios, apóstrofes y guiones entre palabras sin duplicados consecutivos
  const regex = /^[\p{L}]+(?:[' -][\p{L}]+)*$/u;

  return regex.test(trimmed);
}
