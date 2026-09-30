function validate(phone) {
  // Debe ser una cadena
  if (typeof phone !== 'string') return false;
  let s = phone.trim();
  if (s.length === 0) return false;

  // Extraer y quitar posible extensión al final (ext, x, #, extension, etc.)
  const extRegex = /\s*(?:ext(?:ension)?|ext\.|x|xt|#)\s*[:\.\-]?\s*\d+\s*$/i;
  if (extRegex.test(s)) {
    s = s.replace(extRegex, '').trim();
    if (s.length === 0) return false;
  }

  // Paréntesis balanceados y no anidados
  const opens = (s.match(/\(/g) || []).length;
  const closes = (s.match(/\)/g) || []).length;
  if (opens !== closes) return false;
  if (opens > 0) {
    // comprobar anidamiento: no puede haber '(' antes de cerrar la anterior
    let depth = 0;
    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (ch === '(') {
        depth++;
        if (depth > 1) return false; // anidado
      } else if (ch === ')') {
        depth--;
        if (depth < 0) return false;
      }
    }
    if (s.includes('()')) return false; // paréntesis vacíos no razonables
  }

  // Solo caracteres permitidos antes de normalizar:
  // dígitos, espacios, + (solo al inicio), paréntesis, guiones, puntos y barras
  if (!/^[\d\s+\-().\/]+$/.test(s)) return false;

  // '+' solo puede aparecer una vez y solo al inicio
  const plusCount = (s.match(/\+/g) || []).length;
  if (plusCount > 1) return false;
  if (plusCount === 1 && s[0] !== '+') return false;

  // Convertir prefijo internacional 00 a + (muchos usuarios lo usan)
  if (s.startsWith('00')) s = '+' + s.slice(2);

  // Normalizar: quitar todos los caracteres que no sean dígitos,
  // manteniendo un posible '+' inicial
  let normalized = s.startsWith('+')
    ? '+' + s.slice(1).replace(/\D/g, '')
    : s.replace(/\D/g, '');

  const digits = normalized.replace(/\D/g, '');

  // Validación de longitud de dígitos:
  // Usamos el rango 4..15 para cubrir números cortos legítimos y el máximo E.164 (15)
  if (digits.length < 4 || digits.length > 15) return false;

  // Si hay '+' (formato internacional E.164), el código de país no puede empezar por 0
  if (normalized.startsWith('+') && digits[0] === '0') return false;

  // Rechazar cadenas que sean secuencias triviales muy cortas de un único dígito repetido
  // (ej. "1111111") — esto es opcional pero ayuda a filtrar entradas obviamente inválidas.
  if (/^(\d)\1{3,}$/.test(digits)) return false;

  // Si pasa todas las comprobaciones, aceptamos el número
  return true;
}
