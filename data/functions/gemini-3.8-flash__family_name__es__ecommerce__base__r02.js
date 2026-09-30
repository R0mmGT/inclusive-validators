function validate(lastName) {
  if (typeof lastName !== 'string') {
    return false;
  }

  const trimmed = lastName.trim();

  // Longitud razonable para un apellido (entre 2 y 60 caracteres)
  if (trimmed.length < 2 || trimmed.length > 60) {
    return false;
  }

  // Soporta cualquier letra Unicode (\p{L}: acentos, ñ, alfabetos internacionales),
  // y permite guiones, espacios simples y apóstrofes (rectos o tipográficos) entre letras.
  const nameRegex = /^[\p{L}]+(?:['’ -][\p{L}]+)*$/u;

  return nameRegex.test(trimmed);
}
