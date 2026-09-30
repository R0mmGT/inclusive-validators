function validate(postalCode) {
    // Validación básica de tipo y existencia
    if (typeof postalCode !== 'string' || !postalCode.trim()) {
        return false;
    }
    
    // Limpiar espacios en blanco al inicio/final
    const code = postalCode.trim();
    
    // Patrones de códigos postales por país/región
    const patterns = {
        // Estados Unidos: 5 dígitos o 5+4 con guión
        US: /^\d{5}(-\d{4})?$/,
        // Canadá: A1A 1A1 (alterna letra-número)
        CA: /^[A-Z]\d[A-Z] \d[A-Z]\d$/i,
        // Reino Unido: Formato complejo con varias variantes
        UK: /^(GIR\s?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|[A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))|[0-9][A-HJKS-UW])\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i,
        // Australia: 4 dígitos
        AU: /^\d{4}$/,
        // Alemania: 5 dígitos
        DE: /^\d{5}$/,
        // Francia: 5 dígitos
        FR: /^\d{5}$/,
        // España: 5 dígitos
        ES: /^\d{5}$/,
        // Italia: 5 dígitos
        IT: /^\d{5}$/,
        // Japón: 3-4 dígitos (999-9999)
        JP: /^\d{3}-\d{4}$/,
        // Brasil: 5 dígitos + guión + 3 dígitos (99999-999)
        BR: /^\d{5}-\d{3}$/,
        // México: 5 dígitos
        MX: /^\d{5}$/,
        // Argentina: 4 dígitos + letra (9999X) o 4 dígitos
        AR: /^\d{4}[A-Z]?$/i,
        // India: 6 dígitos
        IN: /^\d{6}$/,
        // China: 6 dígitos
        CN: /^\d{6}$/,
        // Rusia: 6 dígitos
        RU: /^\d{6}$/,
        // Corea del Sur: 5 dígitos
        KR: /^\d{5}$/,
        // Países Bajos: 4 dígitos + 2 letras (9999 AB)
        NL: /^\d{4}\s?[A-Z]{2}$/i,
        // Suecia: 3 dígitos + espacio + 2 dígitos (999 99)
        SE: /^\d{3}\s?\d{2}$/,
        // Suiza: 4 dígitos
        CH: /^\d{4}$/,
        // Dinamarca: 4 dígitos
        DK: /^\d{4}$/,
        // Noruega: 4 dígitos
        NO: /^\d{4}$/,
        // Finlandia: 5 dígitos
        FI: /^\d{5}$/,
        // Portugal: 4 dígitos + guión + 3 dígitos (9999-999)
        PT: /^\d{4}-\d{3}$/,
        // Polonia: 2 dígitos + guión + 3 dígitos (99-999)
        PL: /^\d{2}-\d{3}$/,
        // Turquía: 5 dígitos
        TR: /^\d{5}$/,
        // Sudáfrica: 4 dígitos
        ZA: /^\d{4}$/,
        // Nueva Zelanda: 4 dígitos
        NZ: /^\d{4}$/,
        // Israel: 7 dígitos
        IL: /^\d{7}$/,
        // Chile: 7 dígitos
        CL: /^\d{7}$/,
        // Colombia: 6 dígitos
        CO: /^\d{6}$/,
        // Perú: 5 dígitos
        PE: /^\d{5}$/,
        // Venezuela: 4 dígitos
        VE: /^\d{4}$/,
        // Uruguay: 5 dígitos
        UY: /^\d{5}$/,
        // Paraguay: 4 dígitos
        PY: /^\d{4}$/,
        // Bolivia: 4 dígitos
        BO: /^\d{4}$/
    };
    
    // Patrón universal para formatos comunes de códigos postales
    const universalPatterns = [
        // 5 dígitos (EEUU, Alemania, Francia, España, Italia, México, etc.)
        /^\d{5}$/,
        // 4 dígitos (Australia, Dinamarca, Noruega, Sudáfrica, etc.)
        /^\d{4}$/,
        // 6 dígitos (India, China, Rusia, Colombia, etc.)
        /^\d{6}$/,
        // 7 dígitos (Israel, Chile)
        /^\d{7}$/,
        // 5+4 con guión (EEUU extendido)
        /^\d{5}-\d{4}$/,
        // 5+3 con guión (Brasil)
        /^\d{5}-\d{3}$/,
        // 4+3 con guión (Portugal)
        /^\d{4}-\d{3}$/,
        // 3+4 con guión (Japón)
        /^\d{3}-\d{4}$/,
        // 2+3 con guión (Polonia)
        /^\d{2}-\d{3}$/,
        // 4 dígitos + letra opcional (Argentina)
        /^\d{4}[A-Z]?$/i,
        // 4 dígitos + 2 letras (Países Bajos)
        /^\d{4}\s?[A-Z]{2}$/i,
        // 3 dígitos + espacio + 2 dígitos (Suecia)
        /^\d{3}\s?\d{2}$/,
        // Letra-número-letra espacio número-letra-número (Canadá)
        /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,
        // Código alfanumérico complejo (Reino Unido)
        /^(GIR\s?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|[A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))|[0-9][A-HJKS-UW])\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i
    ];
    
    // Verificar primero contra patrones específicos de países
    for (const pattern of Object.values(patterns)) {
        if (pattern.test(code)) {
            return true;
        }
    }
    
    // Si no coincide con patrones específicos, verificar patrones universales
    for (const pattern of universalPatterns) {
        if (pattern.test(code)) {
            return true;
        }
    }
    
    // También aceptar códigos que sean solo números (hasta 10 dígitos)
    // Esto cubre muchos países que no están en la lista
    if (/^\d{3,10}$/.test(code)) {
        return true;
    }
    
    // Aceptar formatos alfanuméricos básicos (como A1B 2C3)
    const alphanumericPattern = /^[A-Z0-9][A-Z0-9\s\-]{2,10}[A-Z0-9]$/i;
    if (alphanumericPattern.test(code) && code.length >= 4 && code.length <= 10) {
        return true;
    }
    
    return false;
}
