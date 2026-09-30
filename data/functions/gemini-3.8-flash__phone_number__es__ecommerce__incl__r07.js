function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();

  // Solo permite dígitos, espacios, guiones, puntos, paréntesis y un único '+' al inicio
  const validCharactersRegex = /^\+?[0-9\s.\-()]+$/;
  if (!validCharactersRegex.test(trimmed)) {
    return false;
  }

  // Verifica que los paréntesis estén correctamente balanceados y ordenados (si existen)
  const openParens = (trimmed.match(/\(/g) || []).length;
  const closeParens = (trimmed.match(/\)/g) || []).length;
  if (openParens !== closeParens || openParens > 1) {
    return false;
  }
  if (openParens === 1 && trimmed.indexOf('(') > trimmed.indexOf(')')) {
    return false;
  }

  // Extrae únicamente los dígitos
  const digits = trimmed.replace(/\D/g, '');

  // Según el estándar internacional UIT-T E.164, un número de teléfono tiene entre 6 y 15 dígitos
  return digits.length >= 6 && digits.length <= 15;
}
