function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();
  if (!trimmed) {
    return false;
  }

  // Permitir solo dígitos y separadores comunes (+, espacios, guiones, puntos, barras, paréntesis)
  if (!/^\+?[0-9\s\-./()]+$/.test(trimmed)) {
    return false;
  }

  // Si incluye '+', debe ser únicamente el primer carácter
  const plusCount = (trimmed.match(/\+/g) || []).length;
  if (plusCount > 1 || (plusCount === 1 && !trimmed.startsWith('+'))) {
    return false;
  }

  // Validar balance y uso de paréntesis (máximo un par y en orden correcto)
  const openParens = (trimmed.match(/\(/g) || []).length;
  const closeParens = (trimmed.match(/\)/g) || []).length;
  if (openParens !== closeParens || openParens > 1) {
    return false;
  }
  if (openParens === 1 && trimmed.indexOf('(') >= trimmed.indexOf(')')) {
    return false;
  }

  // Conteo de dígitos según el estándar internacional E.164 (mínimo 6, máximo 15 dígitos)
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length < 6 || digits.length > 15) {
    return false;
  }

  return true;
}
