function validate(address) {
  // Validación básica: no vacío y longitud razonable
  if (typeof address !== 'string') return false;
  
  const trimmed = address.trim();
  if (trimmed.length === 0) return false;
  if (trimmed.length > 255) return false; // Límite razonable para direcciones postales
  
  // Patrones comunes que SÍ son válidos
  const validPatterns = [
    // Caracteres alfabéticos de múltiples idiomas (incluye acentos)
    /[\p{L}\p{M}]+/u,
    
    // Números
    /\d/,
    
    // Caracteres especiales comunes en direcciones
    /[\/\\\-.,#'"]/,
    
    // Espacios (incluye espacios normales y no-breaking)
    /[\s\u00A0]/,
    
    // Paréntesis para apartamentos/unidades
    /[()]/,
    
    // Símbolos de moneda (para casos como "Calle $123")
    /[\$\€\£\¥]/,
    
    // Símbolos matemáticos (ej: "Calle &" o "Avenida +")
    /[&+]/,
    
    // Porcentaje y otros símbolos
    /[%]/,
    
    // Caracteres de escritura RTL (derecha a izquierda)
    /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/,
    
    // Caracteres CJK (chino, japonés, coreano)
    /[\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF]/,
    
    // Caracteres tailandeses, devanagari, etc.
    /[\u0E00-\u0E7F\u0900-\u097F]/,
    
    // Números en otros sistemas (árabes, persas, etc.)
    /[\u0660-\u0669\u06F0-\u06F9\u0966-\u096F]/,
  ];
  
  // Verificar que tenga al menos un carácter válido
  const hasValidContent = validPatterns.some(pattern => pattern.test(trimmed));
  if (!hasValidContent) return false;
  
  // Patrones que NO deberían aparecer en direcciones válidas
  const invalidPatterns = [
    // Solo espacios o caracteres de control (excepto tab/newline que podrían estar en textos multi-línea)
    /^[\s\u00A0]+$/,
    
    // Secuencias de caracteres de control (excepto tab y newline)
    /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/,
    
    // Patrones típicos de inyección SQL o código
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|--|;)\b)/i,
    
    // URLs completas (protocolo://)
    /^[a-z]+:\/\//i,
    
    // Direcciones de correo electrónico completas
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    
    // Solo símbolos repetidos (ej: "!!!", "???", "---")
    /^[!?\-.,#'"+&%]+$/,
    
    // Caracteres inválidos que no tienen sentido en direcciones
    /[*<>[\]{}|`~^]/, // Caracteres técnicos/reservados
  ];
  
  // Si coincide con algún patrón inválido, rechazar
  if (invalidPatterns.some(pattern => pattern.test(trimmed))) {
    return false;
  }
  
  // Verificar que tenga una estructura básica mínima
  // Al menos debe tener algún texto no-simbólico o números
  const meaningfulContent = trimmed.replace(/[\s\u00A0\-.,#'"()$€£¥%&+/\\]+/g, '');
  if (meaningfulContent.length === 0) return false;
  
  // Verificar que no sea solo números (pero "123 Main St" es válido después de trim)
  // Eliminamos espacios y verificamos si es solo números
  const withoutSpaces = trimmed.replace(/[\s\u00A0]/g, '');
  if (/^\d+$/.test(withoutSpaces)) return false;
  
  // Verificar proporción de caracteres especiales
  const specialChars = trimmed.replace(/[\p{L}\p{M}\d\s\u00A0]/gu, '');
  if (specialChars.length > trimmed.length * 0.5) return false; // Máximo 50% caracteres especiales
  
  return true;
}
