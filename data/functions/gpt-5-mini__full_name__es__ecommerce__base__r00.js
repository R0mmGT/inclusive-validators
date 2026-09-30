function validate(name) {
  // Valida que name sea un "nombre completo" razonable:
  // - debe ser string, recortado entre 3 y 100 caracteres
  // - debe contener al menos dos palabras (separadas por espacios)
  // - cada palabra puede contener letras Unicode, guiones y apóstrofes (no puede empezar/terminar con ellos)
  // - se permite un punto final en una palabra (para iniciales: "J.")
  // - al menos una de las palabras debe tener 2 o más letras (evita aceptar solo iniciales como "J. R.")
  if (typeof name !== 'string') return false;

  const s = name.trim();
  if (s.length < 3 || s.length > 100) return false;

  // separar por uno o más espacios y filtrar vacíos
  const parts = s.split(/\s+/).filter(Boolean);
  if (parts.length < 2) return false;

  // \p{L} = cualquier letra Unicode. Permitimos guion (-) y apóstrofo ASCII (') y apóstrofo tipográfico (’).
  // Una palabra: empieza por letras, puede tener segmentos internamente unidos por '-' o ''',
  // y opcionalmente terminar en un punto (para iniciales como "J.").
  const wordRe = /^\p{L}+(?:[\'\u2019\-]\p{L}+)*\.?$/u;

  let hasLongWord = false; // palabra con >= 2 letras
  for (const p of parts) {
    if (!wordRe.test(p)) return false;

    // contar letras Unicode en la palabra (ignora guiones, apóstrofes y puntos)
    const letters = p.match(/\p{L}/gu) || [];
    if (letters.length >= 2) hasLongWord = true;
  }

  if (!hasLongWord) return false;

  return true;
}
