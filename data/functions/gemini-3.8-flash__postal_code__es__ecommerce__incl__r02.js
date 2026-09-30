function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const trimmed = postalCode.trim();

  // Valida códigos postales internacionales:
  // - Longitud total entre 2 y 12 caracteres (cubre desde códigos de 2-3 dígitos hasta formatos largos como ZIP+4).
  // - Inicia y termina obligatoriamente con un carácter alfanumérico.
  // - Permite letras, números, espacios y guiones intermedios, sin permitir caracteres especiales ni separadores consecutivos.
  const regex = /^[a-zA-Z0-9](?!.*[ -]{2})[a-zA-Z0-9 -]{0,10}[a-zA-Z0-9]$/;

  return regex.test(trimmed);
}
