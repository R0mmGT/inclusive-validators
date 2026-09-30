function validate(postalCode) {
  // Validación básica: debe ser string y no vacío
  if (typeof postalCode !== 'string' || postalCode.trim() === '') {
    return false;
  }
  
  const code = postalCode.trim();
  
  // Patrones de códigos postales por país
  const patterns = {
    // Estados Unidos: 5 dígitos, opcionalmente seguido de guión y 4 dígitos
    'US': /^\d{5}(-\d{4})?$/,
    
    // Canadá: A1A 1A1 (alterna letra-número-letra espacio número-letra-número)
    'CA': /^[A-Z]\d[A-Z] \d[A-Z]\d$/i,
    
    // Reino Unido: Formato complejo, múltiples patrones
    'UK': /^(GIR\s?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|[A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))|[0-9][A-HJKS-UW])\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i,
    
    // Australia: 4 dígitos
    'AU': /^\d{4}$/,
    
    // Alemania: 5 dígitos
    'DE': /^\d{5}$/,
    
    // Francia: 5 dígitos
    'FR': /^\d{5}$/,
    
    // España: 5 dígitos
    'ES': /^\d{5}$/,
    
    // Italia: 5 dígitos
    'IT': /^\d{5}$/,
    
    // Japón: 3 dígitos, guión, 4 dígitos
    'JP': /^\d{3}-\d{4}$/,
    
    // Brasil: 5 dígitos, guión, 3 dígitos
    'BR': /^\d{5}-\d{3}$/,
    
    // México: 5 dígitos
    'MX': /^\d{5}$/,
    
    // Argentina: 4 dígitos, guión, 3 dígitos o solo 4 dígitos
    'AR': /^\d{4}$|^\d{4}-\d{3}$/,
    
    // China: 6 dígitos
    'CN': /^\d{6}$/,
    
    // India: 6 dígitos
    'IN': /^\d{6}$/,
    
    // Rusia: 6 dígitos
    'RU': /^\d{6}$/,
    
    // Corea del Sur: 5 dígitos
    'KR': /^\d{5}$/,
    
    // Suiza: 4 dígitos
    'CH': /^\d{4}$/,
    
    // Países Bajos: 4 dígitos, 2 letras (sin vocales para evitar palabras)
    'NL': /^\d{4}\s?[A-Z]{2}$/i,
    
    // Suecia: 3 dígitos, espacio, 2 dígitos
    'SE': /^\d{3}\s\d{2}$/,
    
    // Dinamarca: 4 dígitos
    'DK': /^\d{4}$/,
    
    // Noruega: 4 dígitos
    'NO': /^\d{4}$/,
    
    // Finlandia: 5 dígitos
    'FI': /^\d{5}$/,
    
    // Polonia: 2 dígitos, guión, 3 dígitos
    'PL': /^\d{2}-\d{3}$/,
    
    // Portugal: 4 dígitos, guión, 3 dígitos
    'PT': /^\d{4}-\d{3}$/,
    
    // Irlanda: Formato complejo, similar al Reino Unido pero simplificado
    'IE': /^[A-Z]\d{2}\s?[A-Z0-9]{4}$/i,
    
    // Nueva Zelanda: 4 dígitos
    'NZ': /^\d{4}$/,
    
    // Sudáfrica: 4 dígitos
    'ZA': /^\d{4}$/,
    
    // Turquía: 5 dígitos
    'TR': /^\d{5}$/,
    
    // Austria: 4 dígitos
    'AT': /^\d{4}$/,
    
    // Bélgica: 4 dígitos
    'BE': /^\d{4}$/,
    
    // Grecia: 3 dígitos, espacio, 2 dígitos
    'GR': /^\d{3}\s\d{2}$/,
    
    // República Checa: 3 dígitos, espacio, 2 dígitos
    'CZ': /^\d{3}\s\d{2}$/,
    
    // Eslovaquia: 3 dígitos, espacio, 2 dígitos
    'SK': /^\d{3}\s\d{2}$/,
    
    // Hungría: 4 dígitos
    'HU': /^\d{4}$/,
    
    // Rumania: 6 dígitos
    'RO': /^\d{6}$/,
    
    // Bulgaria: 4 dígitos
    'BG': /^\d{4}$/,
    
    // Ucrania: 5 dígitos
    'UA': /^\d{5}$/,
    
    // Israel: 5 o 7 dígitos
    'IL': /^\d{5}$|^\d{7}$/,
    
    // Arabia Saudita: 5 dígitos, guión, 4 dígitos (opcional)
    'SA': /^\d{5}(-\d{4})?$/,
    
    // Emiratos Árabes Unidos: no tiene código postal
    'AE': /^$/,
    
    // Qatar: no tiene código postal
    'QA': /^$/,
    
    // Kuwait: no tiene código postal
    'KW': /^$/,
  };
  
  // Comprobar todos los patrones
  for (const country in patterns) {
    if (patterns[country].test(code)) {
      // Validación adicional para países sin código postal
      if (country === 'AE' || country === 'QA' || country === 'KW') {
        return code === ''; // Solo válido si está vacío para estos países
      }
      return true;
    }
  }
  
  // Patrones genéricos para cubrir más casos
  const genericPatterns = [
    /^\d{3,10}$/, // Solo dígitos (3 a 10 dígitos)
    /^\d{3,6}[-\s]\d{3,6}$/, // Dígitos con separador
    /^[A-Z0-9]{3,10}$/i, // Caracteres alfanuméricos
    /^[A-Z0-9]{3,6}[-\s][A-Z0-9]{3,6}$/i, // Alfanumérico con separador
  ];
  
  // Comprobar patrones genéricos
  for (const pattern of genericPatterns) {
    if (pattern.test(code)) {
      return true;
    }
  }
  
  // Para países sin códigos postales (vacío es válido)
  if (code === '') {
    return true;
  }
  
  return false;
}
