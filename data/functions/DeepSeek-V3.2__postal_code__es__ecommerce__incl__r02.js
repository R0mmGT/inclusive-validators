function validate(postalCode) {
    // Verificar que sea string
    if (typeof postalCode !== 'string') return false;
    
    // Eliminar espacios al inicio y final
    const trimmedCode = postalCode.trim();
    
    // Verificar que no esté vacío después de trim
    if (trimmedCode === '') return false;
    
    // Patrones de códigos postales por país/región
    const patterns = {
        // Estados Unidos: 5 dígitos o 5+4 con guión
        'US': /^\d{5}(-\d{4})?$/,
        // Canadá: A1A 1A1 o A1A1A1
        'CA': /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]\s?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i,
        // Reino Unido: múltiples formatos
        'UK': /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i,
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
        // Países Bajos: 4 dígitos + 2 letras
        'NL': /^\d{4}\s?[A-Z]{2}$/i,
        // Brasil: 5 dígitos + guión + 3 dígitos
        'BR': /^\d{5}-\d{3}$/,
        // Argentina: 4 dígitos a veces con letra
        'AR': /^[A-Z]\d{4}[A-Z]{3}$|^\d{4}$/i,
        // México: 5 dígitos
        'MX': /^\d{5}$/,
        // India: 6 dígitos
        'IN': /^\d{6}$/,
        // China: 6 dígitos
        'CN': /^\d{6}$/,
        // Japón: 7 dígitos
        'JP': /^\d{3}-\d{4}$|^\d{7}$/,
        // Corea del Sur: 5 dígitos o 5-3
        'KR': /^\d{5}$|^\d{3}-\d{3}$/,
        // Rusia: 6 dígitos
        'RU': /^\d{6}$/,
        // Suecia: 3 dígitos + espacio + 2 dígitos
        'SE': /^\d{3}\s?\d{2}$/,
        // Suiza: 4 dígitos
        'CH': /^\d{4}$/,
        // Nueva Zelanda: 4 dígitos
        'NZ': /^\d{4}$/,
        // Sudáfrica: 4 dígitos
        'ZA': /^\d{4}$/,
        // Polonia: 2 dígitos + guión + 3 dígitos
        'PL': /^\d{2}-\d{3}$/,
        // Portugal: 4 dígitos + guión + 3 dígitos
        'PT': /^\d{4}-\d{3}$/,
        // Irlanda: formato complejo
        'IE': /^[A-Z]\d[\dW]\s?\d[A-Z]{2}$/i,
        // Dinamarca: 4 dígitos
        'DK': /^\d{4}$/,
        // Finlandia: 5 dígitos
        'FI': /^\d{5}$/,
        // Noruega: 4 dígitos
        'NO': /^\d{4}$/,
        // Austria: 4 dígitos
        'AT': /^\d{4}$/,
        // Bélgica: 4 dígitos
        'BE': /^\d{4}$/,
        // Chile: 7 dígitos
        'CL': /^\d{7}$/,
        // Colombia: 6 dígitos
        'CO': /^\d{6}$/,
        // Perú: 5 dígitos
        'PE': /^\d{5}$/,
        // Venezuela: 4 dígitos
        'VE': /^\d{4}$/,
        // Filipinas: 4 dígitos
        'PH': /^\d{4}$/,
        // Tailandia: 5 dígitos
        'TH': /^\d{5}$/,
        // Vietnam: 6 dígitos
        'VN': /^\d{6}$/,
        // Malasia: 5 dígitos
        'MY': /^\d{5}$/,
        // Singapur: 6 dígitos
        'SG': /^\d{6}$/,
        // Indonesia: 5 dígitos
        'ID': /^\d{5}$/,
        // Israel: 7 dígitos
        'IL': /^\d{5}$|^\d{7}$/,
        // Turquía: 5 dígitos
        'TR': /^\d{5}$/,
        // Egipto: 5 dígitos
        'EG': /^\d{5}$/,
        // Arabia Saudita: 5 dígitos
        'SA': /^\d{5}$/,
        // Emiratos Árabes: sin código postal oficial
        'AE': /^$/, // Vacío es válido
        // Qatar: sin código postal oficial
        'QA': /^$/,
        // Kuwait: sin código postal oficial
        'KW': /^$/,
        // Omán: 3 dígitos
        'OM': /^\d{3}$/,
        // Baréin: 3 dígitos
        'BH': /^\d{3}$/,
    };
    
    // Patrones generales que cubren múltiples formatos comunes
    const generalPatterns = [
        /^\d{4}$/, // 4 dígitos
        /^\d{5}$/, // 5 dígitos
        /^\d{6}$/, // 6 dígitos
        /^\d{3}-\d{4}$/, // 3-4 dígitos con guión
        /^\d{2}-\d{3}$/, // 2-3 dígitos con guión
        /^\d{4}-\d{3}$/, // 4-3 dígitos con guión
        /^\d{5}-\d{3}$/, // 5-3 dígitos con guión
        /^\d{5}-\d{4}$/, // 5-4 dígitos con guión
        /^[A-Z0-9]{3,10}$/i, // Código alfanumérico (para países sin patrón específico)
    ];
    
    // Verificar contra todos los patrones específicos por país
    for (const pattern of Object.values(patterns)) {
        if (pattern.test(trimmedCode)) {
            return true;
        }
    }
    
    // Verificar contra patrones generales
    for (const pattern of generalPatterns) {
        if (pattern.test(trimmedCode)) {
            return true;
        }
    }
    
    // Permitir códigos alfanuméricos de longitud razonable
    const alphanumericPattern = /^[A-Z0-9\s\-]{3,10}$/i;
    if (alphanumericPattern.test(trimmedCode)) {
        // Verificar que no sea solo espacios o guiones
        const hasLettersOrDigits = /[A-Z0-9]/i.test(trimmedCode);
        return hasLettersOrDigits;
    }
    
    return false;
}
