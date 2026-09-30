function validate(addressLine) {
  if (typeof addressLine !== 'string') {
    return false;
  }

  const trimmed = addressLine.trim();

  // Longitud mínima y máxima aceptable para una línea de dirección postal
  if (trimmed.length < 2 || trimmed.length > 250) {
    return false;
  }

  // No permitir caracteres de control ni saltos de línea (debe ser una sola línea)
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Debe contener al menos una letra o ideograma Unicode (alfabeto latino, cirílico, kanji, árabe, etc.)
  // Esto evita entradas formadas solo por números (como códigos postales) o solo signos de puntuación
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // No permitir URLs ni caracteres típicos de inyección/código/HTML
  if (/https?:\/\/|[<>{}`^|=]/i.test(trimmed)) {
    return false;
  }

  // No permitir emojis
  if (/\p{Extended_Pictographic}/u.test(trimmed)) {
    return false;
  }

  return true;
}
