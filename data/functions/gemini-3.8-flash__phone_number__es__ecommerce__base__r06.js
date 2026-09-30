function validate(phone) {
  if (typeof phone !== 'string') return false;

  const trimmed = phone.trim();

  // Permite prefijo internacional opcional (+), paréntesis, guiones, puntos y espacios
  const phoneRegex = /^\+?(?:[0-9]{1,4}[-.\s]?)?(?:\([0-9]{1,5}\)[-.\s]?)?[0-9]{1,5}[-.\s]?[0-9]{1,5}(?:[-.\s]?[0-9]{1,9})?$/;

  if (!phoneRegex.test(trimmed)) {
    return false;
  }

  // Estándar E.164: entre 7 y 15 dígitos numéricos en total
  const digitsCount = trimmed.replace(/\D/g, '').length;
  return digitsCount >= 7 && digitsCount <= 15;
}
