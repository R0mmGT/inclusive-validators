function validate(addressLine) {
  // Verificar que el argumento sea una cadena de texto
  if (typeof addressLine !== 'string') {
    return false;
  }

  const trimmed = addressLine.trim();

  // Comprobar una longitud razonable para direcciones globales (ej. entre 2 y 250 caracteres)
  if (trimmed.length < 2 || trimmed.length > 250) {
    return false;
  }

  // Rechazar caracteres de control invisibles o no imprimibles
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Rechazar etiquetas/caracteres potencialmente peligrosos como '<' o '>'
  if (/[<>]/.test(trimmed)) {
    return false;
  }

  // Debe contener al menos una letra o número en cualquier sistema de escritura/idioma del mundo
  // \p{L} cubre cualquier letra (latina, cirílica, árabe, caracteres CJK, etc.)
  // \p{N} cubre cualquier número o numeral internacional
  if (!/[\p{L}\p{N}]/u.test(trimmed)) {
    return false;
  }

  return true;
}
