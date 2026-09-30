function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();

  // Permitir únicamente caracteres válidos de marcación:
  // '+' opcional al inicio, dígitos, espacios, guiones, puntos y paréntesis.
  if (!/^\+?[0-9\s.\-()]+$/.test(trimmed)) {
    return false;
  }

  // Validar consistencia de paréntesis: máximo un par y debidamente balanceado
  const openParens = (trimmed.match(/\(/g) || []).length;
  const closeParens = (trimmed.match(/\)/g) || []).length;

  if (openParens !== closeParens || openParens > 1) {
    return false;
  }

  if (openParens === 1) {
    const parenContent = trimmed.match(/\((.*?)\)/);
    // El interior de los paréntesis debe contener dígitos (código de área / ciudad)
    if (!parenContent || !/^\d+$/.test(parenContent[1].trim())) {
      return false;
    }
  }

  // Extraer exclusivamente los dígitos
  const digits = trimmed.replace(/\D/g, '');

  // Conforme a la norma internacional ITU-T E.164, un número telefónico
  // tiene un máximo de 15 dígitos (o hasta 17 si incluye prefijo de salida '00').
  // Las extensiones nacionales más cortas rondan entre 6 y 7 dígitos.
  const minDigits = 6;
  const maxDigits = trimmed.startsWith('00') ? 17 : 15;

  return digits.length >= minDigits && digits.length <= maxDigits;
}
