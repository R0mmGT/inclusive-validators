const validate = (postalCode) => {
  // Validaciones básicas
  if (typeof postalCode !== 'string') return false;
  
  const trimmedCode = postalCode.trim();
  if (trimmedCode.length === 0) return false;
  
  // Patrones por país (códigos ISO 3166-1 alpha-2)
  const postalCodePatterns = {
    // Estados Unidos: 5 dígitos o 5+4
    'US': /^\d{5}(-\d{4})?$/,
    
    // Canadá: A1A 1A1 (alterna letras y números)
    'CA': /^[A-Z]\d[A-Z] \d[A-Z]\d$/i,
    
    // Reino Unido: múltiples formatos complejos
    'GB': /^(GIR 0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|[A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))|[0-9][A-HJKS-UW])\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i,
    
    // Australia: 4 dígitos
    'AU': /^\d{4}$/,
    
    // Alemania: 5 dígitos
    'DE': /^\d{5}$/,
    
    // Francia: 5 dígitos
    'FR': /^\d{5}$/,
    
    // España: 5 dígitos
    'ES': /^\d{5}$/,
    
    // Italia: 5 dígitos
    'IT': /^\d{5}$/,
    
    // Países Bajos: 4 dígitos + 2 letras (1234 AB)
    'NL': /^\d{4}\s?[A-Z]{2}$/i,
    
    // Brasil: 5 dígitos + guión + 3 dígitos
    'BR': /^\d{5}-\d{3}$/,
    
    // Argentina: 4 dígitos (algunos con letra opcional)
    'AR': /^[A-Z]?\d{4}[A-Z]?$/i,
    
    // México: 5 dígitos
    'MX': /^\d{5}$/,
    
    // Japón: 3 dígitos + guión + 4 dígitos
    'JP': /^\d{3}-\d{4}$/,
    
    // India: 6 dígitos
    'IN': /^\d{6}$/,
    
    // China: 6 dígitos
    'CN': /^\d{6}$/,
    
    // Rusia: 6 dígitos
    'RU': /^\d{6}$/,
    
    // Suiza: 4 dígitos
    'CH': /^\d{4}$/,
    
    // Suecia: 3 dígitos + espacio + 2 dígitos
    'SE': /^\d{3}\s?\d{2}$/,
    
    // Dinamarca: 4 dígitos
    'DK': /^\d{4}$/,
    
    // Noruega: 4 dígitos
    'NO': /^\d{4}$/,
    
    // Finlandia: 5 dígitos
    'FI': /^\d{5}$/,
    
    // Portugal: 4 dígitos + guión + 3 dígitos
    'PT': /^\d{4}-\d{3}$/,
    
    // Corea del Sur: 5 dígitos o 3+3
    'KR': /^\d{5}$|^\d{3}-\d{3}$/,
  };

  // Patrón general para códigos postales numéricos (3-10 dígitos)
  const numericPattern = /^\d{3,10}$/;
  
  // Patrón general para códigos alfanuméricos comunes
  const alphanumericPattern = /^[A-Z0-9][A-Z0-9\s\-]{2,14}$/i;

  // 1. Intentar validar con patrones específicos por país
  for (const pattern of Object.values(postalCodePatterns)) {
    if (pattern.test(trimmedCode)) {
      return true;
    }
  }

  // 2. Validar formato numérico común (muchos países usan solo dígitos)
  if (numericPattern.test(trimmedCode)) {
    return true;
  }

  // 3. Validar formato alfanumérico básico
  if (alphanumericPattern.test(trimmedCode)) {
    // Verificar que tenga al menos un dígito si tiene letras
    const hasLetter = /[A-Z]/i.test(trimmedCode);
    const hasDigit = /\d/.test(trimmedCode);
    
    if (!hasLetter || (hasLetter && hasDigit)) {
      // Verificar estructura básica
      const parts = trimmedCode.split(/[\s\-]+/);
      
      // Al menos una parte debe tener dígitos
      const hasNumericPart = parts.some(part => /\d/.test(part));
      
      // No más de 3 partes (ej: "WC1X 8QT" tiene 2 partes)
      if (parts.length <= 3 && hasNumericPart) {
        return true;
      }
    }
  }

  // 4. Validación para países con códigos de 4 dígitos (muy común)
  if (/^\d{4}$/.test(trimmedCode)) {
    return true;
  }

  // 5. Validación para países con códigos de 5 dígitos (muy común)
  if (/^\d{5}$/.test(trimmedCode)) {
    return true;
  }

  return false;
};
