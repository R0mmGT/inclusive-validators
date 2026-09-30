function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();

  // Permite prefijo internacional (+), código de área opcional entre paréntesis,
  // y separadores comunes (espacios, guiones, puntos).
  const phoneRegex = /^(?:\+\d{1,3}[-.\s]*)?(?:\(\d{1,4}\)[-.\s]*)?(?:\d[-.\s]*){6,14}\d$/;

  if (!phoneRegex.test(trimmed)) {
    return false;
  }

  // Comprueba que la cantidad total de dígitos cumpla con el estándar E.164 (entre 7 y 15 dígitos)
  const digitsOnly = trimmed.replace(/\D/g, '');
  return digitsOnly.length >= 7 && digitsOnly.length <= 15;
}
