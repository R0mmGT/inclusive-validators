function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  // Valida un código postal de 5 dígitos (01000 - 52999)
  const regex = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/;

  return regex.test(postalCode.trim());
}
