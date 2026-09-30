function validate(name) {
  // Validación básica de tipo y longitud
  if (typeof name !== 'string') return false;
  
  const trimmedName = name.trim();
  if (trimmedName.length < 1 || trimmedName.length > 100) return false;
  
  // Verificar que no sea solo espacios en blanco
  if (!trimmedName) return false;
  
  // Patrones de validación
  const patterns = [
    // Nombres con letras básicas internacionales (incluye acentos y diacríticos comunes)
    /^[\p{L} '-]+$/u,
    
    // Nombres con caracteres árabes y espacios
    /^[\p{Arabic} ]+$/u,
    
    // Nombres con caracteres hebreos y espacios
    /^[\p{Hebrew} ]+$/u,
    
    // Nombres con caracteres devanagari (hindi, sánscrito, etc.)
    /^[\p{Devanagari} ]+$/u,
    
    // Nombres con caracteres chinos/japoneses/coreanos
    /^[\p{Han}\p{Hiragana}\p{Katakana}\p{Hangul} ]+$/u,
    
    // Nombres con caracteres tailandeses
    /^[\p{Thai} ]+$/u,
    
    // Nombres con caracteres bengalíes
    /^[\p{Bengali} ]+$/u,
    
    // Nombres con caracteres tamil
    /^[\p{Tamil} ]+$/u,
    
    // Nombres con caracteres cirílicos
    /^[\p{Cyrillic} ]+$/u,
    
    // Nombres con caracteres griegos
    /^[\p{Greek} ]+$/u,
    
    // Nombres con caracteres armenios
    /^[\p{Armenian} ]+$/u,
    
    // Nombres con caracteres georgianos
    /^[\p{Georgian} ]+$/u,
    
    // Nombres con caracteres etíopes
    /^[\p{Ethiopic} ]+$/u
  ];
  
  // Verificar que el nombre coincida con al menos un patrón
  const matchesPattern = patterns.some(pattern => pattern.test(trimmedName));
  if (!matchesPattern) return false;
  
  // Validaciones adicionales de sentido común
  
  // No permitir solo caracteres especiales o puntuación
  if (/^[-'. ]+$/.test(trimmedName)) return false;
  
  // No permitir secuencias inválidas de apóstrofes o guiones
  if (/''|--|  |'[ -]|[- ]'|^['-]|['-]$/.test(trimmedName)) return false;
  
  // Verificar que haya al menos una letra (no solo espacios, guiones o apóstrofes)
  const hasLetter = /[\p{L}]/u.test(trimmedName);
  if (!hasLetter) return false;
  
  // Verificar que no sea una secuencia repetitiva
  if (/^(.)\1+$/.test(trimmedName.replace(/[ -']/g, ''))) return false;
  
  // Verificar longitud mínima después de eliminar caracteres especiales
  const lettersOnly = trimmedName.replace(/[ -']/g, '');
  if (lettersOnly.length < 1) return false;
  
  return true;
}
