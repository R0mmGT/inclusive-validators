function validate(addressLine) {
  // Verificar que el argumento sea un string
  if (typeof addressLine !== 'string') {
    return false;
  }
  
  // Eliminar espacios en blanco al principio y al final
  const trimmedAddress = addressLine.trim();
  
  // La dirección no puede estar vacía después de recortar
  if (trimmedAddress.length === 0) {
    return false;
  }
  
  // Longitud mínima y máxima razonable para una dirección
  if (trimmedAddress.length < 2 || trimmedAddress.length > 200) {
    return false;
  }
  
  // Contar caracteres alfabéticos para asegurar contenido significativo
  const letterCount = (trimmedAddress.match(/[a-zA-ZÀ-ÿ]/g) || []).length;
  if (letterCount < 1) {
    return false;
  }
  
  // Validar caracteres permitidos (amplio para diferentes culturas)
  // Permitir letras, números, espacios, puntuación común y caracteres internacionales
  const allowedChars = /^[\p{L}\p{N}\s.,'\-/#&()\[\]°"´`¨*+;:@¡!¿?]+$/u;
  if (!allowedChars.test(trimmedAddress)) {
    return false;
  }
  
  // Evitar solo números o solo símbolos
  const onlyNumbers = /^[\p{N}\s.,'\-/#&()]+$/u.test(trimmedAddress);
  const onlySymbols = /^[\s.,'\-/#&()\[\]°"´`¨*+;:@¡!¿?]+$/u.test(trimmedAddress);
  if (onlyNumbers || onlySymbols) {
    return false;
  }
  
  // Verificar que no haya secuencias inválidas de caracteres
  const invalidPatterns = [
    /\.{4,}/,      // Múltiples puntos consecutivos
    /,{2,}/,       // Múltiples comas consecutivas  
    /-{3,}/,       // Múltiples guiones consecutivos
    /'{3,}/,       // Múltiples apóstrofes consecutivos
    /\s{3,}/,      // Múltiples espacios consecutivos
    /^[.,\-/#&()]/,// Comienza con puntuación
    /[.,\-/#&()]$/ // Termina con puntuación
  ];
  
  for (const pattern of invalidPatterns) {
    if (pattern.test(trimmedAddress)) {
      return false;
    }
  }
  
  // Verificar que haya al menos un carácter no espacio después de recortar
  if (!trimmedAddress.match(/[^\s]/)) {
    return false;
  }
  
  // Validaciones adicionales para evitar direcciones obviamente inválidas
  const lowerAddress = trimmedAddress.toLowerCase();
  
  // Evitar patrones comunes de prueba
  const testPatterns = [
    'test', 'prueba', 'ejemplo', 'example', 'asdf', 'qwerty',
    'aaa', 'xyz', 'demo', 'muestra', 'abcdef'
  ];
  
  for (const pattern of testPatterns) {
    if (lowerAddress.includes(pattern) && trimmedAddress.length < 10) {
      // Solo marcar como inválido si es corta y contiene patrones de prueba
      return false;
    }
  }
  
  // Verificar proporción razonable entre letras y otros caracteres
  const totalChars = trimmedAddress.length;
  const nonLetterOrDigit = (trimmedAddress.match(/[^\p{L}\p{N}]/gu) || []).length;
  
  // No más del 50% de caracteres no alfanuméricos
  if (nonLetterOrDigit / totalChars > 0.5) {
    return false;
  }
  
  return true;
}
