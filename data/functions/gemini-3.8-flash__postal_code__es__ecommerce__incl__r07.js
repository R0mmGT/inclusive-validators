function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const trimmed = postalCode.trim();

  // Los códigos postales internacionales varían entre 2 y 10 caracteres alfanuméricos,
  // pudiendo incluir guiones o espacios sencillos como separadores.
  // Debe iniciar y terminar con un carácter alfanumérico y no contener separadores consecutivos.
  const pattern = /^[A-Za-z0-9]+(?:[ -][A-Za-z0-9]+)*$/;

  if (!pattern.test(trimmed)) {
    return false;
  }

  // Verificar que la cantidad total de caracteres alfanuméricos esté dentro del estándar mundial (2 a 10)
  const alphanumericCount = trimmed.replace(/[^A-Za-z0-9]/g, '').length;
  return alphanumericCount >= 2 && alphanumericCount <= 10;
}
