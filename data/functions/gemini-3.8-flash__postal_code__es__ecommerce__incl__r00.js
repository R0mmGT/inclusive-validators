function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const cleaned = postalCode.trim();

  // Valida códigos postales internacionales (UPU):
  // - Longitud de 2 a 12 caracteres.
  // - Caracteres alfanuméricos básicos (A-Z, 0-9).
  // - Permite espacios y guiones como separadores internos (no consecutivos).
  // - Debe comenzar y terminar con un carácter alfanumérico.
  const postalCodeRegex = /^(?!.*[ -]{2})[a-zA-Z0-9][a-zA-Z0-9 -]{0,10}[a-zA-Z0-9]$/;

  return postalCodeRegex.test(cleaned);
}
