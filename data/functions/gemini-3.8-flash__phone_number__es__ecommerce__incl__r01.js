function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();

  // Debe comenzar con un '+' opcional, dígito o '(' y terminar en un dígito o ')'
  if (!/^\+?[0-9(].*[0-9)]$/.test(trimmed)) {
    return false;
  }

  // No permitir separadores repetidos (ej. '--', '..')
  if (/[-.]{2,}/.test(trimmed)) {
    return false;
  }

  // Permitir únicamente dígitos, espacios, puntos, guiones y paréntesis balanceados con dígitos
  if (!/^\+?(?:[0-9]|[-.\s]|\([0-9]+\))+$/.test(trimmed)) {
    return false;
  }

  // Permitir como máximo un bloque de paréntesis (común para códigos de área)
  const openParens = (trimmed.match(/\(/g) || []).length;
  const closeParens = (trimmed.match(/\)/g) || []).length;
  if (openParens > 1 || openParens !== closeParens) {
    return false;
  }

  // Validar longitud de dígitos según el estándar internacional ITU-T E.164 (entre 6 y 15 dígitos)
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 6 && digits.length <= 15;
}
