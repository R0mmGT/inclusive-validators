function validate(phone) {
  if (typeof phone !== 'string') return false;

  const trimmed = phone.trim();
  if (!trimmed) return false;

  // Permite opcionalmente un '+' al inicio, seguido solo de dígitos, espacios, guiones, puntos y paréntesis
  if (!/^\+?[\d\s().-]+$/.test(trimmed)) return false;

  // Validación de coherencia en los paréntesis: máximo un par y debidamente cerrado
  const openParen = (trimmed.match(/\(/g) || []).length;
  const closeParen = (trimmed.match(/\)/g) || []).length;
  if (openParen !== closeParen || openParen > 1) return false;
  if (openParen === 1) {
    const openIdx = trimmed.indexOf('(');
    const closeIdx = trimmed.indexOf(')');
    if (openIdx > closeIdx) return false;
    // Debe haber al menos un dígito dentro del paréntesis
    if (!/\d/.test(trimmed.slice(openIdx + 1, closeIdx))) return false;
  }

  // Extraer los dígitos puros
  const digits = trimmed.replace(/\D/g, '');

  // Según el estándar internacional E.164, un número de teléfono tiene entre 6 y 15 dígitos
  return digits.length >= 6 && digits.length <= 15;
}
