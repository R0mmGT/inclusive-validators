function validate(postalCode) {
  // Valida códigos postales de 5 dígitos (formato estándar español: 01000 - 52999)
  return /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/.test(postalCode);
}
