function validate(name) {
  // Validaciones básicas
  if (typeof name !== 'string') return false;
  
  const trimmedName = name.trim();
  
  // Verificar longitud mínima y máxima razonable
  if (trimmedName.length < 1 || trimmedName.length > 100) return false;
  
  // Verificar que no consista solo de espacios
  if (trimmedName.length === 0) return false;
  
  // Patrones a evitar
  const invalidPatterns = [
    /^[0-9]+$/,                           // Solo números
    /^[^a-zA-ZÀ-ÿ]/,                      // No empieza con letra
    /[<>{}[\]\\|`~!@#$%^&*()_+=]/g,       // Caracteres especiales peligrosos
    /^\s*$/,                              // Solo espacios en blanco
    /[\u0000-\u001F\u007F-\u009F]/,       // Caracteres de control
    /\.{2,}/,                             // Múltiples puntos consecutivos
    /,,/,                                 // Múltiples comas consecutivas
    /--/,                                 // Múltiples guiones consecutivos
    /''/,                                 // Múltiples apóstrofes consecutivos
  ];
  
  for (const pattern of invalidPatterns) {
    if (pattern.test(trimmedName)) return false;
  }
  
  // Validar estructura general del nombre
  // Permitir letras, espacios, guiones, apóstrofes, puntos y caracteres Unicode
  const validNamePattern = /^[\p{L}\s'.-]+$/u;
  if (!validNamePattern.test(trimmedName)) return false;
  
  // Verificar que haya al menos una letra (no solo puntuación)
  const hasLetter = /[\p{L}]/u.test(trimmedName);
  if (!hasLetter) return false;
  
  // Verificar que no empiece ni termine con puntuación (excepto apóstrofe inicial para algunos nombres como 'Abdul)
  const invalidStartEnd = /^[.\s-]|[\s.-]$/;
  if (invalidStartEnd.test(trimmedName)) {
    // Excepción para apóstrofe inicial en algunos nombres culturales
    if (!trimmedName.startsWith("'")) return false;
  }
  
  // Verificar que el apóstrofe no esté en posición incorrecta
  if (trimmedName.includes("'") && !/^'|\p{L}'|\p{L}'\p{L}/u.test(trimmedName)) {
    return false;
  }
  
  // Verificar que no haya secuencias prohibidas como punto seguido de espacio o viceversa
  const invalidSequences = [
    /\s\./,      // espacio seguido de punto
    /\.\s\s+/,   // punto seguido de múltiples espacios
    /-\s-/,      // guión-espacio-guion
    /'\s'/,      // apóstrofe-espacio-apóstrofe
  ];
  
  for (const sequence of invalidSequences) {
    if (sequence.test(trimmedName)) return false;
  }
  
  // Validaciones específicas para diferentes culturas
  
  // Nombres compuestos (ej: María José, Jean-Pierre)
  const parts = trimmedName.split(/[\s-]+/).filter(part => part.length > 0);
  
  // Verificar que cada parte tenga sentido
  for (const part of parts) {
    // Longitud mínima por parte (excepto para abreviaciones como "St.")
    if (part.replace(/\./g, '').length < 1 && !part.includes('.')) return false;
    
    // No permitir solo puntuación en una parte
    if (/^[.'-]+$/.test(part)) return false;
    
    // Verificar mayúsculas/minúsculas razonables
    // Permitir diferentes formatos: TODO EN MAYÚSCULAS, Primera Mayúscula, o todo minúsculas
    const isAllCaps = /^[\p{Lu}'.-]+$/u.test(part);
    const isTitleCase = /^[\p{Lu}][\p{Ll}'.-]*$/u.test(part);
    const isAllLower = /^[\p{Ll}'.-]+$/u.test(part);
    
    if (!(isAllCaps || isTitleCase || isAllLower)) {
      // Verificar casos especiales como "McDonald", "O'Connor", etc.
      const specialCases = /^(Mc|Mac|O'|D'|De|La|Le|Van|Von|Di|Da|Del|Della|El|Al)[\p{L}'.-]+/ui;
      if (!specialCases.test(part)) {
        return false;
      }
    }
  }
  
  // Validación final: el nombre debe parecer razonable
  // Contar letras vs. caracteres no letras
  const letters = (trimmedName.match(/[\p{L}]/gu) || []).length;
  const nonLetters = trimmedName.length - letters;
  
  // Debe tener más letras que caracteres no letras (en general)
  if (letters <= nonLetters) return false;
  
  // Debe tener al menos el 30% de letras
  if (letters / trimmedName.length < 0.3) return false;
  
  return true;
}
