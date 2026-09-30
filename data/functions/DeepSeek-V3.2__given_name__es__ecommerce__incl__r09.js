function validate(name) {
  // Verificar que el argumento sea un string
  if (typeof name !== 'string') {
    return false;
  }

  // Eliminar espacios al principio y al final
  const trimmedName = name.trim();
  
  // Verificar que no esté vacío después de trim
  if (trimmedName.length === 0) {
    return false;
  }

  // Patrones básicos de nombres válidos para múltiples culturas:
  // 1. Puede contener letras de cualquier alfabeto (incluye acentos, diacríticos)
  // 2. Puede contener apóstrofes, guiones y espacios (para nombres compuestos)
  // 3. No puede empezar ni terminar con guiones, apóstrofes o espacios
  // 4. No puede contener números ni símbolos especiales (excepto los permitidos)
  
  const namePattern = /^[\p{L}\p{M}]+(?:[ '\-][\p{L}\p{M}]+)*$/u;
  
  // Verificar longitud mínima y máxima razonable
  if (trimmedName.length < 1 || trimmedName.length > 100) {
    return false;
  }

  // Verificar caracteres prohibidos
  // No permitir caracteres de control, números, ni símbolos especiales (excepto los permitidos)
  const forbiddenPattern = /[\p{C}\p{N}\p{S}]/u;
  if (forbiddenPattern.test(trimmedName.replace(/[ '\-]/g, ''))) {
    return false;
  }

  // Verificar que no tenga múltiples espacios, apóstrofes o guiones consecutivos
  const consecutiveSymbolsPattern = /[ '\-]{2,}/;
  if (consecutiveSymbolsPattern.test(trimmedName)) {
    return false;
  }

  // Verificar que cumpla con el patrón principal
  if (!namePattern.test(trimmedName)) {
    return false;
  }

  // Verificaciones adicionales para nombres comunes problemáticos
  // No permitir solo apóstrofes, guiones o espacios
  const onlySymbolsPattern = /^[ '\-]+$/;
  if (onlySymbolsPattern.test(trimmedName)) {
    return false;
  }

  // Verificar que cada parte del nombre (si hay espacios o guiones) tenga al menos 1 letra
  const parts = trimmedName.split(/[ '\-]+/);
  for (const part of parts) {
    if (part.length === 0) {
      return false;
    }
    
    // Verificar que cada parte empiece con una letra (no símbolo)
    const firstChar = part.charAt(0);
    if (!/\p{L}/u.test(firstChar)) {
      return false;
    }
  }

  return true;
}
