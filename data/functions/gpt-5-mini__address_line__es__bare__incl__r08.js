function validate(address) {
  // Debe ser string
  if (typeof address !== 'string') return false;

  // Una sola línea: sin saltos de línea. Recortado de ambos lados.
  const s = address.trim();
  if (s.length === 0) return false;
  if (/\r|\n/.test(s)) return false;

  // Longitud razonable para una línea de dirección (evita entradas vacías o absurdamente largas).
  // Se escoge 3..256 como rango amplio y compatible internacionalmente.
  if (s.length < 3 || s.length > 256) return false;

  // Permitimos cualquier letra de cualquier alfabeto (\p{L}), marcas diacríticas (\p{M}),
  // números (\p{N}), puntuación (\p{P}), símbolos (\p{S}) y espacios.
  // Rechazamos caracteres de control o invisibles (\p{C}) y otros no esperados.
  // Requiere soporte de "Unicode property escapes" (Node 10+/modern browsers).
  const allowedRe = /^[\p{L}\p{M}\p{N}\p{P}\p{S}\s]+$/u;
  if (!allowedRe.test(s)) return false;

  // Debe contener al menos una letra o un número (evita strings formadas solo por signos de puntuación o símbolos).
  const hasLetterOrNumber = /[\p{L}\p{N}]/u.test(s);
  if (!hasLetterOrNumber) return false;

  // Evita entradas claramente no-dirección como secuencias largas de un mismo caracter no alfanumérico.
  // Por ejemplo "-----" o "//////" o "......" no se consideran direcciones válidas.
  if (/([^\p{L}\p{N}\s])\1{4,}/u.test(s)) return false; // 5+ repeticiones del mismo no-alfanumérico

  // Evita rellenos obvios como "-----  -----" (muchos guiones/asteriscos separadores).
  // Si hay más de 50% de caracteres que no son letra/número, lo consideramos sospechoso.
  const nonAlphaNumCount = (s.match(/[^\p{L}\p{N}]/gu) || []).length;
  if (nonAlphaNumCount / s.length > 0.6) return false;

  // Pasadas las comprobaciones generales, aceptamos la línea como válida.
  return true;
}
