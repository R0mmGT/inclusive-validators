function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();
  if (!trimmed) {
    return false;
  }

  // Permite un '+' opcional al inicio y luego solo dígitos, espacios, guiones, puntos y paréntesis
  const phonePattern = /^\+?[\d\s\-().]+$/;
  if (!phonePattern.test(trimmed)) {
    return false;
  }

  // Validar balance y uso correcto de paréntesis (máximo un par y bien ordenado)
  const openParens = (trimmed.match(/\(/g) || []).length;
  const closeParens = (trimmed.match(/\)/g) || []).length;
  if (openParens !== closeParens || openParens > 1) {
    return false;
  }
  if (openParens === 1 && trimmed.indexOf('(') >= trimmed.indexOf(')')) {
    return false;
  }

  // Extraer únicamente los dígitos
  let digits = trimmed.replace(/\D/g, '');

  // Si usa el prefijo internacional de salida '00', se descarta para evaluar longitud E.164
  if (trimmed.startsWith('00')) {
    digits = digits.slice(2);
  }

  // La norma internacional ITU-T E.164 establece un máximo de 15 dígitos.
  // La longitud mínima común a nivel global para números nacionales válidos es de 6 a 7 dígitos.
  return digits.length >= 6 && digits.length <= 15;
}
