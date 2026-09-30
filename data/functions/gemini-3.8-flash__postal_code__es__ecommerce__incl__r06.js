function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const trimmed = postalCode.trim();

  // Los códigos postales a nivel internacional están compuestos por caracteres alfanuméricos
  // y pueden incluir espacios o guiones como separadores simples.
  const regex = /^[a-zA-Z0-9]+([ -][a-zA-Z0-9]+)*$/;

  if (!regex.test(trimmed)) {
    return false;
  }

  // De acuerdo con los estándares de la Unión Postal Universal (UPU),
  // la longitud del contenido alfanumérico varía globalmente entre 2 y 10 caracteres.
  const alphanumericCount = trimmed.replace(/[\s-]/g, '').length;

  return alphanumericCount >= 2 && alphanumericCount <= 10;
}
