function validate(addressLine) {
  if (typeof addressLine !== 'string') {
    return false;
  }

  const trimmed = addressLine.trim();

  // Longitud razonable para direcciones postales a nivel internacional (mín. 3, máx. 250 caracteres)
  if (trimmed.length < 3 || trimmed.length > 250) {
    return false;
  }

  // Rechazar caracteres de control o etiquetas/inyecciones (<, >)
  if (/[\u0000-\u001F\u007F-\u009F<>]/.test(trimmed)) {
    return false;
  }

  // Una calle/dirección válida debe contener al menos una letra o ideograma (\p{L})
  // para evitar que se ingresen únicamente números (códigos postales o teléfonos) o puntuación
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Debe contener al menos dos caracteres alfanuméricos en total
  const alphanumCount = (trimmed.match(/[\p{L}\p{N}]/gu) || []).length;
  if (alphanumCount < 2) {
    return false;
  }

  // Permitir letras/ideogramas (\p{L}), números (\p{N}), marcas/tildes combinables (\p{M}),
  // puntuación común en direcciones (\p{P}), separadores/espacios (\p{Z}) y símbolos válidos como №, °, # (\p{S})
  return /^[\p{L}\p{N}\p{M}\p{P}\p{Z}\p{S}]+$/u.test(trimmed);
}
