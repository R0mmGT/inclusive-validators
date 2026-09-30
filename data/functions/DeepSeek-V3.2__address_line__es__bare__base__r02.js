function validate(addressLine) {
  // Verificar que la entrada sea un string
  if (typeof addressLine !== 'string') {
    return false;
  }
  
  // Eliminar espacios al inicio y final
  const trimmed = addressLine.trim();
  
  // Validaciones básicas de longitud
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }
  
  // No debe contener caracteres no permitidos
  // Permitir letras (incluyendo acentos y ñ), números, espacios, guiones, puntos, comas, barras, símbolo de número y apóstrofes
  const invalidChars = /[<>\[\]{}|\\^~%$@*_=+`"¿?¡!;]/;
  if (invalidChars.test(trimmed)) {
    return false;
  }
  
  // Debe contener al menos un número (para número de casa/apartamento)
  const hasNumber = /\d/;
  if (!hasNumber.test(trimmed)) {
    return false;
  }
  
  // Debe contener al menos una letra
  const hasLetter = /[a-zA-ZáéíóúÁÉÍÓÚñÑ]/;
  if (!hasLetter.test(trimmed)) {
    return false;
  }
  
  // No debe comenzar ni terminar con caracteres no alfabéticos (excepto números al inicio)
  if (/^[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]/.test(trimmed) || /[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]$/.test(trimmed)) {
    return false;
  }
  
  // No debe tener múltiples espacios consecutivos
  if (/\s{2,}/.test(trimmed)) {
    return false;
  }
  
  // No debe tener solo números
  if (/^\d+$/.test(trimmed.replace(/\s/g, ''))) {
    return false;
  }
  
  // Validación de formato común: número seguido de nombre de calle o viceversa
  // Ejemplos válidos: "Calle Mayor 123", "123 Calle Mayor", "Av. Libertador 456-7B"
  const commonPatterns = [
    /^\d+\s+[a-zA-ZáéíóúÁÉÍÓÚñÑ]/i,           // Número al inicio
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s+\d+/i,          // Número al final
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s+[a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s+\d+/i,  // Tipo de calle + nombre + número
    /^\d+\s*[-\/]\s*\d+\s+[a-zA-ZáéíóúÁÉÍÓÚñÑ]/i, // Número con guion/barra
    /^\d+\s*[a-zA-Z]?\s+[a-zA-ZáéíóúÁÉÍÓÚñÑ]/i    // Número con letra (1A, 2B)
  ];
  
  // Verificar si coincide con al menos un patrón común
  const matchesPattern = commonPatterns.some(pattern => pattern.test(trimmed));
  if (!matchesPattern) {
    return false;
  }
  
  return true;
}
