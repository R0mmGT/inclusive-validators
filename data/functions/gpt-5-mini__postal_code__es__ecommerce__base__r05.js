function validate(postalCode) {
  // Valida que sea string
  if (typeof postalCode !== 'string') return false;

  // Elimina espacios al inicio y final
  const code = postalCode.trim();

  // Código postal español: 5 dígitos, los dos primeros entre 01 y 52 (provincias)
  const re = /^(0[1-9]|[1-4][0-9]|5[0-2])\d{3}$/;

  return re.test(code);
}
