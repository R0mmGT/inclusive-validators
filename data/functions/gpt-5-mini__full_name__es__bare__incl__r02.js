function validate(name) {
  // Acepta strings solamente
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0) return false;
  // Limitar longitud razonable (evita abusos; puede ajustarse)
  if (s.length > 200) return false;
  // Debe contener al menos una letra Unicode
  if (!/\p{L}/u.test(s)) return false;

  // Definiciones para construir expresiones regulares Unicode-aware
  const letters = "\\p{L}\\p{M}";                 // letras + marcas combinantes
  const seg = `[${letters}]+`;                   // segmento de una o más letras
  const segWithOptionalDot = `${seg}\\.?`;       // segmento que puede terminar en punto (inicial)
  const internalSep = `['\u2019\\-\\u00B7]`;     // separadores internos permitidos: '  ’  -  ·

  // Pattern A: palabras formadas por segmentos (letras) que pueden unirse con -, ', ·
  // - no permite dos separadores internos consecutivos
  const patternA = new RegExp(
    `^(?!.*${internalSep}{2})(?:${segWithOptionalDot})(?:${internalSep}${segWithOptionalDot})*$`,
    'u'
  );

  // Pattern B: secuencias de iniciales con punto sin otros separadores, p.ej. "J.R.R."
  const patternB = new RegExp(`^(?:[${letters}]\\.)+$`, 'u');

  // Separar por cualquier cantidad de espacio Unicode (espacios entre nombres)
  const tokens = s.split(/\s+/u);

  // Validaciones por token
  for (const token of tokens) {
    // No token vacío (por seguridad)
    if (!token) return false;
    // Longitud por token razonable
    if (token.length > 100) return false;
    // Cada token debe coincidir con patternA (palabra normal) o patternB (iniciales)
    if (!(patternA.test(token) || patternB.test(token))) return false;
  }

  // Todo ok
  return true;
}
