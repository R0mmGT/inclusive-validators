function validate(address) {
  // Verificar que sea una cadena de texto
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Longitud razonable para una calle (mínimo 5 caracteres, máximo 100)
  if (trimmed.length < 5 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos dos letras (soporta tildes y caracteres internacionales)
  const letters = trimmed.match(/\p{L}/gu);
  if (!letters || letters.length < 2) {
    return false;
  }

  // Permitir letras, dígitos, espacios y símbolos habituales en direcciones (., #, º, ª, -, /, ', ())
  const validCharsRegex = /^[\p{L}\p{N}\s.,#ºª\-\/'()]+$/u;
  if (!validCharsRegex.test(trimmed)) {
    return false;
  }

  return true;
}
