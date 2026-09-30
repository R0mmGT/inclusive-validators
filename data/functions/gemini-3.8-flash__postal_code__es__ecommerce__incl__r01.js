function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const trimmed = postalCode.trim();

  // Valida formatos internacionales:
  // - Longitud total entre 2 y 12 caracteres.
  // - Permite caracteres alfanuméricos internacionales (\p{L} y \p{N}).
  // - Permite espacios o guiones como separadores internos, sin repetición consecutiva.
  // - No permite separadores al inicio ni al final.
  const regex = /^(?!.*[ -]{2})[\p{L}\p{N}][\p{L}\p{N} -]{0,10}[\p{L}\p{N}]$/u;

  return regex.test(trimmed);
}
