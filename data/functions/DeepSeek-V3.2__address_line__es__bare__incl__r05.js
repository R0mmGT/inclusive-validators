function validate(addressLine) {
  // Validaciones básicas de tipo y longitud
  if (typeof addressLine !== 'string') {
    return false;
  }
  
  const trimmed = addressLine.trim();
  
  // La línea no debe estar vacía después de quitar espacios
  if (trimmed.length === 0) {
    return false;
  }
  
  // Longitud mínima y máxima razonable para una dirección
  if (trimmed.length < 2 || trimmed.length > 200) {
    return false;
  }
  
  // Caracteres permitidos: letras, números, espacios, puntuación común en direcciones
  // Incluye caracteres Unicode para soportar múltiples idiomas
  // Permite: letras (incluyendo acentuadas y de otros alfabetos), números, espacios, y puntuación común
  const validCharacters = /^[\p{L}\p{N}\s\-\/\\.,#°'´`"ªº&()@+;:]+$/u;
  if (!validCharacters.test(trimmed)) {
    return false;
  }
  
  // No debe contener solo números (a menos que sea un número con letra, como "123A")
  const onlyNumbers = /^\d+$/;
  if (onlyNumbers.test(trimmed.replace(/\s/g, ''))) {
    return false;
  }
  
  // Debe contener al menos una letra (de cualquier alfabeto) para ser una dirección válida
  const hasLetter = /[\p{L}]/u;
  if (!hasLetter.test(trimmed)) {
    return false;
  }
  
  // Validaciones de formato específico
  
  // No debe contener palabras prohibidas o patrones inválidos
  const invalidPatterns = [
    /(http|https|ftp|www\.)/i, // URLs
    /@.*\./i, // Correos electrónicos
    /test|fake|dummy|example|none|null|undefined/i, // Palabras que indican datos de prueba
    /^\d+\s*-\s*\d+$/, // Solo números con guiones (como "123-456")
    /^[^\p{L}]*$/u, // Solo caracteres no alfabéticos después de limpieza
  ];
  
  for (const pattern of invalidPatterns) {
    if (pattern.test(trimmed)) {
      return false;
    }
  }
  
  // Verificar que tenga una estructura razonable
  // Debe tener al menos un número (opcional) y texto descriptivo
  const parts = trimmed.split(/[\s,]+/).filter(part => part.length > 0);
  
  if (parts.length < 2) {
    // Para casos como "Calle Mayor" o "Avenida 5" que pueden ser válidos
    // Verificamos que no sea solo un número
    const isSingleNumberWithLetter = /^\d+[\p{L}]*$/u;
    if (isSingleNumberWithLetter.test(trimmed)) {
      return true;
    }
    
    // Para nombres de calles de una sola palabra
    if (parts.length === 1 && /[\p{L}]{2,}/u.test(parts[0])) {
      return true;
    }
    
    return false;
  }
  
  // Verificar proporción de números vs texto
  const digitCount = (trimmed.match(/\p{N}/gu) || []).length;
  const letterCount = (trimmed.match(/\p{L}/gu) || []).length;
  
  // Direcciones típicamente tienen más letras que números, pero permitimos excepciones
  if (letterCount === 0 || (digitCount > 0 && letterCount / digitCount < 0.5)) {
    // Demasiados números en relación a letras
    return false;
  }
  
  // Verificar que no sea una secuencia repetitiva o patrón inválido
  const repeatedPattern = /^(.+?)\1{2,}/; // Detecta patrones repetidos 3+ veces
  const noSpaces = trimmed.replace(/\s/g, '');
  if (repeatedPattern.test(noSpaces)) {
    return false;
  }
  
  // Verificar distribución de caracteres - no debe ser todo puntuación o espacios
  const nonSpaceCount = (trimmed.match(/[^\s]/g) || []).length;
  const punctuationCount = (trimmed.match(/[\-\/\\.,#°'´`"ªº&()@+;:]/g) || []).length;
  
  if (punctuationCount > nonSpaceCount * 0.5) {
    // Demasiada puntuación
    return false;
  }
  
  // Verificar que no sean solo caracteres especiales con números
  const specialCharWithNumbers = /^[\s\-\/\\.,#°'´`"ªº&()@+;:]+\d+[\s\-\/\\.,#°'´`"ªº&()@+;:]*$/;
  if (specialCharWithNumbers.test(trimmed)) {
    return false;
  }
  
  // Validación final: estructura general
  // Debe tener al menos un número (opcional) seguido de o precedido por texto
  const hasNumber = /\d/.test(trimmed);
  const hasMeaningfulText = /[\p{L}]{2,}.*[\p{L}]{2,}|[\p{L}]{3,}/u.test(trimmed);
  
  if (!hasMeaningfulText) {
    return false;
  }
  
  // Para direcciones con números, verificar formato común
  if (hasNumber) {
    const commonAddressPatterns = [
      /^\d+\s+[\p{L}]+/u, // "123 Calle"
      /^[\p{L}]+\s+\d+/u, // "Calle 123"
      /^\d+\s*[-‐‑‒–—―]\s*\d+/u, // "123-456" (con diferentes tipos de guiones)
      /^\d+\s*[A-Za-zÀ-ÿ]\b/u, // "123A"
      /\d+\s+(de\s+)?[\p{L}]+/iu, // "123 de Mayo"
    ];
    
    let matchesCommonPattern = false;
    for (const pattern of commonAddressPatterns) {
      if (pattern.test(trimmed)) {
        matchesCommonPattern = true;
        break;
      }
    }
    
    // Si tiene número pero no coincide con patrones comunes, podría ser inválido
    // pero lo permitimos por si es un formato específico de algún país
  }
  
  return true;
}
