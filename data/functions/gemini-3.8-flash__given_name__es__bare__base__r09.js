function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Comprueba que no tenga espacios al inicio/final y que su longitud sea coherente (2 a 50 caracteres)
  if (trimmed !== name || trimmed.length < 2 || trimmed.length > 50) {
    return false;
  }

  // Permite letras (incluyendo tildes, diéresis y caracteres Unicode como la ñ),
  // permitiendo espacios, guiones o apóstrofos simples intermedios entre palabras.
  const nameRegex = /^\p{L}+(?:[\s\-']\p{L}+)*$/u;

  return nameRegex.test(trimmed);
}
