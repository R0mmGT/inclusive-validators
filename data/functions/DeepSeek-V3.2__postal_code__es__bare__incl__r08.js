function validate(codigo) {
    // Validaciones básicas
    if (typeof codigo !== 'string' || codigo.trim() === '') {
        return false;
    }
    
    const codigoLimpio = codigo.trim();
    
    // Patrones de códigos postales por país
    const patrones = {
        // Estados Unidos: 5 dígitos o 5+4
        'US': /^\d{5}(-\d{4})?$/,
        // Canadá: A1A 1A1
        'CA': /^[A-Z]\d[A-Z] \d[A-Z]\d$/i,
        // Reino Unido: varias combinaciones
        'UK': /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
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
        // Japón: 7 dígitos
        'JP': /^\d{3}-\d{4}$|^\d{7}$/,
        // Brasil: 5 dígitos + - + 3 dígitos
        'BR': /^\d{5}-\d{3}$/,
        // México: 5 dígitos
        'MX': /^\d{5}$/,
        // Argentina: 4 dígitos o 4 dígitos con letra
        'AR': /^\d{4}$|^[A-Z]\d{4}[A-Z]{3}$/i,
        // China: 6 dígitos
        'CN': /^\d{6}$/,
        // India: 6 dígitos
        'IN': /^\d{6}$/,
        // Rusia: 6 dígitos
        'RU': /^\d{6}$/,
        // Sudáfrica: 4 dígitos
        'ZA': /^\d{4}$/,
        // Corea del Sur: 5 dígitos
        'KR': /^\d{5}$/,
        // Países Bajos: 4 dígitos + 2 letras
        'NL': /^\d{4} ?[A-Z]{2}$/i,
        // Suecia: 3 dígitos + espacio + 2 dígitos
        'SE': /^\d{3} ?\d{2}$/,
        // Noruega: 4 dígitos
        'NO': /^\d{4}$/,
        // Dinamarca: 4 dígitos
        'DK': /^\d{4}$/,
        // Finlandia: 5 dígitos
        'FI': /^\d{5}$/,
        // Portugal: 4 dígitos + - + 3 dígitos
        'PT': /^\d{4}-\d{3}$/,
        // Suiza: 4 dígitos
        'CH': /^\d{4}$/,
        // Austria: 4 dígitos
        'AT': /^\d{4}$/,
        // Bélgica: 4 dígitos
        'BE': /^\d{4}$/,
        // Irlanda: varias combinaciones
        'IE': /^[A-Z]\d{2} ?[A-Z\d]{4}$/i,
        // Nueva Zelanda: 4 dígitos
        'NZ': /^\d{4}$/,
        // Israel: 5 o 7 dígitos
        'IL': /^\d{5}$|^\d{7}$/,
        // Turquía: 5 dígitos
        'TR': /^\d{5}$/,
        // Polonia: 2 dígitos + - + 3 dígitos
        'PL': /^\d{2}-\d{3}$/,
        // República Checa: 3 dígitos + espacio + 2 dígitos
        'CZ': /^\d{3} ?\d{2}$/,
        // Eslovaquia: 3 dígitos + espacio + 2 dígitos
        'SK': /^\d{3} ?\d{2}$/,
        // Hungría: 4 dígitos
        'HU': /^\d{4}$/,
        // Grecia: 3 dígitos + espacio + 2 dígitos
        'GR': /^\d{3} ?\d{2}$/,
        // Bulgaria: 4 dígitos
        'BG': /^\d{4}$/,
        // Rumania: 6 dígitos
        'RO': /^\d{6}$/
    };
    
    // Patrón genérico para países no listados (más flexible)
    const patronGenerico = /^[A-Z0-9\s\-]{3,10}$/i;
    
    // Intentar coincidir con alguno de los patrones específicos
    for (const patron of Object.values(patrones)) {
        if (patron.test(codigoLimpio)) {
            return true;
        }
    }
    
    // Si no coincide con patrones específicos, probar con el genérico
    // pero con validaciones adicionales
    if (patronGenerico.test(codigoLimpio)) {
        // Verificar que tenga al menos un dígito (común en la mayoría de códigos postales)
        if (/\d/.test(codigoLimpio)) {
            // Verificar que no sea solo números repetidos (como 00000)
            if (/^0+$/.test(codigoLimpio.replace(/[^\d]/g, ''))) {
                return false;
            }
            return true;
        }
        // Permitir códigos sin dígitos solo si son específicos como UK antiguos
        // que pueden tener solo letras en ciertas partes
        return /^[A-Z]{2,}/i.test(codigoLimpio);
    }
    
    return false;
}
