function validate(input) {
  // Solo strings
  if (typeof input !== 'string') return false;
  let s = input.trim();
  if (s.length === 0) return false;

  // Quitar sufijos comunes de extensión (ej. "ext 123", "x123", "extension 123", "#123")
  // Se limita a patrones al final de la cadena.
  s = s.replace(/\s*(?:[,;]?\s*(?:ext(?:ension)?|ext\.|x|#)\s*\d+)\s*$/i, '').trim();

  // Rechazar si quedan letras (no permitimos nombres mezclados con números)
  // Esto evita aceptar entradas como "llamar a Juan" o textos que no sean números.
  if (/[A-Za-z\u00C0-\u024F]/.test(s)) return false;

  // Comprobar paréntesis balanceados (si hay uno de apertura debe haber cierre)
  const opens = (s.match(/\(/g) || []).length;
  const closes = (s.match(/\)/g) || []).length;
  if (opens !== closes) return false;

  // Normalizar prefijo internacional: aceptar "00" al inicio como equivalente a "+"
  if (s.startsWith('00')) {
    s = '+' + s.slice(2);
  }

  // No permitir más de un '+' y solo al principio
  const plusCount = (s.match(/\+/g) || []).length;
  if (plusCount > 1) return false;
  if (plusCount === 1 && !s.startsWith('+')) return false;

  // Sólo permitir caracteres comunes en números telefónicos:
  // dígitos, espacios, guiones, puntos y paréntesis, y un '+' inicial opcional.
  if (!/^\+?[0-9\s().-]+$/.test(s)) return false;

  // Extraer solo los dígitos para contar longitud
  const digits = s.replace(/\D/g, '');

  // Rango razonable de longitud:
  // - La recomendación E.164 limita a máximo 15 dígitos (código país + número)
  // - Muchos números locales tienen al menos 7 dígitos; usamos 7 como mínimo práctico.
  const minDigits = 7;
  const maxDigits = 15;
  if (digits.length < minDigits || digits.length > maxDigits) return false;

  // Si el número está en formato internacional (con '+'), el primer dígito del código de país no puede ser '0'
  if (s.startsWith('+') && digits[0] === '0') return false;

  // Todo pasó: número razonablemente válido
  return true;
}
