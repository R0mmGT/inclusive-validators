function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();
  if (!trimmed) {
    return false;
  }

  // Permite únicamente dígitos, espacios, guiones, puntos, paréntesis y un '+' inicial opcional
  if (!/^\+?[\d\s().-]+$/.test(trimmed)) {
    return false;
  }

  // Si contiene '+', debe ser única y exclusivamente el primer carácter
  if (trimmed.includes('+') && !trimmed.startsWith('+')) {
    return false;
  }
  if ((trimmed.match(/\+/g) || []).length > 1) {
    return false;
  }

  // Verificación de paréntesis: como máximo un par bien balanceado con dígitos dentro
  const openCount = (trimmed.match(/\(/g) || []).length;
  const closeCount = (trimmed.match(/\)/g) || []).length;

  if (openCount !== closeCount || openCount > 1) {
    return false;
  }

  if (openCount === 1 && !/\(\d{1,6}\)/.test(trimmed)) {
    return false;
  }

  // No permitir separadores repetidos consecutivamente
  if (/[-.]{2,}/.test(trimmed)) {
    return false;
  }

  // Debe comenzar con un dígito, '+' o '(' y terminar con un dígito o ')'
  if (/^[^\d+(]|[^\d)]$/.test(trimmed)) {
    return false;
  }

  // Según el estándar ITU-T E.164, un número de teléfono válido contiene entre 5 y 15 dígitos
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 5 && digits.length <= 15;
}
