function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Una línea de dirección debe tener una longitud razonable (mínimo 2, máximo 200 caracteres)
  if (trimmed.length < 2 || trimmed.length > 200) {
    return false;
  }

  // Rechazar saltos de línea y caracteres de control (debe ser una única línea)
  if (/[\r\n\t\f\v\0]/.test(trimmed)) {
    return false;
  }

  // Debe contener al menos una letra o número en cualquier sistema de escritura Unicode (\p{L} o \p{N})
  if (!/[\p{L}\p{N}]/u.test(trimmed)) {
    return false;
  }

  // Permitir letras, números, marcas diacríticas/vocálicas, signos de puntuación,
  // espacios válidos y símbolos comunes en direcciones (como #, º, ª, /, &, etc.)
  const validAddressPattern = /^[\p{L}\p{N}\p{P}\p{M}\p{Zs}\p{Sm}\p{Sc}\p{So}]+$/u;

  return validAddressPattern.test(trimmed);
}
