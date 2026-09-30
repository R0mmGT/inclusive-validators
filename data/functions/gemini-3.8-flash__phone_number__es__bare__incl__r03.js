function validate(str) {
  if (typeof str !== 'string') return false;

  const trimmed = str.trim();
  if (!trimmed) return false;

  // Solo permite dígitos, espacios, guiones, puntos, barras, paréntesis y '+' al inicio
  if (!/^\+?[0-9\s.\-()/]+$/.test(trimmed)) {
    return false;
  }

  // Debe terminar con un dígito o un paréntesis de cierre
  if (!/[\d)]$/.test(trimmed)) {
    return false;
  }

  // No permite símbolos de separación repetidos de forma consecutiva
  if (/[-./]{2,}/.test(trimmed)) {
    return false;
  }

  // Validación de balanceo y contenido de paréntesis (máximo un par)
  const openCount = (trimmed.match(/\(/g) || []).length;
  const closeCount = (trimmed.match(/\)/g) || []).length;

  if (openCount !== closeCount || openCount > 1) {
    return false;
  }

  if (openCount === 1) {
    const openIdx = trimmed.indexOf('(');
    const closeIdx = trimmed.indexOf(')');
    if (openIdx >= closeIdx) return false;

    const inside = trimmed.slice(openIdx + 1, closeIdx);
    if (!/^\s*\d+[\d\s]*$/.test(inside)) {
      return false;
    }
  }

  // Según el estándar internacional ITU-T E.164, un número tiene entre 6 y 15 dígitos
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 6 && digits.length <= 15;
}
