function validate(s) {
  // Debe ser una cadena
  if (typeof s !== 'string') return false;

  // Longitud razonable (permitimos apellidos largos pero acotamos)
  if (s.length === 0 || s.length > 100) return false;

  // Conjunto de caracteres permitidos:
  // - letras Unicode (\p{L}) y marcas/combinantes (\p{M})
  // - guiones/hyphens (variantes), apóstrofes simples y ’, punto, punto medio (·)
  // - espacios normales y NBSP, además de ZWNJ/U+200C y ZWJ/U+200D (usados en algunas escrituras)
  // Nota: usamos la bandera "u" para soportar escapes Unicode (\p{L}, etc.).
  const allowed = /^[\p{L}\p{M}'\u2019\-\u2010\u2011\u00B7\u002E\u0020\u00A0\u200C\u200D]+$/u;
  if (!allowed.test(s)) return false;

  // Debe contener al menos una letra
  if (!/\p{L}/u.test(s)) return false;

  // No puede empezar con un separador (espacio, guion, apóstrofe, punto, etc.)
  if (!/^\p{L}/u.test(s)) return false;

  // No puede terminar con un separador; permitimos que termine en letra o en marca combinante
  if (!/[\p{L}\p{M}]$/u.test(s)) return false;

  // No puede contener dígitos
  if (/\p{N}/u.test(s)) return false;

  // No permitir dos separadores consecutivos (espacio, apóstrofe, guion, punto, ·, ZWNJ/ZWJ)
  // Esto evita cadenas como "--", "  ", "' ", ".-" y combinaciones similares.
  const consecutiveSeparators = /(?:['\u2019\-\u2010\u2011\u00B7\u002E\u0020\u00A0\u200C\u200D]){2,}/u;
  if (consecutiveSeparators.test(s)) return false;

  // A estas alturas la cadena parece un apellido razonable para muchas culturas.
  return true;
}
