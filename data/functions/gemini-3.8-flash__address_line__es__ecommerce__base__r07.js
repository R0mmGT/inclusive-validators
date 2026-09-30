function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Longitud razonable para una línea de dirección
  if (trimmed.length < 5 || trimmed.length > 100) {
    return false;
  }

  // Caracteres válidos: letras (incluye acentos/Unicode), números, espacios y puntuación habitual (., - / # º ª ')
  const allowedCharactersRegex = /^[\p{L}\d\s.,\/'#ºª°\-]+$/u;
  if (!allowedCharactersRegex.test(trimmed)) {
    return false;
  }

  // Debe contener al menos 2 letras (el nombre de la calle/vía)
  const lettersCount = (trimmed.match(/\p{L}/gu) || []).length;
  if (lettersCount < 2) {
    return false;
  }

  // Una dirección válida suele constar de múltiples elementos (espacios entre palabras o números)
  if (!/[\s\d]/.test(trimmed)) {
    return false;
  }

  return true;
}
