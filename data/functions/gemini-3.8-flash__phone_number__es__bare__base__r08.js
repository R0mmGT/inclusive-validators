function validate(phone) {
  if (typeof phone !== 'string') return false;

  const cleaned = phone.trim();

  // Permite opcionalmente un '+' al inicio, seguido de dígitos, espacios, guiones, puntos o paréntesis
  if (!/^\+?[\d\s.\-()]{7,25}$/.test(cleaned)) {
    return false;
  }

  // Verifica que los paréntesis estén balanceados si existen
  const openParen = (cleaned.match(/\(/g) || []).length;
  const closeParen = (cleaned.match(/\)/g) || []).length;
  if (openParen !== closeParen || openParen > 1) {
    return false;
  }
  if (openParen === 1 && !/\(\d+\)/.test(cleaned)) {
    return false;
  }

  // Comprueba que la cantidad total de dígitos cumpla con el estándar internacional (entre 7 y 15)
  const digits = cleaned.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}
