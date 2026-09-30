function validate(name) {
  // Debe ser una cadena
  if (typeof name !== 'string') return false;

  // Normalizar (combinar marcas) y quitar espacios alrededor
  try {
    name = name.normalize('NFC').trim();
  } catch (e) {
    // Si normalize no está disponible por alguna razón, usar la original
    name = String(name).trim();
  }

  if (name.length === 0) return false;

  // Limitar a un tamaño razonable (en puntos de código)
  const codepoints = Array.from(name).length;
  if (codepoints > 256) return false;

  // Reglas de validación:
  // - Permitir letras y marcas Unicode (\p{L}, \p{M})
  // - Permitir espacios de separación (\p{Zs}) y guiones/dashes (\p{Pd})
  // - Permitir algunos signos comunes en nombres: apostrofes variantes y punto medio
  //   (U+0027 ' , U+2018 ‘ , U+2019 ’ , U+02BC ʼ , U+02BB ʻ , U+FF07 ｧ , U+00B7 · , U+2027 ‧)
  // - No permitir otros dígitos ni puntuación
  const allowed = /^[\p{L}\p{M}\p{Zs}\p{Pd}\u0027\u2018\u2019\u02BC\u02BB\uFF07\u00B7\u2027]+$/u;
  if (!allowed.test(name)) return false;

  // Debe contener al menos una letra
  if (!/\p{L}/u.test(name)) return false;

  // Debe empezar y terminar por una letra (no por signo, espacio, etc.)
  if (!/^\p{L}/u.test(name)) return false;
  if (!/\p{L}$/u.test(name)) return false;

  // No se permiten dos separadores/puntuaciones consecutivos (ej. "--", " -", "''", "··", etc.)
  const consecutiveSeparators = /[\p{Zs}\p{Pd}\u0027\u2018\u2019\u02BC\u02BB\uFF07\u00B7\u2027]{2,}/u;
  if (consecutiveSeparators.test(name)) return false;

  // Todo OK: nombre plausible según reglas inclusivas
  return true;
}
