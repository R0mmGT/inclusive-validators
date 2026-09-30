function validate(addressLine) {
  // Verificar que el argumento sea un string
  if (typeof addressLine !== 'string') {
    return false;
  }
  
  // Longitud mínima y máxima razonables para una dirección
  if (addressLine.length < 2 || addressLine.length > 200) {
    return false;
  }
  
  // Verificar que no esté compuesta solo de espacios o caracteres no imprimibles
  if (!addressLine.trim()) {
    return false;
  }
  
  // Verificar que contenga al menos un carácter alfabético o número
  // para evitar strings como "---" o "..."
  const hasAlphanumeric = /[a-zA-Z0-9]/.test(addressLine);
  if (!hasAlphanumeric) {
    return false;
  }
  
  // Caracteres permitidos: letras (incluyendo acentos y caracteres internacionales),
  // números, espacios, y símbolos comunes en direcciones postales
  // Esta expresión permite la mayoría de caracteres Unicode de letras y números,
  // así como símbolos comunes en direcciones
  const allowedPattern = /^[\p{L}\p{N}\s\-\.,#'´`"/°ºªª:;()\[\]@&+]+$/u;
  
  if (!allowedPattern.test(addressLine)) {
    return false;
  }
  
  // Validaciones adicionales de sentido común:
  
  // No debe comenzar o terminar con ciertos caracteres de puntuación
  if (/^[\s\-\.,:#'´`"/°ºªª:;()\[\]@&+]/.test(addressLine) || 
      /[\s\-\.,:#'´`"/°ºªª:;()\[\]@&+]$/.test(addressLine)) {
    return false;
  }
  
  // No debe tener múltiples espacios consecutivos
  if (/\s{2,}/.test(addressLine)) {
    return false;
  }
  
  // No debe tener múltiples signos de puntuación consecutivos (excepto puntos en números)
  if (/[-\.,#'´`"/:;()\[\]@&+]{2,}/.test(addressLine)) {
    return false;
  }
  
  // Debe contener al menos 2 caracteres alfabéticos (en cualquier idioma)
  // para capturar el nombre de la calle
  const alphabeticChars = addressLine.match(/\p{L}/gu);
  if (!alphabeticChars || alphabeticChars.length < 2) {
    return false;
  }
  
  return true;
}
