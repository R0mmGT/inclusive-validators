function validate(phone) {
  if (typeof phone !== 'string') return false;

  const trimmed = phone.trim();

  // Permite un '+' opcional al inicio, seguido de números y separadores comunes (espacios, guiones, puntos y paréntesis)
  const pattern = /^\+?[0-9\s().-]{7,25}$/;
  if (!pattern.test(trimmed)) {
    return false;
  }

  // Comprueba que los paréntesis estén balanceados si se usan
  const openParen = (trimmed.match(/\(/g) || []).length;
  const closeParen = (trimmed.match(/\)/g) || []).length;
  if (openParen !== closeParen || openParen > 1) {
    return false;
  }

  // De acuerdo con el estándar internacional E.164, debe contener entre 7 y 15 dígitos
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}
