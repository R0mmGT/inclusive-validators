function validate(addressLine) {
  // Validación básica de tipo y longitud
  if (typeof addressLine !== 'string') return false;
  
  const trimmed = addressLine.trim();
  if (trimmed.length === 0 || trimmed.length > 100) return false;
  
  // Patrones de validación
  const patterns = {
    // Formato básico: Número + Palabra(s) + Tipo de vía (opcional)
    basic: /^\d+\s+[a-zA-ZÀ-ÿ\s\.\-']+(?:\s+(st|street|ave|avenue|rd|road|blvd|boulevard|ln|lane|dr|drive|ct|court|pl|place))?$/i,
    
    // Formato: Tipo de vía + Nombre + Número
    european: /^(st|street|ave|avenue|rd|road|blvd|boulevard|ln|lane|dr|drive|ct|court|pl|place)\s+[a-zA-ZÀ-ÿ\s\.\-']+\s+\d+$/i,
    
    // Formato solo con nombre (sin número) pero con tipo de vía
    namedOnly: /^[a-zA-ZÀ-ÿ\s\.\-']+(?:\s+(st|street|ave|avenue|rd|road|blvd|boulevard|ln|lane|dr|drive|ct|court|pl|place))$/i,
    
    // Formato con apartado o apartamento
    withUnit: /^\d+\s+[a-zA-ZÀ-ÿ\s\.\-']+(?:\s+(?:apt|apartment|suite|unit|#)\s*\d*)?$/i,
    
    // Formato rural o con descripción
    rural: /^(?:rural route|rr|box|p\.?o\.?\s*box|hc)\s+\d+/i
  };
  
  // Verificar si coincide con alguno de los patrones
  for (const pattern of Object.values(patterns)) {
    if (pattern.test(trimmed)) return true;
  }
  
  // Validación adicional de estructura básica
  const words = trimmed.split(/\s+/).filter(word => word.length > 0);
  if (words.length < 2) return false;
  
  // Verificar que haya al menos una palabra no numérica
  const hasNonNumeric = words.some(word => /[a-zA-ZÀ-ÿ]/.test(word));
  if (!hasNonNumeric) return false;
  
  // Verificar que no tenga caracteres prohibidos
  const invalidChars = /[<>{}[\]\\|`~!@#$%^&*()_+=]/;
  if (invalidChars.test(trimmed)) return false;
  
  // Validación de estructura general (más permisiva)
  const generalPattern = /^[\w\s\.\-\,'À-ÿ]+$/i;
  if (!generalPattern.test(trimmed)) return false;
  
  return true;
}
