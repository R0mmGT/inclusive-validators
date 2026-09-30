function validate(phoneString) {
  // Eliminar espacios, guiones, paréntesis, puntos y el signo +
  const cleaned = phoneString.replace(/[\s\-().+]/g, '');
  
  // Verificar que solo queden dígitos después de limpiar
  if (!/^\d+$/.test(cleaned)) {
    return false;
  }
  
  // Longitud mínima y máxima típica de números telefónicos internacionales
  // Según ITU-T E.164: mínimo 4, máximo 15 dígitos (sin incluir el prefijo +)
  const length = cleaned.length;
  if (length < 4 || length > 15) {
    return false;
  }
  
  // Verificar que no comience con 0 (excepto si es el código de país, pero eso ya se eliminó)
  // En formato internacional, no debería comenzar con 0 después del +
  if (cleaned.startsWith('0')) {
    return false;
  }
  
  // Validar estructura básica según convenciones internacionales
  // 1. Código de país: 1-3 dígitos (los más comunes: 1, 7, 20-299, 30-39, 40-49, etc.)
  // 2. Número local: el resto
  
  // Extraer posibles códigos de país
  const countryCodeTests = [
    cleaned.startsWith('1'),  // Norteamérica, Caribe
    cleaned.startsWith('7'),  // Rusia, Kazajistán
    cleaned.match(/^2[0-9]/),  // África
    cleaned.match(/^3[0-9]/),  // Europa
    cleaned.match(/^4[0-9]/),  // Europa
    cleaned.match(/^5[0-9]/),  // México, Centro/Sudamérica
    cleaned.match(/^6[0-9]/),  // Sudeste Asiático
    cleaned.match(/^8[0-9]/),  // Asia Oriental/Pacífico
    cleaned.match(/^9[0-9]/),  // Asia Central/Sur
  ];
  
  // Verificar que al menos un patrón de código de país coincida
  const hasValidCountryCode = countryCodeTests.some(test => test);
  if (!hasValidCountryCode) {
    return false;
  }
  
  // Validaciones adicionales para casos específicos
  if (cleaned.startsWith('1')) {
    // Norteamérica: formato 1 + código área (3 dígitos) + número (7 dígitos)
    if (length !== 11) {
      return false;
    }
    // Código de área no puede comenzar con 0 o 1
    if (cleaned.charAt(1) === '0' || cleaned.charAt(1) === '1') {
      return false;
    }
  }
  
  // Validar dígitos repetidos excesivamente (posible número inválido)
  const repeatedDigits = cleaned.match(/(\d)\1{5,}/); // 6 o más dígitos iguales seguidos
  if (repeatedDigits) {
    return false;
  }
  
  // Validar secuencias muy ordenadas (123456, 654321, etc.)
  const isSequential = (str) => {
    let ascending = true;
    let descending = true;
    for (let i = 1; i < str.length; i++) {
      if (parseInt(str[i]) !== parseInt(str[i-1]) + 1) {
        ascending = false;
      }
      if (parseInt(str[i]) !== parseInt(str[i-1]) - 1) {
        descending = false;
      }
    }
    return ascending || descending;
  };
  
  if (isSequential(cleaned) && cleaned.length >= 6) {
    return false;
  }
  
  return true;
}
