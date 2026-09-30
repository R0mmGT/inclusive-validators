function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();
  if (!trimmed) {
    return false;
  }

  // Permite dígitos y separadores comunes a nivel global (espacios, guiones, puntos, barras y paréntesis),
  // con un posible '+' solo al inicio para prefijos internacionales.
  const validCharsRegex = /^\+?[0-9\s()./-]+$/;
  if (!validCharsRegex.test(trimmed)) {
    return false;
  }

  // El símbolo '+' no debe repetirse ni aparecer fuera de la primera posición
  if (trimmed.indexOf('+') > 0 || (trimmed.match(/\+/g) || []).length > 1) {
    return false;
  }

  // Validación básica de coherencia para los paréntesis
  const openParens = (trimmed.match(/\(/g) || []).length;
  const closeParens = (trimmed.match(/\)/g) || []).length;
  if (openParens !== closeParens || openParens > 1) {
    return false;
  }
  if (openParens === 1 && trimmed.indexOf('(') >= trimmed.indexOf(')')) {
    return false;
  }

  // Extraer únicamente los dígitos para evaluar la longitud según el estándar ITU-T E.164
  const digits = trimmed.replace(/\D/g, '');

  // La norma internacional E.164 establece un máximo de 15 dígitos.
  // La longitud mínima para números telefónicos asignables suele ser de al menos 6 dígitos.
  return digits.length >= 6 && digits.length <= 15;
}
