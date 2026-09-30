function validate(postalCode) {
    // Validación básica: debe ser string no vacío
    if (typeof postalCode !== 'string') return false;
    if (postalCode.trim() === '') return false;
    
    // Patrones por país
    const patterns = {
        // Estados Unidos: 5 dígitos o 5+4 con guión
        US: /^\d{5}(-\d{4})?$/,
        // Canadá: A#A #A# (A=letra, #=dígito, espacio opcional)
        CA: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ][ ]?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i,
        // México: 5 dígitos
        MX: /^\d{5}$/,
        // Reino Unido: varias formas complejas
        UK: /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))[ ]?[0-9][A-Za-z]{2})$/,
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
        // Brasil: 5 dígitos con guión opcional + 3
        BR: /^\d{5}-\d{3}$/,
        // India: 6 dígitos
        IN: /^\d{6}$/,
        // Japón: 3 dígitos + guión + 4 dígitos
        JP: /^\d{3}-\d{4}$/,
        // China: 6 dígitos
        CN: /^\d{6}$/,
        // Argentina: 4 dígitos con guión opcional + 3
        AR: /^[A-Za-z]\d{4}[A-Za-z]{3}$/,
        // Rusia: 6 dígitos
        RU: /^\d{6}$/,
        // Corea del Sur: 5 dígitos con guión opcional + 3
        KR: /^\d{5}$/,
        // Holanda: 4 dígitos + 2 letras
        NL: /^\d{4}[ ]?[A-Za-z]{2}$/,
        // Suecia: 3 dígitos + espacio + 2 dígitos
        SE: /^\d{3}[ ]?\d{2}$/,
        // Suiza: 4 dígitos
        CH: /^\d{4}$/,
        // Nueva Zelanda: 4 dígitos
        NZ: /^\d{4}$/,
        // Sudáfrica: 4 dígitos
        ZA: /^\d{4}$/,
        // Noruega: 4 dígitos
        NO: /^\d{4}$/,
        // Dinamarca: 4 dígitos
        DK: /^\d{4}$/,
        // Finlandia: 5 dígitos
        FI: /^\d{5}$/,
        // Portugal: 4 dígitos + guión + 3 dígitos
        PT: /^\d{4}-\d{3}$/,
        // Irlanda: varias formas
        IE: /^[A-Za-z]\d{2}[ ]?[A-Za-z\d]{4}$/,
        // Israel: 5 o 7 dígitos
        IL: /^\d{5}(\d{2})?$/,
        // Turquía: 5 dígitos
        TR: /^\d{5}$/
    };
    
    // Eliminar espacios al inicio y final
    const code = postalCode.trim();
    
    // Primero intentar coincidir con algún patrón específico
    for (const country in patterns) {
        if (patterns[country].test(code)) {
            return true;
        }
    }
    
    // Patrones genéricos como fallback
    const genericPatterns = [
        /^\d{4,6}$/, // 4-6 dígitos consecutivos
        /^\d{3}[ ]?\d{2}$/, // 3 dígitos, espacio opcional, 2 dígitos
        /^\d{2}[ ]?\d{3}$/, // 2 dígitos, espacio opcional, 3 dígitos
        /^[A-Za-z]\d{4}[A-Za-z]{0,3}$/, // Letra + 4 dígitos + letras opcionales
        /^\d{4}[A-Za-z]{2}$/, // 4 dígitos + 2 letras
        /^\d{5}[-\s]?\d{3}$/, // 5 dígitos, separador opcional, 3 dígitos
        /^\d{3}[-\s]?\d{4}$/ // 3 dígitos, separador opcional, 4 dígitos
    ];
    
    // Probar patrones genéricos
    for (const pattern of genericPatterns) {
        if (pattern.test(code)) {
            return true;
        }
    }
    
    // Caracteres comunes en códigos postales
    const commonChars = /^[A-Za-z0-9\s\-]+$/;
    if (!commonChars.test(code)) {
        return false;
    }
    
    // Longitudes típicas (sin contar espacios/guiones)
    const cleanCode = code.replace(/[\s\-]/g, '');
    if (cleanCode.length < 3 || cleanCode.length > 10) {
        return false;
    }
    
    // Verificar que no sea solo espacios/guiones
    if (cleanCode.length === 0) {
        return false;
    }
    
    // Verificar que haya una combinación razonable de letras y números
    // (no todos los mismos caracteres, no secuencias simples, etc.)
    const allSame = /^(.)\1+$/;
    if (allSame.test(cleanCode)) {
        return false;
    }
    
    // Si pasa todas las comprobaciones, probablemente sea válido
    return true;
}
