function validate(addressLine) {
  if (typeof addressLine !== 'string') {
    return false;
  }

  const trimmed = addressLine.trim();

  // Longitud razonable para una línea de dirección (calle)
  if (trimmed.length < 2 || trimmed.length > 150) {
    return false;
  }

  // No debe contener saltos de línea ni caracteres de control
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Debe contener al menos un carácter alfanumérico (cualquier sistema de escritura o número Unicode)
  if (!/[\p{L}\p{N}]/u.test(trimmed)) {
    return false;
  }

  // Permite letras (\p{L}), números (\p{N}), marcas diacríticas/acentos (\p{M}),
  // espacios y signos de puntuación habituales en direcciones internacionales.
  const validPattern = /^[\p{L}\p{N}\p{M}\s,.'#\-/\\()ºª№&;:"“”«»’،・]+$/u;

  return validPattern.test(trimmed);
}
