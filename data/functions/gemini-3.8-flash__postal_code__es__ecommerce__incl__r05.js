function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const trimmed = postalCode.trim();

  // Valida códigos postales internacionales:
  // - Longitud de entre 2 y 14 caracteres.
  // - Comienza y termina con caracteres alfanuméricos.
  // - Permite números, letras y espacios o guiones simples no consecutivos.
  return /^[a-zA-Z0-9](?:[a-zA-Z0-9]|[- ](?=[a-zA-Z0-9])){1,13}$/.test(trimmed);
}
