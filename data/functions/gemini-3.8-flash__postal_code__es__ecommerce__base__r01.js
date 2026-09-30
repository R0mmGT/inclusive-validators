function validate(str) {
  if (typeof str !== 'string') {
    return false;
  }
  // Valida el formato oficial de código postal (5 dígitos, del 01000 al 52999)
  const regex = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/;
  return regex.test(str);
}
