function validate(fullName) {
  // Validar entrada básica
  if (typeof fullName !== 'string') return false;
  
  const trimmedName = fullName.trim();
  if (trimmedName.length === 0) return false;
  
  // Patrones prohibidos (caracteres no permitidos en nombres)
  const invalidPatterns = [
    /[0-9]/,                         // Números
    /[_\\|<>@#$%^*(){}[\]~+=]/g,    // Caracteres especiales técnicos
    /\*\*\*/,                        // Marcadores de censura
    /\.{3,}/,                        // Puntos suspensivos múltiples
    /www\.|http|\.com|\.net|\.org/i, // URLs
    /^\s*$/,                         // Solo espacios
    /^test$/i,                       // Palabra "test"
    /^user$/i,                       // Palabra "user"
    /^unknown$/i,                    // Palabra "unknown"
    /^null$/i,                       // Palabra "null"
    /^undefined$/i,                  // Palabra "undefined"
    /^guest$/i,                      // Palabra "guest"
    /^anonymous$/i,                  // Palabra "anonymous"
    /^(mr|mrs|ms|miss|dr|prof)\.?$/i // Solo título sin nombre
  ];
  
  // Verificar patrones prohibidos
  for (const pattern of invalidPatterns) {
    if (pattern.test(trimmedName)) return false;
  }
  
  // Validación de estructura básica
  const words = trimmedName.split(/\s+/).filter(word => word.length > 0);
  
  // Debe tener al menos 2 palabras (nombre y apellido)
  if (words.length < 2) return false;
  
  // Cada palabra debe tener al menos 2 caracteres (excepto iniciales con punto)
  for (const word of words) {
    // Permitir iniciales con punto como "J." o "A.B."
    if (word.match(/^[A-ZÀ-ÿ]\.?$/i)) continue;
    
    // Verificar longitud mínima para palabras completas
    if (word.replace(/\./g, '').length < 2) return false;
  }
  
  // Validar caracteres permitidos
  // Permitir letras, espacios, guiones, apóstrofes, puntos y algunos caracteres diacríticos
  const validNameRegex = /^[\p{L}\s\-'.]+$/u;
  if (!validNameRegex.test(trimmedName)) return false;
  
  // Validar uso razonable de puntos (no al principio, no múltiples seguidos)
  if (trimmedName.match(/^\.|\.\.|\.\s*\./)) return false;
  
  // Validar uso razonable de guiones y apóstrofes
  if (trimmedName.match(/^-|-$|' -|- '|''|--/)) return false;
  
  // Validar que no sea solo mayúsculas o solo minúsculas
  const hasUpper = /[A-ZÀ-ÖØ-Þ]/.test(trimmedName);
  const hasLower = /[a-zà-öø-ÿ]/.test(trimmedName);
  if (!hasUpper || !hasLower) return false;
  
  // Validar longitud total razonable (entre 3 y 100 caracteres)
  if (trimmedName.length < 3 || trimmedName.length > 100) return false;
  
  // Validar que no haya palabras repetidas de forma sospechosa
  const uniqueWords = new Set(words.map(w => w.toLowerCase()));
  if (uniqueWords.size < 2 && words.length > 2) return false;
  
  return true;
}
