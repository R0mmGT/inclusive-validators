function validate(phone) {
  if (typeof phone !== 'string') return false;

  const trimmed = phone.trim();
  if (!trimmed) return false;

  // Debe comenzar con '+' (código internacional), dígito o '('
  if (!/^[+\d(]/.test(trimmed)) return false;

  // Debe terminar con un dígito o ')'
  if (!/[\d)]$/.test(trimmed)) return false;

  // Solo permite dígitos, espacios, guiones, puntos, paréntesis y un único '+' al inicio
  if (!/^\+?[\d\s.\-()]+$/.test(trimmed)) return false;

  // Validación de paréntesis: máximo un par y correctamente balanceados
  const openCount = (trimmed.match(/\(/g) || []).length;
  const closeCount = (trimmed.match(/\)/g) || []).length;
  if (openCount !== closeCount || openCount > 1) return false;

  if (openCount === 1) {
    const openIdx = trimmed.indexOf('(');
    const closeIdx = trimmed.indexOf(')');
    if (closeIdx <= openIdx + 1) return false;
    const inside = trimmed.slice(openIdx + 1, closeIdx);
    if (!/^[\d\s]+$/.test(inside) || !/\d/.test(inside)) return false;
  }

  // Según la norma ITU-T E.164, un número telefónico tiene como máximo 15 dígitos
  // y como mínimo internacional viable entre 6 y 7 dígitos
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length < 6 || digits.length > 15) return false;

  return true;
}
