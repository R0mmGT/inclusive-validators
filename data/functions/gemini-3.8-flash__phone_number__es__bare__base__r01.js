function validate(phone) {
  if (typeof phone !== 'string') return false;

  const trimmed = phone.trim();

  // Debe iniciar con '+', '(' o dígito, y finalizar con dígito o ')'
  if (!/^(\+|\(|\d)[\d\s().-]*(\d|\))$/.test(trimmed)) {
    return false;
  }

  // No permitir '+' fuera de la primera posición ni separadores repetidos
  if (/\+/.test(trimmed.slice(1)) || /[-.]{2,}/.test(trimmed)) {
    return false;
  }

  // Validar paréntesis: máximo un par, correctamente cerrado y conteniendo dígitos
  const openParen = (trimmed.match(/\(/g) || []).length;
  const closeParen = (trimmed.match(/\)/g) || []).length;
  if (openParen !== closeParen || openParen > 1) return false;
  if (openParen === 1 && !/\(\d{1,6}\)/.test(trimmed)) return false;

  // Validar cantidad de dígitos según el estándar internacional E.164 (7 a 15 dígitos)
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}
