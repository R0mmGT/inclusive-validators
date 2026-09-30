function validate(surname) {
  if (typeof surname !== 'string') {
    return false;
  }

  const trimmed = surname.trim();

  // Longitud mínima de 1 carácter y máxima razonable de 100
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Permite letras (incluyendo acentos, diéresis, ñ y caracteres internacionales),
  // y permite guiones, apóstrofes o espacios solo entre letras (no consecutivos ni al inicio/final).
  const surnameRegex = /^\p{L}+(?:['’ -]\p{L}+)*$/u;

  return surnameRegex.test(trimmed);
}
