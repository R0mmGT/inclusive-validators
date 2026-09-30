function validate(phone) {
  if (typeof phone !== 'string') return false;

  const trimmed = phone.trim();

  // Permite prefijo internacional (+), dígitos y separadores comunes (espacios, guiones, puntos y paréntesis)
  const phoneRegex = /^\+?(?:(?:\(\d{1,4}\)|\d{1,4})[-.\s]?)?(?:\(?\d{1,4}\)?[-.\s]?)*\d{1,4}$/;

  if (!phoneRegex.test(trimmed)) {
    return false;
  }

  // Comprueba la cantidad total de dígitos según el estándar internacional E.164 (entre 7 y 15 dígitos)
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}
