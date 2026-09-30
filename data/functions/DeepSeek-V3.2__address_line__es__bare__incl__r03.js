function validate(str) {
  // Validaciones básicas
  if (typeof str !== 'string') return false;
  
  const trimmed = str.trim();
  
  // La dirección no debe estar vacía
  if (trimmed.length === 0) return false;
  
  // Longitud mínima y máxima razonable para una dirección
  if (trimmed.length < 2 || trimmed.length > 200) return false;
  
  // Verificar caracteres permitidos
  // Permitimos letras de cualquier idioma, números, espacios y símbolos comunes
  // Usamos rangos Unicode para cubrir múltiples scripts
  const allowedPattern = /^[\p{L}\p{N}\s\-\/\\.,#'"°ºª@()\[\]{}&+;:*]+$/u;
  
  if (!allowedPattern.test(trimmed)) return false;
  
  // Debe contener al menos un carácter alfabético (incluyendo caracteres Unicode)
  const hasLetter = /[\p{L}]/u.test(trimmed);
  if (!hasLetter) return false;
  
  // No debe contener solo espacios repetidos
  if (/^\s+$/.test(trimmed)) return false;
  
  // No debe contener secuencias de puntos o guiones extraños
  if (/\.{4,}/.test(trimmed) || /\-{3,}/.test(trimmed)) return false;
  
  // Validaciones estructurales
  
  // 1. No debe empezar o terminar con ciertos caracteres
  if (/^[\s\-\\\/.,;:*]/.test(trimmed) || /[\s\-\\\/.,;:*]$/.test(trimmed)) {
    return false;
  }
  
  // 2. Debe tener una estructura mínima de dirección
  //    Al menos un número (opcional) y texto significativo
  
  // Separar por espacios y filtrar elementos vacíos
  const parts = trimmed.split(/\s+/).filter(part => part.length > 0);
  
  if (parts.length < 2) {
    // Si solo tiene una parte, debe ser significativamente larga
    // y contener mezcla de letras y números
    if (parts[0].length < 5) return false;
  }
  
  // 3. Verificar proporción de caracteres especiales
  const specialChars = trimmed.replace(/[\p{L}\p{N}\s]/gu, '');
  if (specialChars.length > trimmed.length * 0.3) return false;
  
  // 4. Validar combinaciones comunes
  // Ejemplos de direcciones válidas:
  // - "123 Main St"
  // - "Avenida de la Constitución, 45"
  // - "Rue de l'Église 12bis"
  // - "东京都渋谷区道玄坂2丁目"
  
  // Patrones de direcciones comunes
  const addressPatterns = [
    // Número seguido de texto (común en países anglosajones)
    /^\d+\s+[\p{L}].*/u,
    // Texto seguido de número (común en Europa)
    /^[\p{L}].*\s+\d+.*/u,
    // Texto con número incluido
    /^.*\d+.*/u,
    // Direcciones con caracteres especiales comunes
    /^.*[\p{L}\d].*/u
  ];
  
  // Al menos un patrón debe coincidir
  const matchesPattern = addressPatterns.some(pattern => pattern.test(trimmed));
  if (!matchesPattern) return false;
  
  // 5. Validar que no sea claramente inválido
  const invalidPatterns = [
    /^\d+$/, // Solo números
    /^[^a-zA-Z0-9]+$/, // Solo caracteres especiales
    /(.)\1{10,}/, // Carácter repetido muchas veces
    /test/i,
    /asdf/i,
    /qwerty/i,
    /xxxxx/i,
    /aaaaa/i
  ];
  
  if (invalidPatterns.some(pattern => pattern.test(trimmed.toLowerCase()))) {
    return false;
  }
  
  // 6. Validar diversidad de caracteres (evitar spam)
  const uniqueChars = new Set(trimmed.toLowerCase().replace(/\s/g, ''));
  if (uniqueChars.size < 3 && trimmed.length > 10) return false;
  
  return true;
}
