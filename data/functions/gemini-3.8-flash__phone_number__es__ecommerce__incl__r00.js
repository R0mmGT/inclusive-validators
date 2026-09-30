function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();

  // Verifica que solo contenga caracteres válidos y termine en un dígito
  if (!/^\+?[0-9\s.\-()]+$/.test(trimmed) || !/\d$/.test(trimmed)) {
    return false;
  }

  // Validación de paréntesis: máximo un par y correctamente ordenados
  const openCount = (trimmed.match(/\(/g) || []).length;
  const closeCount = (trimmed.match(/\)/g) || []).length;

  if (openCount !== closeCount || openCount > 1) {
    return false;
  }

  if (openCount === 1) {
    const openIndex = trimmed.indexOf('(');
    const closeIndex = trimmed.indexOf(')');
    
    // Paréntesis en orden incorrecto o vacíos
    if (openIndex > closeIndex || closeIndex - openIndex <= 1) {
      return false;
    }
  }

  // Evita secuencias anómalas de separadores
  if (/[\s.\-]{3,}/.test(trimmed)) {
    return false;
  }

  // Extraer únicamente los dígitos
  const digits = trimmed.replace(/\D/g, '');

  // Estándar internacional ITU-T E.164: entre 7 y 15 dígitos.
  // Se permiten hasta 17 dígitos si se incluye el prefijo de salida internacional (ej. "00").
  const minDigits = 7;
  const maxDigits = trimmed.startsWith('+') ? 15 : 17;

  return digits.length >= minDigits && digits.length <= maxDigits;
}
