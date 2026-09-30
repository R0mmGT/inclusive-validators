function validate(phone) {
  if (typeof phone !== 'string') return false;

  const trimmed = phone.trim();
  if (!trimmed) return false;

  // Solo se permiten números, espacios, guiones, puntos, paréntesis y un '+' inicial opcional
  if (!/^\+?[0-9\s\-().]{6,25}$/.test(trimmed)) {
    return false;
  }

  // El símbolo '+' solo es válido si se encuentra al principio
  if (trimmed.lastIndexOf('+') > 0) {
    return false;
  }

  // Validación de paréntesis: máximo un par bien balanceado con dígitos dentro
  const openCount = (trimmed.match(/\(/g) || []).length;
  const closeCount = (trimmed.match(/\)/g) || []).length;

  if (openCount !== closeCount || openCount > 1) {
    return false;
  }

  if (openCount === 1) {
    const openIdx = trimmed.indexOf('(');
    const closeIdx = trimmed.indexOf(')');
    if (openIdx > closeIdx || !/\(\d{1,6}\)/.test(trimmed)) {
      return false;
    }
  }

  // No permitir separadores consecutivos incorrectos
  if (/[-.]{2,}/.test(trimmed)) {
    return false;
  }

  // Debe terminar con un dígito o un paréntesis de cierre
  if (!/[\d)]$/.test(trimmed)) {
    return false;
  }

  // Estándar internacional E.164: entre 6 y 15 dígitos numéricos
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length < 6 || digits.length > 15) {
    return false;
  }

  return true;
}
