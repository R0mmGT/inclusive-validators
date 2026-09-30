function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const code = postalCode.trim();

  // Longitud estándar mundial para códigos postales (entre 2 y 12 caracteres con separadores)
  if (code.length < 2 || code.length > 12) {
    return false;
  }

  // Debe contener al menos un dígito numérico
  if (!/\d/.test(code)) {
    return false;
  }

  // Valida formatos internacionales:
  // 1. Prefijo opcional de país de 1 a 3 letras seguido de guion o espacio (ej. "LV-", "SE ")
  // 2. Un único bloque de 2 a 10 caracteres alfanuméricos (ej. 90210, 100000, 1234567890, C1024CWN)
  // 3. O dos bloques separados por espacio o guion (ej. SW1A 1AA, 90210-1234, K1A 0B1, 12-345, 1234-567)
  const regex = /^(?:[A-Z]{1,3}[- ])?(?:[A-Z0-9]{2,10}|[A-Z0-9]{1,5}[- ][A-Z0-9]{1,5})$/i;

  return regex.test(code);
}
