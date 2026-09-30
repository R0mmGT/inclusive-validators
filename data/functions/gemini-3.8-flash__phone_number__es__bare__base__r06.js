function validate(str) {
  if (typeof str !== 'string') return false;

  const trimmed = str.trim();

  // Debe comenzar con '+' opcional seguido de dígito o '(', y terminar con un dígito
  const generalFormat = /^\+?(?:[0-9]|\([0-9]+\))[\d\s\-().]*[0-9]$/;
  if (!generalFormat.test(trimmed)) return false;

  // Paréntesis balanceados: máximo un par bien formado
  const openCount = (trimmed.match(/\(/g) || []).length;
  const closeCount = (trimmed.match(/\)/g) || []).length;
  if (openCount !== closeCount || openCount > 1) return false;
  if (openCount === 1 && !/\(\d{1,6}\)/.test(trimmed)) return false;

  // No permitir símbolos separadores consecutivos
  if (/[-.]{2,}/.test(trimmed)) return false;

  // Longitud de dígitos según estándar internacional E.164 (entre 7 y 15 dígitos)
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}
