function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();
  if (!trimmed) {
    return false;
  }

  // Permite '+' opcional solo al inicio, seguido de dígitos y separadores comunes (espacios, guiones, puntos y paréntesis)
  const allowedFormat = /^\+?[0-9\s.\-()]+$/;
  if (!allowedFormat.test(trimmed)) {
    return false;
  }

  // Verifica que los paréntesis estén correctamente balanceados y no vacíos
  if (trimmed.includes('()')) {
    return false;
  }

  let openParens = 0;
  for (let i = 0; i < trimmed.length; i++) {
    if (trimmed[i] === '(') {
      openParens++;
    } else if (trimmed[i] === ')') {
      openParens--;
      if (openParens < 0) {
        return false;
      }
    }
  }
  if (openParens !== 0) {
    return false;
  }

  // Extrae únicamente los dígitos para validar la longitud según estándares internacionales (ITU-T E.164 permite hasta 15 dígitos)
  const digits = trimmed.replace(/\D/g, '');

  return digits.length >= 4 && digits.length <= 15;
}
