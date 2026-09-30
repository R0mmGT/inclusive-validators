function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Comprobar una longitud razonable para una línea de calle internacional
  if (trimmed.length < 2 || trimmed.length > 200) {
    return false;
  }

  // Debe contener al menos una letra o ideograma (nombre de calle, localidad o tipo de vía)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Rechazar caracteres de control o caracteres sospechosos de inyección/código
  if (/[\u0000-\u001F\u007F-\u009F<>{}\\]/.test(trimmed)) {
    return false;
  }

  // Permitir letras (cualquier idioma/alfabeto), números, marcas diacríticas,
  // espacios en blanco, signos de puntuación estándar e internacionales, y símbolos válidos como ° o +
  const validPattern = /^[\p{L}\p{N}\p{M}\s\p{P}°+]+$/u;

  return validPattern.test(trimmed);
}
