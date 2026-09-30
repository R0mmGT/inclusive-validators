function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();

  // Permite un prefijo '+' opcional, dígitos y separadores comunes (espacios, guiones, puntos y paréntesis)
  const phoneRegex = /^\+?(?:[0-9][-.\s()]*){6,14}[0-9]$/;
  if (!phoneRegex.test(trimmed)) {
    return false;
  }

  // Verifica que los paréntesis estén correctamente balanceados si existen
  const openParen = (trimmed.match(/\(/g) || []).length;
  const closeParen = (trimmed.match(/\)/g) || []).length;
  if (openParen !== closeParen || openParen > 1) {
    return false;
  }

  if (openParen === 1 && trimmed.indexOf('(') >= trimmed.indexOf(')')) {
    return false;
  }

  // Valida que la cantidad total de dígitos cumpla con el estándar internacional E.164 (7 a 15 dígitos)
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}
