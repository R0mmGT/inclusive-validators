function validate(addressLine) {
  if (typeof addressLine !== 'string') {
    return false;
  }

  const trimmed = addressLine.trim();

  // Debe tener una longitud razonable para una línea de dirección
  if (trimmed.length < 2 || trimmed.length > 250) {
    return false;
  }

  // Rechazar caracteres de control no imprimibles
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Rechazar posibles etiquetas o inyecciones básicas (< o >)
  if (/[<>]/.test(trimmed)) {
    return false;
  }

  // Debe contener al menos un carácter alfanumérico en cualquier sistema de escritura
  // (\p{L} cubre letras Unicode de cualquier idioma, \p{N} cubre números)
  if (!/[\p{L}\p{N}]/u.test(trimmed)) {
    return false;
  }

  // No puede ser exclusivamente números (ej. código postal o teléfono ingresado por error)
  if (/^\p{N}+$/u.test(trimmed)) {
    return false;
  }

  return true;
}
