function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  // Valida códigos postales de España: 5 dígitos numéricos
  // donde los dos primeros corresponden a una provincia válida (01 a 52)
  const postalCodeRegex = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/;

  return postalCodeRegex.test(postalCode);
}
