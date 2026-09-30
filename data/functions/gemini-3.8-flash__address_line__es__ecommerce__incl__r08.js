function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Longitud estándar aceptable para una línea de dirección (mínimo 2 caracteres, máximo 255)
  if (trimmed.length < 2 || trimmed.length > 255) {
    return false;
  }

  // Rechaza caracteres de control no imprimibles (incluye saltos de línea) y caracteres HTML peligrosos (< >)
  if (/[\u0000-\u001F\u007F<>]/.test(trimmed)) {
    return false;
  }

  // Debe contener al menos una letra o número en cualquier sistema de escritura/alfabeto (Unicode)
  if (!/[\p{L}\p{N}]/u.test(trimmed)) {
    return false;
  }

  return true;
}
