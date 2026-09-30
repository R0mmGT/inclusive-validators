function validate(phoneNumber) {
    if (typeof phoneNumber !== 'string') {
        return false;
    }
    
    // Eliminar espacios, guiones, puntos, paréntesis y el símbolo +
    const cleaned = phoneNumber.replace(/[\s\-\.()]/g, '');
    
    // Si empieza con +, lo mantenemos para indicar código internacional
    const hasPlus = cleaned.startsWith('+');
    const digitsOnly = hasPlus ? cleaned.substring(1) : cleaned;
    
    // Verificar que solo contenga dígitos después de eliminar el +
    if (!/^\d+$/.test(digitsOnly)) {
        return false;
    }
    
    // Longitud mínima y máxima global razonable
    // Mínimo: 4 dígitos (ej. algunos servicios cortos)
    // Máximo: 15 dígitos (recomendación ITU E.164)
    if (digitsOnly.length < 4 || digitsOnly.length > 15) {
        return false;
    }
    
    // Validaciones adicionales por región
    if (hasPlus) {
        // Validar código de país (1-3 dígitos según ITU)
        const countryCodeMatch = digitsOnly.match(/^(\d{1,3})(\d+)$/);
        if (!countryCodeMatch) {
            return false;
        }
        
        const countryCode = countryCodeMatch[1];
        const localNumber = countryCodeMatch[2];
        
        // Algunas validaciones básicas de códigos de país conocidos
        const countryCodeLengths = {
            '1': 10,  // NANPA (USA, Canadá, etc.)
            '7': 10,  // Rusia, Kazajistán
            '20': 10, // Egipto
            '27': 9,  // Sudáfrica
            '30': 10, // Grecia
            '31': 9,  // Países Bajos
            '32': 9,  // Bélgica
            '33': 9,  // Francia
            '34': 9,  // España
            '39': 10, // Italia
            '40': 9,  // Rumanía
            '41': 9,  // Suiza
            '43': 10, // Austria
            '44': 10, // Reino Unido
            '45': 8,  // Dinamarca
            '46': 9,  // Suecia
            '47': 8,  // Noruega
            '48': 9,  // Polonia
            '49': 10, // Alemania
            '51': 9,  // Perú
            '52': 10, // México
            '54': 10, // Argentina
            '55': 10, // Brasil
            '56': 9,  // Chile
            '57': 10, // Colombia
            '58': 10, // Venezuela
            '60': 9,  // Malasia
            '61': 9,  // Australia
            '62': 11, // Indonesia
            '63': 10, // Filipinas
            '64': 9,  // Nueva Zelanda
            '65': 8,  // Singapur
            '66': 9,  // Tailandia
            '81': 10, // Japón
            '82': 10, // Corea del Sur
            '84': 10, // Vietnam
            '86': 11, // China
            '90': 10, // Turquía
            '91': 10, // India
            '92': 10, // Pakistán
            '93': 9,  // Afganistán
            '94': 9,  // Sri Lanka
            '95': 9,  // Myanmar
            '98': 10, // Irán
        };
        
        if (countryCodeLengths[countryCode]) {
            return localNumber.length === countryCodeLengths[countryCode];
        }
        
        // Para códigos de país no listados, validar longitud razonable
        return localNumber.length >= 4 && localNumber.length <= 14;
    } else {
        // Sin código de país: validar como número local
        // Verificar que no empiece con 0 (a menos que sea válido localmente)
        // En muchos países, los números locales pueden empezar con 0
        if (digitsOnly.startsWith('0')) {
            return digitsOnly.length >= 5 && digitsOnly.length <= 13;
        }
        return digitsOnly.length >= 4 && digitsOnly.length <= 15;
    }
}
