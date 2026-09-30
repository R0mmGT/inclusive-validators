function validate(addressLine) {
  // Verificar que el argumento sea un string
  if (typeof addressLine !== 'string') {
    return false;
  }

  // Eliminar espacios al principio y al final
  const trimmedAddress = addressLine.trim();
  
  // La dirección no debe estar vacía después de trim
  if (trimmedAddress.length === 0) {
    return false;
  }

  // Longitud mínima y máxima razonable para una dirección
  if (trimmedAddress.length < 2 || trimmedAddress.length > 200) {
    return false;
  }

  // Verificar caracteres básicos permitidos
  // Permitir letras (incluyendo acentos y caracteres especiales de diferentes idiomas),
  // números, espacios, y algunos símbolos comunes en direcciones
  const basicValidChars = /^[\p{L}\p{N}\s\-\/\\.,#'"°ªº@&()\[\]\+]+$/u;
  if (!basicValidChars.test(trimmedAddress)) {
    return false;
  }

  // Debe contener al menos un carácter alfabético (letra de cualquier idioma)
  const hasAlphabeticChar = /[\p{L}]/u.test(trimmedAddress);
  if (!hasAlphabeticChar) {
    return false;
  }

  // No debe consistir solo en números
  const onlyNumbers = /^\p{N}+$/u.test(trimmedAddress.replace(/\s/g, ''));
  if (onlyNumbers) {
    return false;
  }

  // No debe contener solo símbolos o espacios
  const onlySymbolsOrSpaces = /^[\s\-\/\\.,#'"°ªº@&()\[\]\+]+$/u.test(trimmedAddress);
  if (onlySymbolsOrSpaces) {
    return false;
  }

  // Validar estructura básica
  // Debe tener al menos un número si parece ser una dirección con número
  // (pero no requerirlo estrictamente para casos como "Apartado Postal")
  const hasNumber = /\p{N}/u.test(trimmedAddress);
  const commonAddressKeywords = /\b(calle|avenida|av|road|rd|street|st|straße|str|rue|via|plaza|pl|square|sq|boulevard|blvd|lane|ln|drive|dr|way|apartado|apartment|apt|p\.o\. box|post office box|box|house|building|edificio|no|number|№|#)\b/iu;
  
  // Si contiene palabras comunes de dirección, aplicar validación más estricta
  if (commonAddressKeywords.test(trimmedAddress.toLowerCase())) {
    // Debe tener un formato más estructurado
    const lines = trimmedAddress.split(/\s+/);
    if (lines.length < 2) {
      return false;
    }
  }

  // No debe contener patrones claramente inválidos
  const invalidPatterns = [
    /test\b/i, // Palabra "test"
    /asdf/i,   // Patrón de teclado
    /qwerty/i, // Patrón de teclado
    /123456/,  // Secuencia simple de números
    /xxxx/i,   // Patrón de relleno
    /aaaa/i,   // Patrón de relleno
    /\.{4,}/,  // Múltiples puntos consecutivos
    /-{4,}/,   // Múltiples guiones consecutivos
    /\s{4,}/   // Múltiples espacios consecutivos
  ];

  for (const pattern of invalidPatterns) {
    if (pattern.test(trimmedAddress)) {
      return false;
    }
  }

  // Verificar que no sea una secuencia repetitiva
  const normalizedForRepeatCheck = trimmedAddress.toLowerCase().replace(/\s+/g, '');
  if (normalizedForRepeatCheck.length > 3) {
    const firstThree = normalizedForRepeatCheck.substring(0, 3);
    if (normalizedForRepeatCheck === firstThree.repeat(Math.ceil(normalizedForRepeatCheck.length / 3)).substring(0, normalizedForRepeatCheck.length)) {
      return false;
    }
  }

  return true;
}
