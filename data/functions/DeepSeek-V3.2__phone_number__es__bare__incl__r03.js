function validate(phoneNumber) {
    // Eliminar espacios, guiones, paréntesis, puntos y el signo +
    const cleaned = phoneNumber.replace(/[\s\-().+]/g, '');
    
    // Verificar que solo contenga dígitos después de la limpieza
    if (!/^\d+$/.test(cleaned)) {
        return false;
    }
    
    // Longitudes mínimas y máximas globales basadas en estándares internacionales
    // E.164 establece un máximo de 15 dígitos (sin incluir el prefijo +)
    // Mínimo realista considerando países con números cortos (ej: 6-7 dígitos)
    if (cleaned.length < 6 || cleaned.length > 15) {
        return false;
    }
    
    // Validar estructura básica internacional
    // 1. No debe empezar con 0 (excepto si es un número local, pero para validación internacional no es válido)
    // 2. Los primeros dígitos deben ser un código de país válido (1-3 dígitos)
    // 3. El resto debe ser el número nacional
    
    // Extraer el posible código de país (primeros 1-3 dígitos)
    // Los códigos de país pueden ser 1-3 dígitos según ITU-T E.164
    const possibleCountryCode = cleaned.length >= 7 ? 
        cleaned.substring(0, 3) : 
        cleaned.length >= 6 ? 
            cleaned.substring(0, 2) : 
            cleaned.substring(0, 1);
    
    // Convertir a número para validaciones
    const countryCode = parseInt(possibleCountryCode, 10);
    
    // Verificar códigos de país conocidos (rango 1-999)
    if (countryCode < 1 || countryCode > 999) {
        return false;
    }
    
    // Verificar que después del código de país haya al menos 4 dígitos
    // (longitud mínima para números nacionales según estándares)
    const nationalNumber = cleaned.substring(possibleCountryCode.length);
    if (nationalNumber.length < 4) {
        return false;
    }
    
    // Validaciones específicas para códigos de país comunes
    // Código de país 1 (NANPA): 10 dígitos después del código (total 11)
    if (countryCode === 1 && cleaned.length !== 11) {
        return false;
    }
    
    // Códigos de país con longitudes específicas conocidas
    // Esta es una lista parcial de ejemplos
    const countryLengths = {
        1: 11,     // USA/Canada: +1 NXX NXX XXXX (11 dígitos)
        7: 11,     // Rusia/Kazajistán: +7 XXX XXX XX XX (11 dígitos)
        20: 12,    // Egipto: +20 XX XXXX XXXX (12 dígitos)
        27: 11,    // Sudáfrica: +27 XX XXX XXXX (11 dígitos)
        30: 12,    // Grecia: +30 XXX XXX XXXX (12 dígitos)
        31: 11,    // Países Bajos: +31 XX XXX XXXX (11 dígitos)
        32: 11,    // Bélgica: +32 XXX XX XX XX (11 dígitos)
        33: 11,    // Francia: +33 X XX XX XX XX (11 dígitos)
        34: 11,    // España: +34 XXX XXX XXX (11 dígitos)
        39: 12,    // Italia: +39 XXX XXX XXXX (12 dígitos)
        44: 12,    // Reino Unido: +44 XX XXXX XXXX (12 dígitos)
        49: 13,    // Alemania: +49 XXX XXXX XXXX (13 dígitos)
        55: 13,    // Brasil: +55 XX XXXX XXXX (13 dígitos)
        61: 11,    // Australia: +61 X XXXX XXXX (11 dígitos)
        81: 13,    // Japón: +81 XX XXXX XXXX (13 dígitos)
        86: 13,    // China: +86 XXX XXXX XXXX (13 dígitos)
        91: 12     // India: +91 XXXX XXX XXX (12 dígitos)
    };
    
    // Si conocemos la longitud específica para este código de país, validarla
    if (countryLengths[countryCode] && cleaned.length !== countryLengths[countryCode]) {
        // Intentar con versiones más cortas del código de país
        if (possibleCountryCode.length > 1) {
            const shorterCountryCode = parseInt(possibleCountryCode.substring(0, possibleCountryCode.length - 1), 10);
            if (countryLengths[shorterCountryCode] && cleaned.length !== countryLengths[shorterCountryCode]) {
                return false;
            }
        } else {
            return false;
        }
    }
    
    // Validar que el primer dígito del número nacional no sea 0 (en la mayoría de países)
    if (nationalNumber.charAt(0) === '0') {
        return false;
    }
    
    // Validación de formato general: no más de 15 dígitos total (estándar E.164)
    if (cleaned.length > 15) {
        return false;
    }
    
    // Validación de secuencias repetidas (ej: 1111111)
    if (/(\d)\1{9,}/.test(cleaned)) {
        return false; // Más de 10 dígitos idénticos seguidos
    }
    
    // Si pasó todas las validaciones
    return true;
}
