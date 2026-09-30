function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  // Valida códigos postales de España (5 dígitos entre 01000 y 52999)
  const regex = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/;

  return regex.test(postalCode.trim());
}
