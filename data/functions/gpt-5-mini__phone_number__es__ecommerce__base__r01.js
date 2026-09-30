// Valida números de teléfono comunes para formularios.
// Acepta dígitos, espacios, guiones, puntos, paréntesis y un posible + al inicio.
// Reglas principales:
// - Solo caracteres permitidos: 0-9, espacio, '-', '.', '(', ')', y '+'.
// - '+' opcional como máximo una vez y solo al principio.
// - Paréntesis opcionales: como máximo un par, deben estar balanceados y contener solo 1-5 dígitos (código de área).
// - Después de quitar separadores quedan entre 7 y 15 dígitos (conforme a ITU E.164 como tope).
function validate(input) {
  if (typeof input !== 'string') return false;
  const s = input.trim();
  if (s.length === 0) return false;

  // Caracteres permitidos
  if (!/^[+\d\-\.\s()]+$/.test(s)) return false;

  // '+' solo al inicio y como máximo uno
  const plusMatches = (s.match(/\+/g) || []).length;
  if (plusMatches > 1) return false;
  if (plusMatches === 1 && s[0] !== '+') return false;

  // Paréntesis: balanceados y como máximo un par
  const openCount = (s.match(/\(/g) || []).length;
  const closeCount = (s.match(/\)/g) || []).length;
  if (openCount !== closeCount) return false;
  if (openCount > 1) return false;
  if (openCount === 1) {
    const start = s.indexOf('(');
    const end = s.indexOf(')');
    if (start > end) return false;
    const inside = s.slice(start + 1, end);
    // Dentro de paréntesis solo dígitos y entre 1 y 5 caracteres
    if (!/^\d{1,5}$/.test(inside)) return false;
  }

  // Contar solo los dígitos
  const digits = s.replace(/[+\s\-\.\(\)]/g, '');
  if (!/^\d+$/.test(digits)) return false;

  // Longitud razonable: mínimo 7, máximo 15 (E.164)
  if (digits.length < 7 || digits.length > 15) return false;

  return true;
}
