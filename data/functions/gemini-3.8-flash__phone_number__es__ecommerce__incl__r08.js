function validate(phone) {
  if (typeof phone !== 'string') return false;

  const trimmed = phone.trim();

  // Permite un '+' opcional al inicio, seguido de dígitos y separadores comunes (espacio, guión, punto, paréntesis)
  // Debe terminar en un dígito o en un paréntesis de cierre
  if (!/^\+?[0-9(\s][0-9\s().-]*[0-9)]$/.test(trimmed)) {
    return false;
  }

  // Verifica que el '+' solo aparezca al principio
  if (trimmed.includes('+') && trimmed.indexOf('+') !== 0) {
    return false;
  }

  // Validación de coherencia en los paréntesis
  const openCount = (trimmed.match(/\(/g) || []).length;
  const closeCount = (trimmed.match(/\)/g) || []).length;
  if (openCount !== closeCount || openCount > 1) {
    return false;
  }
  if (openCount === 1) {
    const openIndex = trimmed.indexOf('(');
    const closeIndex = trimmed.indexOf(')');
    // El '(' debe ir antes de ')' y debe contener al menos un dígito en su interior
    if (openIndex >= closeIndex || !/\d/.test(trimmed.slice(openIndex + 1, closeIndex))) {
      return false;
    }
  }

  // Según el estándar internacional UIT-T E.164, un número telefónico
  // tiene un máximo de 15 dígitos. Se establece un mínimo de 6 dígitos para números válidos.
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length < 6 || digits.length > 15) {
    return false;
  }

  return true;
}
