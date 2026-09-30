function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();

  // Permite formato internacional opcional (+), paréntesis, guiones, puntos y espacios
  const phoneRegex = /^\+?(?:[0-9]{1,4}[-. ]?)?(?:\([0-9]{1,4}\)[-. ]?)?[0-9]{1,4}(?:[-. ]?[0-9]{1,4}){1,3}$/;

  if (!phoneRegex.test(trimmed)) {
    return false;
  }

  // Verifica que la cantidad total de dígitos cumpla el estándar internacional (7 a 15 dígitos)
  const digitsOnly = trimmed.replace(/\D/g, '');
  return digitsOnly.length >= 7 && digitsOnly.length <= 15;
}
