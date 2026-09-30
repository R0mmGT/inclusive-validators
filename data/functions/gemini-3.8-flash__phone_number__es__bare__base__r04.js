function validate(phone) {
  if (typeof phone !== 'string') return false;

  const trimmed = phone.trim();

  // Debe contener solo caracteres permitidos y terminar con un dígito
  if (!/^\+?[\d\s\-().]+$/.test(trimmed) || !/\d$/.test(trimmed)) {
    return false;
  }

  // No permitir separadores consecutivos (ej. --, .., etc.)
  if (/[\s\-.]{2,}/.test(trimmed)) {
    return false;
  }

  // Validar uso de paréntesis: máximo un par bien estructurado
  const openCount = (trimmed.match(/\(/g) || []).length;
  const closeCount = (trimmed.match(/\)/g) || []).length;
  if (openCount !== closeCount || openCount > 1) {
    return false;
  }
  if (openCount === 1 && !/\(\d{1,4}\)/.test(trimmed)) {
    return false;
  }

  // Estándar internacional E.164: entre 7 y 15 dígitos
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}
