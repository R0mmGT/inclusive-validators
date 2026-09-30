function validate(addressLine) {
  if (typeof addressLine !== 'string') {
    return false;
  }

  const trimmed = addressLine.trim();

  // Longitud razonable: al menos 2 caracteres y no exceder los límites habituales de envío (150)
  if (trimmed.length < 2 || trimmed.length > 150) {
    return false;
  }

  // Rechazar caracteres de control y saltos de línea
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Rechazar caracteres que sugieran inyección de código o etiquetas HTML
  if (/[<>]/.test(trimmed)) {
    return false;
  }

  // Debe contener al menos una letra o un número en cualquier alfabeto/idioma (Unicode)
  if (!/[\p{L}\p{N}]/u.test(trimmed)) {
    return false;
  }

  return true;
}
