function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();

  // Valida estructura básica: código de país opcional (+), paréntesis opcionales para código de área,
  // y separadores válidos (espacios, guiones, puntos).
  const phonePattern = /^(\+?\d{1,4}[\s.-]*)?(\(\d{1,5}\)[\s.-]*)?(\d[\s.-]*){6,14}\d$/;

  if (!phonePattern.test(trimmed)) {
    return false;
  }

  // Verifica que la cantidad total de dígitos cumpla con el estándar internacional E.164 (entre 7 y 15 dígitos)
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}
