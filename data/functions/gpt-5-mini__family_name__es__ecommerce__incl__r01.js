function validate(name) {
  // Acepta solo strings
  if (typeof name !== 'string') return false;

  // Normalizar y recortar (incluye algunos espacios NO_BREAK)
  // Se usa replace para eliminar espacios Unicode comunes al inicio/fin
  let s = name.replace(/^[\s\u00A0\u202F]+|[\s\u00A0\u202F]+$/gu, '');
  // Normalización Unicode para combinar letras + diacríticos de forma consistente
  try { s = s.normalize('NFC'); } catch (e) { /* si no existe normalize, seguir sin ella */ }

  // Longitud razonable: al menos 1 carácter y límite alto para evitar abuse
  if (s.length === 0 || s.length > 100) return false;

  // Reglas generales:
  // - permitir letras Unicode (\p{L}) y marcas combinantes (\p{M})
  // - permitir guiones/dashes (\p{Pd}), apóstrofes ASCII y tipográficos, punto medio, y algunos espacios usados en nombres
  // - permitir ZWNJ/ZWJ (útiles en algunas escrituras)
  // No se permiten números ni otros signos de puntuación
  const allowedRe = /^[\p{L}\p{M}\p{Pd}'\u2019\u00B7\u200C\u200D\u00A0\u202F ]+$/u;
  if (!allowedRe.test(s)) return false;

  // Debe contener al menos una letra
  if (!/\p{L}/u.test(s)) return false;

  // No puede empezar ni terminar por un separador (espacio, guion, apóstrofe, etc.)
  const edgeOk = /^[\p{L}\p{M}].*[\p{L}\p{M}]$/u;
  if (!edgeOk.test(s)) return false;

  // No permitir separadores consecutivos (p. ej. "--", "  ", "''", "- ", etc.)
  const consecutiveSepRe = /[\p{Pd}'\u2019\u00B7\u200C\u200D\u00A0\u202F ]{2,}/u;
  if (consecutiveSepRe.test(s)) return false;

  // Todo ok: parece un apellido razonable para uso internacional
  return true;
}
