function validate(input) {
  // Debe ser una cadena
  if (typeof input !== 'string') return false;

  // Normalizar espacios y recortar
  const s = input.trim().replace(/\s+/g, ' ');
  // Longitud razonable para una línea de dirección
  if (s.length < 5 || s.length > 100) return false;

  // Rechazar caracteres de control y posibles vectores de inyección
  if (/[<>{}\[\]\|\\\t\n\r]/.test(s)) return false;

  // Solo permitir letras Unicode, dígitos y puntuación común en direcciones
  // (puntos, comas, guiones, barras, números ordinales, almohadilla, paréntesis, comillas, dos puntos)
  if (!/^[\p{L}\p{N}\s\.\,\-\/#º°ª'":\(\)]+$/u.test(s)) return false;

  // Debe contener al menos una letra (nombre de calle) y al menos un dígito (número de puerta)
  if (!/\p{L}/u.test(s) || !/\p{N}/u.test(s)) return false;

  // Debe contener al menos una palabra alfabética de 2 o más letras (p. ej. "Calle", "Av", "Main")
  if (!/\p{L}{2,}/u.test(s)) return false;

  // Buscar un token numérico válido que represente un número de puerta:
  //  - hasta 6 dígitos
  //  - opcional sufijo con letra Unicode o símbolo ordinal (º, °, ª)
  //  - opcional fracción tipo "-"/"/" seguida de 1-4 dígitos (p. ej. 45/2)
  const numberPattern = /(?:\b|#)(\d{1,6})(?:[-\/]\d{1,4})?(?:\s*(?:\p{L}|[º°ª]){0,3})?(?=\b|$)/u;
  if (!numberPattern.test(s)) return false;

  // Evitar secuencias de puntuación excesiva (p. ej. "...,", "///")
  if (/[.,\-\/]{3,}/.test(s)) return false;

  return true;
}
