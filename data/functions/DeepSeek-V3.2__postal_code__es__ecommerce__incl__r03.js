function validate(postalCode) {
  // Verificar que el argumento sea un string
  if (typeof postalCode !== 'string') {
    return false;
  }
  
  // Eliminar espacios en blanco al principio y al final
  const trimmedCode = postalCode.trim();
  
  // Un código postal no puede estar vacío después del trim
  if (trimmedCode.length === 0) {
    return false;
  }
  
  // Patrones específicos por país (incompleto pero con ejemplos representativos)
  const countryPatterns = {
    // Estados Unidos: 5 dígitos o 5+4
    'US': /^\d{5}(-\d{4})?$/,
    
    // Canadá: A1A 1A1 (alternando letra, número, letra, espacio, número, letra, número)
    'CA': /^[A-Z]\d[A-Z] \d[A-Z]\d$/i,
    
    // Reino Unido: Formato complejo con múltiples patrones
    'UK': /^(GIR\s?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|[A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))|[0-9][A-HJKS-UW])\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i,
    
    // Alemania: 5 dígitos
    'DE': /^\d{5}$/,
    
    // Francia: 5 dígitos
    'FR': /^\d{5}$/,
    
    // España: 5 dígitos
    'ES': /^\d{5}$/,
    
    // Italia: 5 dígitos
    'IT': /^\d{5}$/,
    
    // Australia: 4 dígitos
    'AU': /^\d{4}$/,
    
    // Japón: 3 dígitos, guión, 4 dígitos
    'JP': /^\d{3}-\d{4}$/,
    
    // Brasil: 5 dígitos, guión opcional, 3 dígitos
    'BR': /^\d{5}-?\d{3}$/,
    
    // Argentina: 4 dígitos, a veces con letra
    'AR': /^[A-Z]?\d{4}[A-Z]{0,3}$/i,
    
    // México: 5 dígitos
    'MX': /^\d{5}$/,
    
    // China: 6 dígitos
    'CN': /^\d{6}$/,
    
    // India: 6 dígitos
    'IN': /^\d{6}$/,
    
    // Rusia: 6 dígitos
    'RU': /^\d{6}$/,
  };
  
  // Verificar contra todos los patrones
  for (const pattern of Object.values(countryPatterns)) {
    if (pattern.test(trimmedCode)) {
      return true;
    }
  }
  
  // Patrones genéricos para cubrir más casos
  const genericPatterns = [
    // 4-5 dígitos (común en muchos países)
    /^\d{4,5}$/,
    
    // 6 dígitos (común en muchos países)
    /^\d{6}$/,
    
    // Formato con letras y números, sin caracteres especiales prohibidos
    /^[A-Z0-9\s\-]{3,10}$/i,
    
    // Formato que incluye dígitos y letras, longitud razonable
    /^[A-Z0-9]{3,8}$/i,
    
    // Formato con dígitos y posible guión
    /^\d{3,6}[-\s]?\d{2,4}$/,
  ];
  
  // Verificar patrones genéricos
  for (const pattern of genericPatterns) {
    if (pattern.test(trimmedCode)) {
      return true;
    }
  }
  
  // Validación de sentido común
  // 1. Debe contener al menos algunos caracteres alfanuméricos
  if (!/[A-Z0-9]/i.test(trimmedCode)) {
    return false;
  }
  
  // 2. Longitud razonable para un código postal (3-10 caracteres)
  if (trimmedCode.length < 3 || trimmedCode.length > 10) {
    return false;
  }
  
  // 3. Solo permite caracteres alfanuméricos, espacios y guiones
  if (!/^[A-Z0-9\s\-]+$/i.test(trimmedCode)) {
    return false;
  }
  
  // 4. No puede consistir solo en espacios o guiones
  if (/^[\s\-]+$/.test(trimmedCode)) {
    return false;
  }
  
  // 5. Debe contener al menos un dígito (la mayoría de códigos postales tienen números)
  if (!/\d/.test(trimmedCode)) {
    // Algunos códigos postales como los británicos pueden no tener números
    // en ciertas posiciones, pero es raro que no tengan ninguno
    // Permitimos excepciones solo si tiene formato razonable
    if (!/^[A-Z]{2,}\s*[A-Z]{2,}$/i.test(trimmedCode)) {
      return false;
    }
  }
  
  return true;
}
