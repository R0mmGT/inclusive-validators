function validate(phone) {
  // Verificar que el argumento sea un string
  if (typeof phone !== 'string') {
    return false;
  }
  
  // Eliminar espacios en blanco al inicio y final
  phone = phone.trim();
  
  // Patrón para validar números de teléfono españoles
  // Formatos aceptados:
  // - 612345678 (9 dígitos, empezando por 6, 7 o 9)
  // - +34 612345678
  // - 0034 612345678
  // - 612 345 678
  // - 612-345-678
  // - (34) 612345678
  
  // Expresión regular que cubre los formatos comunes
  const phoneRegex = /^(?:(?:\+34|0034|34)?[ -]?)?(?:[67]\d{2}|9[1-9]\d)[ -]?\d{2}[ -]?\d{2}[ -]?\d{2}$/;
  
  // También aceptar formato con paréntesis para el código de país
  const phoneRegexWithParentheses = /^\((?:34|0034)\)[ -]?(?:[67]\d{2}|9[1-9]\d)[ -]?\d{2}[ -]?\d{2}[ -]?\d{2}$/;
  
  // Validar contra ambos patrones
  if (phoneRegex.test(phone) || phoneRegexWithParentheses.test(phone)) {
    // Extraer solo los dígitos para validación adicional
    const digitsOnly = phone.replace(/\D/g, '');
    
    // Validar que tenga la longitud correcta (9 dígitos para España)
    if (digitsOnly.length === 9) {
      // El primer dígito debe ser 6, 7 o 9 para móviles y algunos fijos
      const firstDigit = digitsOnly.charAt(0);
      return ['6', '7', '9'].includes(firstDigit);
    } 
    // Si incluye código de país (+34, 0034, etc.)
    else if (digitsOnly.length === 11 && digitsOnly.startsWith('34')) {
      const mobileDigit = digitsOnly.charAt(2);
      return ['6', '7', '9'].includes(mobileDigit);
    }
    // Si incluye código de país con 00 (0034)
    else if (digitsOnly.length === 13 && digitsOnly.startsWith('0034')) {
      const mobileDigit = digitsOnly.charAt(4);
      return ['6', '7', '9'].includes(mobileDigit);
    }
  }
  
  return false;
}
