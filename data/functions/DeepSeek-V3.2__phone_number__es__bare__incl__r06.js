function validate(phoneString) {
  if (typeof phoneString !== 'string') {
    return false;
  }
  
  const trimmed = phoneString.trim();
  
  if (trimmed.length < 4 || trimmed.length > 20) {
    return false;
  }
  
  // Patrones para validaciones comunes
  const patterns = [
    // Número con prefijo internacional (ej: +1-800-555-1234, +44 20 7946 0958)
    /^\+\d{1,4}[\s.-]?\(?\d{1,5}\)?[\s.-]?\d{1,5}[\s.-]?\d{1,5}[\s.-]?\d{1,5}$/,
    
    // Número internacional sin + pero con 00 (ej: 0044 20 7946 0958)
    /^00\d{1,4}[\s.-]?\(?\d{1,5}\)?[\s.-]?\d{1,5}[\s.-]?\d{1,5}[\s.-]?\d{1,5}$/,
    
    // Números con paréntesis para código de área (ej: (123) 456-7890, (020) 7946 0958)
    /^\(?\d{1,5}\)?[\s.-]?\d{1,5}[\s.-]?\d{1,5}[\s.-]?\d{0,5}$/,
    
    // Números solo con dígitos y espacios/puntos/guiones (ej: 123.456.7890, 123-456-7890)
    /^[\d\s.-]{4,20}$/,
    
    // Números con extensión (ej: +1-800-555-1234 ext. 5678)
    /^[\d+\s().-]{4,25}(?:\s*(?:ext|extension|ext\.|x)\s*\d{1,6})?$/i,
  ];
  
  // Verificar si coincide con algún patrón
  const matchesPattern = patterns.some(pattern => pattern.test(trimmed));
  
  if (!matchesPattern) {
    return false;
  }
  
  // Contar dígitos reales (excluyendo símbolos)
  const digitCount = (trimmed.match(/\d/g) || []).length;
  
  // Validar cantidad mínima y máxima de dígitos
  if (digitCount < 4 || digitCount > 15) {
    return false;
  }
  
  // Validaciones adicionales de estructura
  // 1. No puede comenzar con 0 a menos que sea un número internacional
  if (trimmed.startsWith('0') && !trimmed.startsWith('00') && !trimmed.startsWith('+')) {
    // Permitir ceros iniciales para números nacionales (común en muchos países)
    // Solo verificar que no sea solo ceros
    if (/^0+$/.test(trimmed.replace(/\D/g, ''))) {
      return false;
    }
  }
  
  // 2. No puede tener caracteres no permitidos
  const invalidChars = /[^\d+\s().-]/i.test(trimmed.replace(/\s*(?:ext|extension|ext\.|x)\s*\d{1,6}$/i, ''));
  if (invalidChars) {
    return false;
  }
  
  // 3. Validar paréntesis balanceados
  const openParen = (trimmed.match(/\(/g) || []).length;
  const closeParen = (trimmed.match(/\)/g) || []).length;
  if (openParen !== closeParen) {
    return false;
  }
  
  // 4. El símbolo + solo puede aparecer al inicio
  const plusCount = (trimmed.match(/\+/g) || []).length;
  if (plusCount > 1 || (plusCount === 1 && !trimmed.startsWith('+'))) {
    return false;
  }
  
  return true;
}
