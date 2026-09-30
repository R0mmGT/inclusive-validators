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
  
  // Verificar longitud mínima y máxima razonable para nombres
  // La longitud mínima de 1 permite nombres como "Li" (chino) o "Jo" (occidental)
  // La longitud máxima de 70 cubre incluso nombres compuestos largos
  if (trimmedName.length < 1 || trimmedName.length > 70) {
    return false;
  }
  
  // Verificar que no sea solo espacios en blanco
  if (!trimmedName.replace(/\s/g, '').length) {
    return false;
  }
  
  // Patrón básico que permite:
  // - Letras de cualquier alfabeto (incluidos caracteres acentuados)
  // - Apóstrofos, guiones y espacios para nombres compuestos
  // - Puntos para abreviaciones (como "J." en "J. R. R. Tolkien")
  const namePattern = /^[\p{L}'’\-.\s]+$/u;
  
  if (!namePattern.test(trimmedName)) {
    return false;
  }
  
  // Verificar que no empiece ni termine con caracteres no alfabéticos
  // (excepto apóstrofo, que puede aparecer al inicio en algunos nombres como "O'Connor")
  const invalidStartPattern = /^[.\-\s]/;
  const invalidEndPattern = /[.\-\s]$/;
  
  if (invalidStartPattern.test(trimmedName) || invalidEndPattern.test(trimmedName)) {
    return false;
  }
  
  // Verificar que no haya caracteres no alfabéticos consecutivos
  // (excepto espacios, que pueden separar nombres compuestos)
  const consecutiveSpecialChars = /[.'’\-]{2,}/;
  if (consecutiveSpecialChars.test(trimmedName)) {
    return false;
  }
  
  // Verificar que haya al menos una letra (no solo caracteres especiales)
  const hasLetter = /\p{L}/u.test(trimmedName);
  if (!hasLetter) {
    return false;
  }
  
  // Verificar que no contenga números
  if (/\d/.test(trimmedName)) {
    return false;
  }
  
  // Verificar que no contenga símbolos no permitidos
  const invalidSymbols = /[!@#$%^&*()_+=<>?\[\]{}|\\/~`":;]/;
  if (invalidSymbols.test(trimmedName)) {
    return false;
  }
  
  // Verificación adicional: al menos una letra mayúscula/minúscula mixta
  // (esto no es universal, pero ayuda a detectar entradas como "AAAAA")
  const hasMixedCase = /[a-z].*[A-Z]|[A-Z].*[a-z]/.test(trimmedName);
  const isSingleCaseWord = /^[A-Z]+$|^[a-z]+$/.test(trimmedName.replace(/[^a-zA-Z]/g, ''));
  
  // Permitir tanto nombres en mayúsculas como en minúsculas
  // (algunas culturas usan solo mayúsculas o solo minúsculas)
  // Esta verificación es solo informativa, no rechazamos por esto
  
  // Verificar que no tenga demasiados espacios consecutivos
  const multipleSpaces = /\s{3,}/;
  if (multipleSpaces.test(trimmedName)) {
    return false;
  }
  
  // Validación de contexto: nombres muy cortos (1-2 caracteres)
  // deben ser válidos en algunos idiomas (chino: "李", coreano: "김")
  // pero verificamos que sean letras
  const lettersOnly = trimmedName.replace(/[^\\p{L}]/gu, '');
  if (lettersOnly.length === 1) {
    // Para nombres de un solo carácter, verificar que sea una letra válida
    const singleCharPattern = /^\p{L}$/u;
    return singleCharPattern.test(lettersOnly);
  }
  
  // Verificar proporción de caracteres especiales
  const specialCharsCount = (trimmedName.match(/[.'’\-\s]/g) || []).length;
  const totalChars = trimmedName.length;
  if (specialCharsCount / totalChars > 0.5) {
    return false;
  }
  
  // Validación exitosa
  return true;
}
