function validate(apellido) {
  // Validación básica de tipo y longitud
  if (typeof apellido !== 'string') return false;
  
  const trimmed = apellido.trim();
  if (trimmed.length === 0) return false;
  if (trimmed.length > 100) return false;
  
  // Patrones que NO deberían aparecer en un apellido válido
  const patronesInvalidos = [
    // Números
    /\d/,
    // Caracteres especiales no permitidos (excepto guiones, apóstrofes, espacios y puntos)
    /[^\p{L}\s\-\'\.]/u,
    // Múltiples espacios consecutivos
    /\s{2,}/,
    // Guiones o apóstrofes al principio o al final
    /^[\-\'\.]|[\-\'\.]$/,
    // Múltiples guiones, apóstrofes o puntos consecutivos
    /[\-\'\.]{2,}/,
    // Solo espacios, guiones o apóstrofes
    /^[\s\-\'\.]+$/,
    // Caracteres de control (incluyendo tabs, newlines)
    /[\x00-\x1F\x7F]/,
    // Patrones que parecen correos electrónicos
    /@/,
    // Patrones que parecen URLs
    /(http|www|\.com|\.org|\.net)/i,
    // Palabras ofensivas o inapropiadas (ejemplo básico)
    /\b(admin|root|superuser|usuario|test|usuario|null|undefined)\b/i,
  ];
  
  // Verificar patrones inválidos
  for (const patron of patronesInvalidos) {
    if (patron.test(trimmed)) return false;
  }
  
  // Validaciones positivas
  // Debe contener al menos una letra (de cualquier alfabeto)
  if (!/\p{L}/u.test(trimmed)) return false;
  
  // Debe tener al menos una letra que no sea solo punto, guión o apóstrofe
  const letras = trimmed.replace(/[\s\-\'\.]/g, '');
  if (letras.length === 0) return false;
  
  // Validaciones adicionales de formato
  // No debe contener solo letras repetidas (ej: "aaaa")
  if (/^(.)\1+$/.test(letras)) return false;
  
  // Validaciones específicas por país/cultura
  // Permitir apellidos compuestos comunes (ej: "De la Torre", "Van der Berg", "O'Connor", "Smith-Jones")
  // Ya permitimos guiones, apóstrofes y espacios
  
  return true;
}
