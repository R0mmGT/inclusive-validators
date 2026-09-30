function validate(str) {
  if (typeof str !== 'string') {
    return false;
  }

  const postalCode = str.trim();

  // Permite códigos postales de cualquier país según los estándares de la UPU:
  // - Longitud total entre 2 y 12 caracteres.
  // - Compuesto por caracteres alfanuméricos (A-Z, a-z, 0-9).
  // - Permite espacios simples y guiones como separadores internos.
  // - Debe empezar y terminar con un carácter alfanumérico.
  // - No permite separadores consecutivos (ej. "--" o "  ").
  const regex = /^(?!.*[ -]{2})[a-zA-Z0-9][a-zA-Z0-9 -]{0,10}[a-zA-Z0-9]$/;

  return regex.test(postalCode);
}
