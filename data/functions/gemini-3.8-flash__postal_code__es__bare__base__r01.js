function validate(postalCode) {
  // Valida el formato de código postal de España (5 dígitos del 01000 al 52999)
  return /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/.test(postalCode);
}
