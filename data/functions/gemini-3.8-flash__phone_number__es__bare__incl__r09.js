function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();
  if (!trimmed) {
    return false;
  }

  // Permitir caracteres comunes en formatos telefónicos internacionales:
  // Dígitos, espacios, guiones, puntos, paréntesis y un único signo '+' opcional al inicio.
  const phonePattern = /^\+?[0-9\s.\-()]+$/;
  if (!phonePattern.test(trimmed)) {
    return false;
  }

  // Debe terminar con un dígito o con paréntesis de cierre
  if (!/[0-9)]$/.test(trimmed)) {
    return false;
  }

  // Validar balance y orden de paréntesis (máximo un grupo usual para prefijos/códigos de área)
  const openParens = (trimmed.match(/\(/g) || []).length;
  const closeParens = (trimmed.match(/\)/g) || []).length;
  if (openParens !== closeParens || openParens > 1) {
    return false;
  }
  if (openParens === 1 && trimmed.indexOf('(') > trimmed.indexOf(')')) {
    return false;
  }

  // Evitar repetición anómala de separadores
  if (/[-. ]{2,}/.test(trimmed)) {
    return false;
  }

  // Extraer únicamente los dígitos para validar según la norma ITU-T E.164
  const digits = trimmed.replace(/\D/g, '');

  // Si incluye prefijo internacional de salida '00', se descuenta para el cómputo del número
  const effectiveDigits = trimmed.startsWith('00') ? digits.slice(2) : digits;

  // E.164 establece un máximo de 15 dígitos. La longitud mínima para números nacionales/internacionales válidos es de 6 dígitos.
  return effectiveDigits.length >= 6 && effectiveDigits.length <= 15;
}
