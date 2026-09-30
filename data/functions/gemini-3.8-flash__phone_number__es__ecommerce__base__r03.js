function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();

  // Permite '+' opcional al inicio, código de área opcional entre paréntesis,
  // y separadores válidos como espacios o guiones entre grupos de dígitos.
  const phoneRegex = /^\+?(?:\d{1,4}[ -]?)?(?:\(\d{1,4}\)[ -]?)?\d{1,4}(?:[ -]?\d{1,4}){1,4}$/;

  // Valida que el conteo total de dígitos cumpla con el estándar internacional E.164 (7 a 15 dígitos)
  const digits = trimmed.replace(/\D/g, '');

  return phoneRegex.test(trimmed) && digits.length >= 7 && digits.length <= 15;
}
