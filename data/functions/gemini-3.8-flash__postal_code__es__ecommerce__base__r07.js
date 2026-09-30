function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const cleanCode = postalCode.trim();

  // Valida formatos comunes de código postal a nivel internacional:
  // - Códigos puramente numéricos de 4 a 8 dígitos (ej. España, Francia, Alemania, México)
  // - Códigos numéricos con guion o espacio (ej. EE. UU. ZIP+4 '12345-6789', Brasil '12345-678', Japón '123-4567')
  // - Alfanuméricos habituales:
  //   * Canadá (ej. 'A1A 1A1' o 'A1A-1A1')
  //   * Reino Unido (ej. 'SW1A 1AA', 'EC1A 1BB')
  //   * Países Bajos (ej. '1234 AB')
  const postalCodePattern = /^(?:[0-9]{4,8}|[0-9]{3,5}[-\s][0-9]{3,4}|[A-Za-z][0-9][A-Za-z][-\s]?[0-9][A-Za-z][0-9]|[A-Za-z]{1,2}[0-9][A-Za-z0-9]?[-\s]?[0-9][A-Za-z]{2}|[0-9]{4}[-\s]?[A-Za-z]{2})$/;

  return postalCodePattern.test(cleanCode);
}
