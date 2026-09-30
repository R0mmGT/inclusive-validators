function validate(addressLine) {
  // Verificar que el argumento sea un string
  if (typeof addressLine !== 'string') {
    return false;
  }
  
  // Eliminar espacios al inicio y final
  const trimmed = addressLine.trim();
  
  // Una línea de dirección no puede estar vacía
  if (trimmed.length === 0) {
    return false;
  }
  
  // Verificar longitud razonable (máximo 200 caracteres)
  if (trimmed.length > 200) {
    return false;
  }
  
  // Caracteres permitidos globalmente:
  // - Letras de cualquier alfabeto (incluye acentos, diacríticos)
  // - Números
  // - Espacios
  // - Caracteres de puntuación comunes en direcciones
  // - Símbolos matemáticos básicos (para números de departamento, etc.)
  // - Guiones y apóstrofes
  const allowedChars = /^[\p{L}\p{N}\s\-\/.,#'"°ªº&@()\[\]\+\*\\:;¡!¿?«»“”€£¥$]*$/u;
  
  if (!allowedChars.test(trimmed)) {
    return false;
  }
  
  // No permitir solo números o solo símbolos
  const onlyNumbers = /^\p{N}+$/u;
  const onlySymbols = /^[\s\-\/.,#'"°ªº&@()\[\]\+\*\\:;¡!¿?«»"€£¥$]+$/u;
  
  if (onlyNumbers.test(trimmed.replace(/\s/g, '')) || onlySymbols.test(trimmed.replace(/[\p{L}\p{N}]/gu, ''))) {
    return false;
  }
  
  // Debe contener al menos un carácter que no sea espacio
  if (!/\S/.test(trimmed)) {
    return false;
  }
  
  // No permitir secuencias excesivas de espacios
  if (/\s{4,}/.test(trimmed)) {
    return false;
  }
  
  // Validaciones adicionales de formato:
  
  // 1. Debe contener al menos una letra o número (después de limpiar símbolos)
  const lettersOrNumbers = trimmed.replace(/[^\p{L}\p{N}]/gu, '');
  if (lettersOrNumbers.length === 0) {
    return false;
  }
  
  // 2. Para direcciones internacionales, verificar algunos patrones comunes:
  //    - Número seguido de nombre (ej: "123 Main St")
  //    - Nombre seguido de número (ej: "Calle Mayor, 45")
  //    - Pero también aceptar formatos como "Apartado 123" o "PO Box 456"
  
  // 3. No permitir que comience o termine con ciertos símbolos
  if (/^[\/.,\-&@]/.test(trimmed) || /[\/.,\-&@]$/.test(trimmed)) {
    return false;
  }
  
  // 4. Verificar que haya al menos 2 caracteres alfanuméricos (letras o números)
  //    para evitar direcciones demasiado cortas como "a" o "1"
  const alphanumericCount = (trimmed.match(/[\p{L}\p{N}]/gu) || []).length;
  if (alphanumericCount < 2) {
    return false;
  }
  
  // 5. Verificar proporción razonable de caracteres no alfabéticos
  //    (no más del 50% de símbolos, excluyendo espacios)
  const nonAlphanumeric = trimmed.replace(/[\p{L}\p{N}\s]/gu, '');
  const alphanumeric = trimmed.replace(/[^\p{L}\p{N}]/gu, '');
  
  if (nonAlphanumeric.length > alphanumeric.length) {
    return false;
  }
  
  // 6. Patrones específicos que podrían ser problemáticos:
  //    - Secuencias repetitivas
  if (/(.)\1{5,}/.test(trimmed.replace(/\s/g, ''))) {
    return false;
  }
  
  // 7. Validar que no sea una URL o email (contiene @ seguido de punto, o http://)
  const urlPattern = /^(https?:\/\/|www\.|\S+@\S+\.\S+)/i;
  if (urlPattern.test(trimmed)) {
    return false;
  }
  
  // Si pasa todas las validaciones, es probablemente una dirección válida
  return true;
}
