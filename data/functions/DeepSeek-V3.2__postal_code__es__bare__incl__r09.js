function validate(postalCode) {
    // Validación básica de tipo string no vacío
    if (typeof postalCode !== 'string' || postalCode.trim() === '') {
        return false;
    }
    
    const code = postalCode.trim();
    
    // Patrones específicos por país (lista no exhaustiva pero representativa)
    const patterns = {
        // Estados Unidos: 5 dígitos o 5+4
        US: /^\d{5}(-\d{4})?$/,
        // Canadá: A1A 1A1 o A1A1A1
        CA: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ][ ]?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i,
        // Reino Unido: Formato complejo con varias variantes
        UK: /^(GIR[ ]?0AA|(([A-Z][0-9]{1,2})|(([A-Z][A-HJ-Y][0-9]{1,2})|(([A-Z][0-9][A-Z])|([A-Z][A-HJ-Y][0-9]?[A-Z]))))[ ]?[0-9][A-Z]{2})$/i,
        // Alemania: 5 dígitos
        DE: /^\d{5}$/,
        // Francia: 5 dígitos
        FR: /^\d{5}$/,
        // España: 5 dígitos
        ES: /^\d{5}$/,
        // Italia: 5 dígitos
        IT: /^\d{5}$/,
        // Australia: 4 dígitos
        AU: /^\d{4}$/,
        // Japón: 3 dígitos - 4 dígitos
        JP: /^\d{3}-\d{4}$/,
        // Brasil: 5 dígitos - 3 dígitos
        BR: /^\d{5}-\d{3}$/,
        // India: 6 dígitos
        IN: /^\d{6}$/,
        // China: 6 dígitos
        CN: /^\d{6}$/,
        // México: 5 dígitos
        MX: /^\d{5}$/,
        // Argentina: 4 dígitos o 4 dígitos con letra
        AR: /^[A-Z]\d{4}[A-Z]{0,3}$|^\d{4}$/i,
        // Rusia: 6 dígitos
        RU: /^\d{6}$/,
        // Corea del Sur: 5 dígitos o 3 dígitos - 3 dígitos
        KR: /^\d{5}$|^\d{3}-\d{3}$/,
        // Holanda: 4 dígitos y 2 letras (1234 AB)
        NL: /^\d{4}[ ]?[A-Z]{2}$/i,
        // Suecia: 3 dígitos + espacio + 2 dígitos
        SE: /^\d{3}[ ]?\d{2}$/,
        // Suiza: 4 dígitos
        CH: /^\d{4}$/,
        // Portugal: 4 dígitos - 3 dígitos
        PT: /^\d{4}-\d{3}$/,
        // Dinamarca: 4 dígitos
        DK: /^\d{4}$/,
        // Finlandia: 5 dígitos
        FI: /^\d{5}$/,
        // Noruega: 4 dígitos
        NO: /^\d{4}$/,
        // Polonia: 2 dígitos - 3 dígitos
        PL: /^\d{2}-\d{3}$/,
        // República Checa: 3 dígitos + espacio + 2 dígitos
        CZ: /^\d{3}[ ]?\d{2}$/,
        // Austria: 4 dígitos
        AT: /^\d{4}$/,
        // Bélgica: 4 dígitos
        BE: /^\d{4}$/,
        // Nueva Zelanda: 4 dígitos
        NZ: /^\d{4}$/,
        // Sudáfrica: 4 dígitos
        ZA: /^\d{4}$/,
        // Turquía: 5 dígitos
        TR: /^\d{5}$/
    };
    
    // Patrones generales que cubren muchos casos
    const genericPatterns = [
        /^\d{4}$/,          // 4 dígitos
        /^\d{5}$/,          // 5 dígitos  
        /^\d{6}$/,          // 6 dígitos
        /^\d{3}-\d{4}$/,    // 3-4 dígitos
        /^\d{4}-\d{3}$/,    // 4-3 dígitos
        /^\d{5}-\d{4}$/,    // 5-4 dígitos
        /^\d{2}-\d{3}$/,    // 2-3 dígitos
        /^\d{3}\s\d{2}$/,   // 3 espacio 2 dígitos
        /^\d{4}\s\d{3}$/,   // 4 espacio 3 dígitos
        /^\d{4}\s[A-Z]{2}$/i // 4 dígitos espacio 2 letras
    ];
    
    // Probar primero patrones específicos
    for (const country in patterns) {
        if (patterns[country].test(code)) {
            return true;
        }
    }
    
    // Probar patrones genéricos
    for (const pattern of genericPatterns) {
        if (pattern.test(code)) {
            return true;
        }
    }
    
    // Validación adicional para códigos con letras y números mixtos
    // (como el formato canadiense sin espacio A1A1A1)
    if (/^[A-Z]\d[A-Z]\d[A-Z]\d$/i.test(code)) {
        return true;
    }
    
    // Formato con espacio en medio: A1A 1A1
    if (/^[A-Z]\d[A-Z]\s\d[A-Z]\d$/i.test(code)) {
        return true;
    }
    
    return false;
}
