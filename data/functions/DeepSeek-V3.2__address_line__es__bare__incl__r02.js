function validate(addressLine) {
  // Verificar que el argumento sea un string
  if (typeof addressLine !== 'string') {
    return false;
  }

  // Eliminar espacios al principio y al final
  const trimmedAddress = addressLine.trim();
  
  // Una dirección no puede estar vacía
  if (trimmedAddress.length === 0) {
    return false;
  }

  // Longitud máxima razonable para una línea de dirección
  // (basado en estándares postales internacionales)
  if (trimmedAddress.length > 100) {
    return false;
  }

  // Debe contener al menos un carácter alfanumérico o ideograma
  // Esto cubre letras, números, y caracteres de escrituras no latinas
  const hasValidContent = /[\p{L}\p{N}]/u.test(trimmedAddress);
  if (!hasValidContent) {
    return false;
  }

  // Validar estructura básica:
  // 1. No puede consistir solo de números (demasiado restrictivo, comentado)
  // 2. No puede consistir solo de caracteres especiales
  // 3. Debe tener una estructura mínimamente legible

  // Contar letras vs números vs otros caracteres
  const letterMatch = trimmedAddress.match(/\p{L}/gu) || [];
  const numberMatch = trimmedAddress.match(/\p{N}/gu) || [];
  const otherMatch = trimmedAddress.match(/[^\p{L}\p{N}\s]/gu) || [];
  
  // Si tiene más del 70% de caracteres especiales, probablemente no sea válido
  const totalChars = letterMatch.length + numberMatch.length + otherMatch.length;
  if (totalChars > 0 && (otherMatch.length / totalChars) > 0.7) {
    return false;
  }

  // Patrones problemáticos comunes
  const problematicPatterns = [
    /^[^a-zA-Z0-9]+$/, // Solo caracteres especiales
    /^\d+$/, // Solo números (puede ser válido en algunos casos, pero generalmente no)
    /^(?:test|prueba|ejemplo|sample|demo|xxx|aaaa|xyz)+$/i, // Palabras de prueba
    /^(?:\.|,|\/|\\|-|_)+$/, // Solo puntuación/repetidos
    /(.)\1{10,}/, // Carácter repetido más de 10 veces
    /[<>\[\]{}|]/ // Caracteres de control/HTML
  ];

  for (const pattern of problematicPatterns) {
    if (pattern.test(trimmedAddress)) {
      return false;
    }
  }

  // Verificar que tenga una estructura mínima
  // Al menos dos "palabras" o una palabra con número
  const words = trimmedAddress.split(/\s+/).filter(word => word.length > 0);
  
  if (words.length < 1) {
    return false;
  }

  // Para direcciones de una sola palabra, verificar que no sea solo un número
  if (words.length === 1) {
    const singleWord = words[0];
    // Permitir casos como "123A", "B-12", etc.
    const hasLetter = /\p{L}/u.test(singleWord);
    const hasNumber = /\p{N}/u.test(singleWord);
    
    // Si es solo número, probablemente no sea una calle completa
    if (!hasLetter && hasNumber) {
      return false;
    }
  }

  // Verificar formatos específicos por país (sin ser demasiado restrictivo)
  // Ejemplo: direcciones japonesas pueden tener muchos números y caracteres japoneses
  // Ejemplo: direcciones europeas pueden tener acentos y caracteres especiales
  
  // Permitir caracteres internacionales comunes en direcciones:
  // Letras con acentos, caracteres cirílicos, árabes, chinos, etc.
  // Números en diferentes sistemas (pero \p{N} ya cubre esto)
  // Símbolos comunes: . , - / # &
  
  // Caracteres no permitidos (control, inyección, etc.)
  const invalidChars = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/;
  if (invalidChars.test(trimmedAddress)) {
    return false;
  }

  // Validación adicional: debe parecerse a una dirección real
  // 1. Tiene al menos una letra (de cualquier escritura)
  // 2. Tiene una estructura razonable
  
  // Verificar proporción de espacios (demasiados o muy pocos pueden ser sospechosos)
  const spaceCount = (trimmedAddress.match(/\s/g) || []).length;
  if (spaceCount > 10) { // Más de 10 espacios es sospechoso
    return false;
  }

  // Si pasa todas las validaciones
  return true;
}
