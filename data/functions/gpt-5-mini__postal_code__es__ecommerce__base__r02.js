function validate(input) {
  // Asegura que sea string
  if (typeof input !== 'string') return false;
  // Quitamos espacios en los extremos
  const s = input.trim();
  // Código postal español: 5 dígitos, los dos primeros entre 01 y 52
  // Ejemplos válidos: "28013", "01001", "52001"
  return /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/.test(s);
}
