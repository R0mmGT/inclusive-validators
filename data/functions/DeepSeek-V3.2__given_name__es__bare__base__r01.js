function validate(name) {
  // Verificar que el argumento sea un string
  if (typeof name !== 'string') {
    return false;
  }
  
  // Eliminar espacios al inicio y final
  const trimmedName = name.trim();
  
  // Verificar que no esté vacío después de trim
  if (trimmedName.length === 0) {
    return false;
  }
  
  // Verificar longitud máxima común de nombres (50 caracteres)
  if (trimmedName.length > 50) {
    return false;
  }
  
  // Verificar que solo contenga letras, espacios, guiones, apóstrofos o puntos
  // (permitiendo nombres como "Jean-Pierre", "O'Connor", "St. John")
  if (!/^[A-Za-zÀ-ÿ\s\-'.]+$/.test(trimmedName)) {
    return false;
  }
  
  // Verificar que no empiece o termine con caracteres no alfabéticos
  if (!/^[A-Za-zÀ-ÿ]/.test(trimmedName) || !/[A-Za-zÀ-ÿ]$/.test(trimmedName)) {
    return false;
  }
  
  // Verificar que no tenga caracteres especiales consecutivos
  if (/\s{2,}/.test(trimmedName) || /[\-\'.]{2,}/.test(trimmedName)) {
    return false;
  }
  
  // Verificar que al menos tenga una letra
  if (!/[A-Za-zÀ-ÿ]/.test(trimmedName)) {
    return false;
  }
  
  // Verificar que después de un guion, apóstrofo o punto haya una letra
  if (/[\-\'.]\s/.test(trimmedName) || /\s[\-\'.]/.test(trimmedName)) {
    return false;
  }
  
  // Verificar formato de mayúsculas/minúsculas básico (primer carácter de cada palabra en mayúscula)
  // pero no es estricto para permitir nombres como "de la Torre" o "mcGregor"
  const words = trimmedName.split(/[\s\-']/).filter(word => word.length > 0);
  
  // Verificar que cada palabra empiece con letra
  for (const word of words) {
    if (!/^[A-Za-zÀ-ÿ]/.test(word)) {
      return false;
    }
    
    // Verificar que no haya puntos internos en palabras a menos que sea al final (como abreviatura)
    const innerWord = word.slice(1, -1);
    if (innerWord.includes('.') && !word.endsWith('.')) {
      return false;
    }
  }
  
  return true;
}
