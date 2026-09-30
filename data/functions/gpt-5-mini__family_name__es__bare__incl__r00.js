function validate(name) {
  // Solo aceptamos strings
  if (typeof name !== 'string') return false;

  // Recortar espacios externos y normalizar cualquier secuencia de espacios Unicode a un espacio ASCII
  let s = name.trim().replace(/\s+/gu, ' ');
  if (s.length === 0) return false;

  // Limitar longitud razonable (en puntos de código Unicode)
  const maxLen = 100;
  if ([...s].length > maxLen) return false;

  // Patrón:
  // - Empieza y termina con una secuencia de letras (incluye todas las escrituras Unicode) y marcas combinantes.
  // - Entre esas secuencias puede haber separadores permitidos: espacio (varias formas), guiones (varias formas),
  //   apóstrofos (varias formas) y puntos medios usados en nombres (·, ・).
  // - No se permiten dígitos, subrayados, puntos finales (.), comas u otros signos de puntuación no listados.
  //
  // \p{L} = letra en cualquier escritura; \p{M} = marcas combinantes (diacríticos).
  const re = /^[\p{L}\p{M}]+(?:[ \u00A0\u1680\u2000-\u200A\u202F\u205F\u3000\-\u2010\u2011\u2012\u2013\u2014\u2015'\u2019\u02BC\u00B7\u30FB][\p{L}\p{M}]+)*$/u;

  return re.test(s);
}
