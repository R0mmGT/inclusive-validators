function validate(input) {
  // Debe ser string
  if (typeof input !== 'string') return false;
  const s = input.trim();
  if (s.length === 0) return false;

  // Solo caracteres permitidos: dígitos, espacio, guion, punto, paréntesis y + (solo al inicio)
  if (!/^[0-9\s\-+().]+$/.test(s)) return false;

  // '+' solo puede aparecer una vez y, si existe, debe ser el primer carácter
  const plusCount = (s.match(/\+/g) || []).length;
  if (plusCount > 1) return false;
  if (plusCount === 1 && s[0] !== '+') return false;

  // Paréntesis balanceados y como máximo un par
  const opens = (s.match(/\(/g) || []).length;
  const closes = (s.match(/\)/g) || []).length;
  if (opens !== closes) return false;
  if (opens > 1) return false;
  if (opens === 1) {
    const openPos = s.indexOf('(');
    const closePos = s.indexOf(')');
    if (openPos > closePos) return false;
    const inside = s.slice(openPos + 1, closePos);
    // Dentro de los paréntesis solo permitimos hasta 6 caracteres entre dígitos y separadores comunes
    if (!/^[0-9\s\-\.]{1,6}$/.test(inside)) return false;
  }

  // Extraer solo dígitos y comprobar longitud razonable (mín 7, máx 15 según E.164)
  const digits = s.replace(/[^\d]/g, '');
  if (digits.length < 7 || digits.length > 15) return false;

  return true;
}
