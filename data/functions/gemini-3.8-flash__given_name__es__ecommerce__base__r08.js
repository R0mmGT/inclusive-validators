function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Comprueba una longitud razonable para un nombre de pila (2 a 50 caracteres)
  if (trimmed.length < 2 || trimmed.length > 50) {
    return false;
  }

  // Permite letras de cualquier alfabeto (Unicode), incluyendo tildes y caracteres como la 'ñ',
  // permitiendo espacios, guiones y apóstrofes simples entre nombres sin repeticiones consecutivas.
  const nameRegex = /^[\p{L}]+(?:['’ -][\p{L}]+)*$/u;

  return nameRegex.test(trimmed);
}
