function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud razonable para un nombre de pila
  if (trimmed.length < 2 || trimmed.length > 50) {
    return false;
  }

  // Permite letras (incluyendo tildes y caracteres internacionales de cualquier idioma)
  // y permite espacios, guiones o apóstrofes solo como separadores internos entre letras.
  const regex = /^[\p{L}]+(?:[' -][\p{L}]+)*$/u;

  return regex.test(trimmed);
}
