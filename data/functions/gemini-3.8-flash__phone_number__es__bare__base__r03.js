function validate(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    return false;
  }

  const trimmed = phoneNumber.trim();
  const digits = trimmed.replace(/\D/g, '');

  // Según el estándar internacional E.164, un número válido tiene entre 7 y 15 dígitos
  if (digits.length < 7 || digits.length > 15) {
    return false;
  }

  // Valida formatos con prefijo '+', espacios, puntos, guiones y paréntesis balanceados
  const phoneRegex = /^\+?(?:[0-9][-.\s]?|\([0-9]+\)[-.\s]?)*[0-9]$/;

  return phoneRegex.test(trimmed);
}
