function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  // Valida un código postal estándar de 5 dígitos (01000 - 52999 para España y 01000 - 99999 general)
  const postalCodeRegex = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/;

  return postalCodeRegex.test(postalCode.trim());
}
