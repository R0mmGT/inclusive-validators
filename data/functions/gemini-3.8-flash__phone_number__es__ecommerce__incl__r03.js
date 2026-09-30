function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();

  // Permite opcionalmente un '+' inicial, seguido de dígitos, espacios, guiones, puntos y paréntesis
  if (!/^\+?[0-9\s.\-()]+$/.test(trimmed)) {
    return false;
  }

  // Validar balance y formato de paréntesis (máximo un par, correctamente cerrado y con dígitos dentro)
  const openParens = (trimmed.match(/\(/g) || []).length;
  const closeParens = (trimmed.match(/\)/g) || []).length;
  if (openParens !== closeParens || openParens > 1) {
    return false;
  }
  if (openParens === 1) {
    const openIdx = trimmed.indexOf('(');
    const closeIdx = trimmed.indexOf(')');
    if (openIdx > closeIdx || !/\d/.test(trimmed.slice(openIdx, closeIdx))) {
      return false;
    }
  }

  // Extraer solo los dígitos
  let digits = trimmed.replace(/\D/g, '');

  // Si no usa '+', puede haber usado el prefijo internacional '00'
  if (!trimmed.startsWith('+') && digits.startsWith('00')) {
    digits = digits.slice(2);
  }

  // Según el estándar internacional E.164, un número telefónico tiene entre 6 y 15 dígitos
  return digits.length >= 6 && digits.length <= 15;
}
