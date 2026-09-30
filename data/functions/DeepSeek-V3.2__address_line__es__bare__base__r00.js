function validate(addressLine) {
  // Validar que sea string y tenga longitud mínima
  if (typeof addressLine !== 'string' || addressLine.trim().length === 0) {
    return false;
  }
  
  const trimmedAddress = addressLine.trim();
  
  // Longitudes mínimas y máximas razonables para una dirección
  if (trimmedAddress.length < 2 || trimmedAddress.length > 100) {
    return false;
  }
  
  // Debe contener al menos un número (para número de casa/edificio) 
  // y al menos una letra (para nombre de calle)
  const hasNumber = /\d/.test(trimmedAddress);
  const hasLetter = /[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(trimmedAddress);
  
  if (!hasNumber || !hasLetter) {
    return false;
  }
  
  // Patrones prohibidos (solo números, solo letras, caracteres extraños)
  const forbiddenPatterns = [
    /^[0-9\s\W]+$/, // Solo números, espacios o caracteres especiales
    /^[a-zA-Z\s\W]+$/, // Solo letras, espacios o caracteres especiales
    /[<>{}[\]]/, // Caracteres potencialmente peligrosos
    /^\W+$/, // Solo caracteres especiales
    /^\d+$/, // Solo números
    /^[a-zA-Z]+$/, // Solo letras (sin números)
    /(\s{3,})/, // Múltiples espacios consecutivos
    /(\.{3,})/, // Puntos suspensivos
    /^[^a-zA-Z0-9]+$/ // Ni números ni letras
  ];
  
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(trimmedAddress)) {
      return false;
    }
  }
  
  // Patrones válidos comunes en direcciones
  const validPatterns = [
    // Ej: "Calle Mayor 123", "Av. Libertador 456"
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.]+ \d+[a-zA-Z]?(\s*[-\/]?\s*\d*[a-zA-Z]?)?$/,
    // Ej: "123 Calle Principal", "456 Av. Siempre Viva"
    /^\d+[a-zA-Z]?\s+[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.]+$/,
    // Ej: "Calle 123 #45-67", "Carrera 7 #45-23"
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s+\d+\s*#\s*\d+[-\s]?\d*[a-zA-Z]?$/,
    // Ej: "Avenida 9 de Julio 1234"
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.]+\d+[a-zA-Z]?\s*[a-zA-Z]*$/,
    // Ej: "Paseo del Prado, 12", "Calle Luna, 34 bis"
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.]+,\s*\d+[a-zA-Z]?(\s+[a-zA-Z]+)?$/
  ];
  
  // Al menos un patrón válido debe coincidir
  for (const pattern of validPatterns) {
    if (pattern.test(trimmedAddress)) {
      return true;
    }
  }
  
  // Verificación adicional: estructura básica de dirección
  const parts = trimmedAddress.split(/\s+/);
  let numberFound = false;
  let nameFound = false;
  
  for (const part of parts) {
    // Verificar si la parte contiene un número
    if (/\d/.test(part)) {
      numberFound = true;
    }
    // Verificar si la parte contiene principalmente letras (mínimo 2 caracteres)
    if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\.]{2,}$/.test(part)) {
      nameFound = true;
    }
  }
  
  // Debe tener al menos una parte con número y al menos una parte con nombre
  if (!numberFound || !nameFound) {
    return false;
  }
  
  // Verificar que no sea una secuencia sin sentido
  const wordCount = parts.filter(part => /[a-zA-ZáéíóúÁÉÍÓÚñÑ]{2,}/.test(part)).length;
  if (wordCount < 1) {
    return false;
  }
  
  // Validación final: formato general razonable
  const generalPattern = /^(?:[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.]+\s+\d+[a-zA-Z]?(?:\s*[-\/]\s*\d+[a-zA-Z]?)?|\d+[a-zA-Z]?\s+[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.]+)(?:\s*[,\/\-]\s*\d*[a-zA-Z]*)*$/;
  
  return generalPattern.test(trimmedAddress);
}
