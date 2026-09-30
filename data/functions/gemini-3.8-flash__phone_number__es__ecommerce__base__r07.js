function validate(phone) {
  if (typeof phone !== 'string') return false;

  const trimmed = phone.trim();

  // Permite un prefijo '+' opcional seguido de dígitos y separadores comunes (espacios, guiones, puntos y paréntesis)
  const formatRegex = /^\+?[\d\s\-().]{7,25}$/;
  if (!formatRegex.test(trimmed)) return false;

  // Según el estándar E.164, un número de teléfono debe contener entre 7 y 15 dígitos
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) return false;

  // Valida que los paréntesis (si existen) estén balanceados y con formato lógico
  const openParens = (trimmed.match(/\(/g) || []).length;
  const closeParens = (trimmed.match(/\)/g) || []).length;
  if (openParens !== closeParens || openParens > 1) return false;
  if (openParens === 1 && trimmed.indexOf('(') > trimmed.indexOf(')')) return false;

  return true;
}
