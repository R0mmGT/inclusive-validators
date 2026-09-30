function validate(postalCode) {
  // Valida un código postal de 5 dígitos correspondiente a una provincia válida (01 a 52)
  return typeof postalCode === 'string' && /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/.test(postalCode.trim());
}
