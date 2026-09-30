function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }
  
  const trimmed = name.trim();
  
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }
  
  // Validar caracteres básicos (incluye letras, espacios, guiones, apóstrofos, puntos y algunos caracteres Unicode)
  // Permite letras de la mayoría de alfabetos, espacios, guiones, apóstrofes y puntos
  const basicNamePattern = /^[\p{L}\s'.-]+$/u;
  
  // Excluir caracteres de control, símbolos matemáticos, números, etc.
  const excludePattern = /[\p{N}\p{S}\p{P}(?!['.-])\p{C}]/u;
  
  // Validar que no haya secuencias problemáticas
  const problemSequences = [
    /''/,       // Doble apóstrofe
    /\.\./,     // Doble punto
    /--/,       // Doble guión
    /^['.-]/,   // Empieza con puntuación
    /['.-]$/,   // Termina con puntuación
    /\s['.-]/,  // Espacio seguido de puntuación
    /['.-]\s/,  // Puntuación seguida de espacio
    /\s{2,}/    // Múltiples espacios consecutivos
  ];
  
  // Verificar patrón básico
  if (!basicNamePattern.test(trimmed)) {
    return false;
  }
  
  // Excluir caracteres no deseados
  if (excludePattern.test(trimmed)) {
    return false;
  }
  
  // Verificar secuencias problemáticas
  for (const pattern of problemSequences) {
    if (pattern.test(trimmed)) {
      return false;
    }
  }
  
  // Validar que contenga al menos una letra (no solo espacios/puntuación)
  const hasLetter = /[\p{L}]/u.test(trimmed);
  if (!hasLetter) {
    return false;
  }
  
  // Validar que no sea solo caracteres repetidos
  const firstChar = trimmed[0];
  if (trimmed.split('').every(char => char === firstChar)) {
    return false;
  }
  
  return true;
}
