function validate(phone) {
  // Eliminar espacios en blanco al principio y al final
  phone = phone.trim();
  
  // Patrón principal para números de teléfono válidos
  // Acepta:
  // - 9 dígitos consecutivos (ej: 123456789)
  // - Formato con guiones (ej: 123-456-789)
  // - Formato con espacios (ej: 123 456 789)
  // - Formato con puntos (ej: 123.456.789)
  // - Con prefijo opcional +34 o 34 (ej: +34 123456789, 34 123456789)
  const phonePattern = /^(\+34\s?|34\s?)?(\d{9}|(\d{3}[\s.-]\d{3}[\s.-]\d{3}|\d{2}[\s.-]\d{3}[\s.-]\d{4}))$/;
  
  if (!phonePattern.test(phone)) {
    return false;
  }
  
  // Eliminar todos los caracteres no numéricos para verificar la longitud
  const digitsOnly = phone.replace(/\D/g, '');
  
  // La longitud debe ser 9 (sin prefijo) o 11 (con prefijo 34)
  if (digitsOnly.length !== 9 && digitsOnly.length !== 11) {
    return false;
  }
  
  // Si tiene 11 dígitos, verificar que empiece con 34
  if (digitsOnly.length === 11 && !digitsOnly.startsWith('34')) {
    return false;
  }
  
  // Extraer los últimos 9 dígitos (el número real)
  const actualNumber = digitsOnly.length === 11 ? digitsOnly.substring(2) : digitsOnly;
  
  // Verificar que el primer dígito sea válido (6, 7, 8 o 9 para móviles, 9 para fijos)
  const validFirstDigits = ['6', '7', '8', '9'];
  if (!validFirstDigits.includes(actualNumber.charAt(0))) {
    return false;
  }
  
  return true;
}
