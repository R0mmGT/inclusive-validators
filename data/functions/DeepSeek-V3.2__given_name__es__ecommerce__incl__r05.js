function validate(name) {
  // Validación básica de tipo
  if (typeof name !== 'string') return false;
  
  // Eliminar espacios al inicio y final
  const trimmedName = name.trim();
  
  // Validar longitud mínima y máxima (1-100 caracteres)
  if (trimmedName.length < 1 || trimmedName.length > 100) return false;
  
  // Verificar que no sea solo espacios
  if (trimmedName.length === 0) return false;
  
  // Patrón principal: permite letras de cualquier idioma, apóstrofes, guiones, puntos y espacios internos
  // Incluye caracteres latinos, cirílicos, griegos, árabes, hebreos, chinos, japoneses, etc.
  const namePattern = /^[\p{L}\p{M}\-'. ]+$/u;
  
  if (!namePattern.test(trimmedName)) return false;
  
  // Validaciones adicionales de formato
  // No puede empezar ni terminar con guiones, apóstrofes, puntos o espacios
  if (/^[\-'. ]|[\-'. ]$/.test(trimmedName)) return false;
  
  // No puede tener secuencias inválidas de caracteres especiales
  if (/[\-'. ]{2,}/.test(trimmedName)) return false;
  
  // No puede tener solo caracteres especiales sin letras
  if (!/\p{L}/u.test(trimmedName)) return false;
  
  // Verificar que al menos un carácter sea una letra (no solo espacios/apóstrofes/guiones)
  const hasAtLeastOneLetter = /[\p{L}\p{M}]/u.test(trimmedName.replace(/[\-'. ]/g, ''));
  if (!hasAtLeastOneLetter) return false;
  
  // Validación de nombres comunes problemáticos
  const prohibitedPatterns = [
    /^\d+$/, // Solo números
    /^test$/i, // "test" (probablemente no es un nombre real)
    /^admin$/i, // "admin"
    /^user$/i, // "user"
    /^unknown$/i, // "unknown"
    /^null$/i, // "null"
    /^undefined$/i // "undefined"
  ];
  
  for (const pattern of prohibitedPatterns) {
    if (pattern.test(trimmedName)) return false;
  }
  
  // Validación de secuencias repetitivas (ej: "aaaa", "abcabc")
  if (/(.)\1{3,}/.test(trimmedName)) return false; // Más de 3 caracteres idénticos consecutivos
  
  // Validación de mezcla de scripts (opcional, puede ser restrictivo)
  // Descomenta si quieres evitar mezclar scripts diferentes en un mismo nombre
  /*
  const scripts = trimmedName.match(/[\p{Script=Latin}]|[\p{Script=Cyrillic}]|[\p{Script=Greek}]|[\p{Script=Arabic}]|[\p{Script=Hebrew}]|[\p{Script=Han}]|[\p{Script=Katakana}]|[\p{Script=Hiragana}]|[\p{Script=Hangul}]/gu);
  if (scripts && new Set(scripts.map(s => {
    if (/[\p{Script=Latin}]/u.test(s)) return 'Latin';
    if (/[\p{Script=Cyrillic}]/u.test(s)) return 'Cyrillic';
    // ... otros scripts
    return 'Other';
  })).size > 1) {
    return false;
  }
  */
  
  // Validación de nombres demasiado genéricos o ofensivos (lista básica)
  const blockedNames = [
    'undefined', 'null', 'nil', 'none', 'anonymous', 'anon', 
    'incognito', 'secret', 'private', 'hidden', 'unknown'
  ];
  
  if (blockedNames.includes(trimmedName.toLowerCase())) return false;
  
  // Si pasó todas las validaciones
  return true;
}
