function validate(str) {
  // Valida números de teléfono en formato estadounidense:
  // Permite opcionalmente el prefijo '1' (con o sin espacio),
  // códigos de área con o sin paréntesis y separadores espacios o guiones.
  const re = /^(?:1\s?)?(?:\(\d{3}\)|\d{3})(?:[\s-]?)\d{3}(?:[\s-]?)\d{4}$/;
  return re.test(str);
}
