function validate(phoneString) {
  if (typeof phoneString !== 'string') {
    return false;
  }
  
  // Eliminar espacios, guiones, paréntesis, puntos y el signo +
  let cleaned = phoneString.replace(/[\s\-().+]/g, '');
  
  // Casos especiales para números internacionales
  // Si empieza con 00 (formato internacional común), lo convertimos a +
  if (cleaned.startsWith('00')) {
    cleaned = '+' + cleaned.substring(2);
  }
  
  // Si contiene un +, lo preservamos para análisis internacional
  const hasPlus = cleaned.includes('+');
  
  // Eliminar todo excepto dígitos y + (si está al inicio)
  cleaned = cleaned.replace(hasPlus ? /[^\d+]/g : /[^\d]/g, '');
  
  // Verificar longitud mínima (número más corto conocido es de 4 dígitos, ej: 911)
  if (cleaned.replace('+', '').length < 4) {
    return false;
  }
  
  // Verificar longitud máxima (incluyendo código de país de hasta 4 dígitos y número local de hasta 15)
  if (cleaned.replace('+', '').length > 19) {
    return false;
  }
  
  // Si hay un +, debe estar solo al inicio
  if (hasPlus && !cleaned.startsWith('+')) {
    return false;
  }
  
  // Si hay un +, lo que sigue deben ser solo dígitos
  if (hasPlus && !/^\+\d+$/.test(cleaned)) {
    return false;
  }
  
  // Si no hay +, debe contener solo dígitos
  if (!hasPlus && !/^\d+$/.test(cleaned)) {
    return false;
  }
  
  // Análisis de estructura básica sin ser demasiado restrictivo
  
  // Para números con formato internacional (+XX...)
  if (hasPlus) {
    const withoutPlus = cleaned.substring(1);
    
    // Código de país debe ser de 1-4 dígitos
    const countryCode = withoutPlus.match(/^\d{1,4}/)?.[0];
    if (!countryCode) {
      return false;
    }
    
    // Número local debe tener al menos 4 dígitos
    const localNumber = withoutPlus.substring(countryCode.length);
    if (localNumber.length < 4) {
      return false;
    }
  } else {
    // Para números sin formato internacional
    // Deben tener entre 4 y 15 dígitos (longitudes típicas nacionales)
    if (cleaned.length < 4 || cleaned.length > 15) {
      return false;
    }
  }
  
  // Verificar que no sea solo ceros o secuencias repetidas
  if (/^(\+)?0+$/.test(cleaned) || /^(\+)?(\d)\2{5,}$/.test(cleaned)) {
    return false;
  }
  
  // Verificación de códigos de país conocidos (lista parcial pero representativa)
  if (hasPlus) {
    const countryCode = cleaned.substring(1).match(/^\d{1,3}/)?.[0];
    const validCountryCodes = [
      '1', '7', '20', '27', '30', '31', '32', '33', '34', '36', '39', '40', '41', '43', 
      '44', '45', '46', '47', '48', '49', '51', '52', '53', '54', '55', '56', '57', '58', 
      '60', '61', '62', '63', '64', '65', '66', '81', '82', '84', '86', '90', '91', '92', 
      '93', '94', '95', '98', '212', '213', '216', '218', '220', '221', '222', '223', 
      '224', '225', '226', '227', '228', '229', '230', '231', '232', '233', '234', '235', 
      '236', '237', '238', '239', '240', '241', '242', '243', '244', '245', '246', '247', 
      '248', '249', '250', '251', '252', '253', '254', '255', '256', '257', '258', '260', 
      '261', '262', '263', '264', '265', '266', '267', '268', '269', '290', '291', '297', 
      '298', '299', '350', '351', '352', '353', '354', '355', '356', '357', '358', '359', 
      '370', '371', '372', '373', '374', '375', '376', '377', '378', '379', '380', '381', 
      '382', '383', '385', '386', '387', '389', '420', '421', '423', '500', '501', '502', 
      '503', '504', '505', '506', '507', '508', '509', '590', '591', '592', '593', '594', 
      '595', '596', '597', '598', '599', '670', '672', '673', '674', '675', '676', '677', 
      '678', '679', '680', '681', '682', '683', '685', '686', '687', '688', '689', '690', 
      '691', '692', '850', '852', '853', '855', '856', '880', '886', '960', '961', '962', 
      '963', '964', '965', '966', '967', '968', '970', '971', '972', '973', '974', '975', 
      '976', '977', '992', '993', '994', '995', '996', '998'
    ];
    
    if (countryCode && !validCountryCodes.includes(countryCode)) {
      return false;
    }
  }
  
  return true;
}
