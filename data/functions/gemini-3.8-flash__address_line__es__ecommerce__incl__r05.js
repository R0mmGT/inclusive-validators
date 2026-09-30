function validate(addressLine) {
  if (typeof addressLine !== 'string') {
    return false;
  }

  const trimmed = addressLine.trim();

  // Comprobar una longitud razonable para una línea de dirección internacional
  if (trimmed.length < 3 || trimmed.length > 150) {
    return false;
  }

  // Rechazar caracteres de control y etiquetas tipo HTML
  if (/[\u0000-\u001F\u007F-\u009F<>]/.test(trimmed)) {
    return false;
  }

  // Debe contener al menos dos caracteres alfanuméricos en cualquier sistema de escritura (Unicode)
  const alphanumericCount = (trimmed.match(/[\p{L}\p{N}]/gu) || []).length;
  if (alphanumericCount < 2) {
    return false;
  }

  // Permitir letras, números, signos de puntuación, símbolos comunes (como º, ª, °) y espacios
  const validPattern = /^[\p{L}\p{N}\p{P}\p{S}\s]+$/u;
  return validPattern.test(trimmed);
}
