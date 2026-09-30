function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();

  // Permite opcionalmente un '+' al inicio, seguido solo de dígitos, espacios, guiones, puntos y paréntesis
  const allowedCharsRegex = /^\+?[0-9\s\-().]+$/;
  if (!allowedCharsRegex.test(trimmed)) {
    return false;
  }

  // Verifica que los paréntesis estén balanceados (máximo un par)
  const openParen = (trimmed.match(/\(/g) || []).length;
  const closeParen = (trimmed.match(/\)/g) || []).length;
  if (openParen !== closeParen || openParen > 1) {
    return false;
  }
  if (openParen === 1 && trimmed.indexOf('(') > trimmed.indexOf(')')) {
    return false;
  }

  // Según el estándar internacional E.164, un número telefónico tiene entre 6 y 15 dígitos
  const digitsOnly = trimmed.replace(/\D/g, '');
  if (digitsOnly.length < 6 || digitsOnly.length > 15) {
    return false;
  }

  return true;
}
