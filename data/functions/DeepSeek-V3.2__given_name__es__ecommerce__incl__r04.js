function validate(name) {
  // Verificar que el argumento sea un string
  if (typeof name !== 'string') return false;
  
  // Eliminar espacios al inicio y final
  const trimmedName = name.trim();
  
  // Verificar longitud mínima y máxima (1-70 caracteres)
  if (trimmedName.length < 1 || trimmedName.length > 70) return false;
  
  // Verificar que no contenga solo espacios o caracteres de control
  if (!trimmedName || /^[\s\p{C}]+$/u.test(trimmedName)) return false;
  
  // Verificar caracteres permitidos:
  // - Letras de cualquier alfabeto (incluidos caracteres acentuados)
  // - Apóstrofes, guiones y espacios internos (para nombres compuestos)
  // - Puntos (para abreviaciones como "J.")
  // - No permite números ni símbolos especiales
  const validPattern = /^[\p{L}\s'.-]+$/u;
  if (!validPattern.test(trimmedName)) return false;
  
  // Verificar que no tenga caracteres especiales consecutivos
  if (/(['.-])\1/.test(trimmedName)) return false; // No dos seguidos
  if (/^['.-]|['.-]$/.test(trimmedName)) return false; // No al inicio ni al final
  if (/\s['.-]|['.-]\s/.test(trimmedName)) return false; // No junto a espacios
  
  // Verificar que tenga al menos una letra
  if (!/\p{L}/u.test(trimmedName)) return false;
  
  // Verificar que no tenga espacios múltiples consecutivos
  if (/\s{2,}/.test(trimmedName)) return false;
  
  // Verificar estructura básica del nombre
  const words = trimmedName.split(/\s+/);
  if (words.length > 5) return false; // Límite razonable de palabras
  
  // Cada palabra debe comenzar con una letra
  for (const word of words) {
    if (!/^\p{L}/u.test(word)) return false;
    // No permitir palabras de un solo carácter que no sean letras
    if (word.length === 1 && !/^\p{L}$/u.test(word)) return false;
  }
  
  return true;
}
