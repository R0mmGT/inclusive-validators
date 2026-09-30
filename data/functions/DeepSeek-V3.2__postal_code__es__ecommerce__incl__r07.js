function validate(postalCode) {
  // Validar que sea string y no esté vacío
  if (typeof postalCode !== 'string') return false;
  
  // Eliminar espacios en blanco al inicio y final
  const trimmedCode = postalCode.trim();
  if (trimmedCode.length === 0) return false;

  // Patrones para diferentes países (ordenados por uso común)
  const patterns = {
    // Estados Unidos (5 dígitos, opcionalmente 5-4)
    'US': /^\d{5}(-\d{4})?$/,
    
    // Canadá (A1A 1A1)
    'CA': /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] \d[ABCEGHJKLMNPRSTVWXYZ]\d$/i,
    
    // Reino Unido (formato complejo)
    'UK': /^(GIR 0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|[A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})$/i,
    
    // Australia (4 dígitos)
    'AU': /^\d{4}$/,
    
    // Alemania (5 dígitos)
    'DE': /^\d{5}$/,
    
    // Francia (5 dígitos)
    'FR': /^\d{5}$/,
    
    // Italia (5 dígitos)
    'IT': /^\d{5}$/,
    
    // España (5 dígitos)
    'ES': /^(0[1-9]|[1-4]\d|5[0-2])\d{3}$/,
    
    // Países Bajos (4 dígitos + 2 letras)
    'NL': /^\d{4} ?[A-Z]{2}$/i,
    
    // Brasil (5 dígitos, opcionalmente 5-3)
    'BR': /^\d{5}(-\d{3})?$/,
    
    // Japón (3 dígitos + 4 dígitos)
    'JP': /^\d{3}-\d{4}$/,
    
    // México (5 dígitos)
    'MX': /^\d{5}$/,
    
    // Argentina (4 dígitos, opcionalmente letra)
    'AR': /^[A-Z]?\d{4}[A-Z]{0,3}$/i,
    
    // China (6 dígitos)
    'CN': /^\d{6}$/,
    
    // India (6 dígitos)
    'IN': /^\d{6}$/,
    
    // Rusia (6 dígitos)
    'RU': /^\d{6}$/,
    
    // Corea del Sur (5 dígitos, opcionalmente 5-3)
    'KR': /^\d{5}(-\d{3})?$/,
    
    // Suiza (4 dígitos)
    'CH': /^\d{4}$/,
    
    // Suecia (5 dígitos, opcionalmente 5-3)
    'SE': /^\d{5}( \d{2})?$/,
    
    // Noruega (4 dígitos)
    'NO': /^\d{4}$/,
    
    // Dinamarca (4 dígitos)
    'DK': /^\d{4}$/,
    
    // Finlandia (5 dígitos)
    'FI': /^\d{5}$/,
    
    // Portugal (4 dígitos + 3 dígitos, opcionalmente separados por guión)
    'PT': /^\d{4}(-\d{3})?$/,
    
    // Polonia (2 dígitos + guión + 3 dígitos)
    'PL': /^\d{2}-\d{3}$/,
    
    // Bélgica (4 dígitos)
    'BE': /^\d{4}$/,
    
    // Austria (4 dígitos)
    'AT': /^\d{4}$/,
    
    // Irlanda (formato complejo)
    'IE': /^[A-Z]\d[\dA-Z]? ?\d[A-Z]{2}$/i,
    
    // Nueva Zelanda (4 dígitos)
    'NZ': /^\d{4}$/,
    
    // Sudáfrica (4 dígitos)
    'ZA': /^\d{4}$/,
    
    // Turquía (5 dígitos)
    'TR': /^\d{5}$/,
    
    // Chile (7 dígitos)
    'CL': /^\d{7}$/
  };

  // Intentar coincidir con cada patrón
  for (const country in patterns) {
    if (patterns[country].test(trimmedCode)) {
      return true;
    }
  }

  // Patrones genéricos como último recurso
  const genericPatterns = [
    // 4-5 dígitos (común en muchos países europeos)
    /^\d{4,5}$/,
    
    // 6 dígitos (común en varios países)
    /^\d{6}$/,
    
    // Combinación alfanumérica con espacios o guiones
    /^[A-Z0-9][A-Z0-9\- ]{3,10}[A-Z0-9]$/i
  ];

  return genericPatterns.some(pattern => pattern.test(trimmedCode));
}
