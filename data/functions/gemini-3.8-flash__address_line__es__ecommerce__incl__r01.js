function validate(addressLine) {
  // Debe ser un string
  if (typeof addressLine !== 'string') {
    return false;
  }

  const trimmed = addressLine.trim();

  // Longitud razonable: mínimo 2 caracteres (para permitir sistemas compactos como kanji/hanzi)
  // y máximo 255 caracteres estándar en bases de datos.
  if (trimmed.length < 2 || trimmed.length > 255) {
    return false;
  }

  // Rechazar caracteres de control o saltos de línea (al ser un campo de línea única)
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Debe contener al menos un carácter alfanumérico en cualquier alfabeto del mundo (Unicode)
  if (!/[\p{L}\p{N}]/u.test(trimmed)) {
    return false;
  }

  // Rechazar texto que consista únicamente en un mismo carácter repetido (ej. "aaaaa", "11111")
  if (/^(.)\1+$/.test(trimmed)) {
    return false;
  }

  return true;
}
