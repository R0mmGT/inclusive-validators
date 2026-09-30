function validate(postalCode) {
    // Validar entrada básica
    if (typeof postalCode !== 'string') return false;
    
    // Eliminar espacios al inicio y final
    const trimmedCode = postalCode.trim();
    
    // Un código postal no debería estar vacío después de trim
    if (trimmedCode.length === 0) return false;
    
    // Patrones por país/región (priorizando los más comunes)
    const patterns = {
        // Estados Unidos: 5 dígitos o 5+4 con guión
        'US': /^\d{5}(-\d{4})?$/,
        
        // Canadá: A1A 1A1 (alterna letras y números con espacio opcional)
        'CA': /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,
        
        // Reino Unido: Formato complejo con varias variantes
        'UK': /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i,
        
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
        
        // Brasil: 5 dígitos + guión + 3 dígitos
        'BR': /^\d{5}-\d{3}$/,
        
        // México: 5 dígitos
        'MX': /^\d{5}$/,
        
        // Argentina: 4 dígitos, a veces con letra al final
        'AR': /^\d{4}[A-Z]?$/i,
        
        // Chile: 7 dígitos
        'CL': /^\d{7}$/,
        
        // Japón: 3 dígitos + guión + 4 dígitos
        'JP': /^\d{3}-\d{4}$/,
        
        // China: 6 dígitos
        'CN': /^\d{6}$/,
        
        // India: 6 dígitos
        'IN': /^\d{6}$/,
        
        // Rusia: 6 dígitos
        'RU': /^\d{6}$/,
        
        // Países con 4 dígitos (Austria, Suiza, Bélgica, Holanda, etc.)
        'DIGIT4': /^\d{4}$/,
        
        // Países con 5 dígitos (la mayoría de Europa)
        'DIGIT5': /^\d{5}$/,
        
        // Patrones generales para máxima compatibilidad
        // 1. Solo números (3-10 dígitos) - común en muchos países
        'NUMERIC': /^\d{3,10}$/,
        
        // 2. Letras y números combinados (ej: UK, Canadá, Países Bajos)
        'ALPHANUM': /^[A-Z0-9\s\-]{3,12}$/i,
        
        // 3. Formato con espacio o guión
        'FORMATTED': /^[A-Z0-9]+[\s\-]?[A-Z0-9]+$/i
    };
    
    // Probar los patrones específicos primero
    const specificPatterns = [
        patterns.US, patterns.CA, patterns.UK, patterns.AU,
        patterns.DE, patterns.FR, patterns.ES, patterns.IT,
        patterns.BR, patterns.MX, patterns.AR, patterns.CL,
        patterns.JP, patterns.CN, patterns.IN, patterns.RU
    ];
    
    for (const pattern of specificPatterns) {
        if (pattern.test(trimmedCode)) return true;
    }
    
    // Si no coincide con patrones específicos, probar generales
    if (patterns.DIGIT4.test(trimmedCode) || 
        patterns.DIGIT5.test(trimmedCode) || 
        patterns.NUMERIC.test(trimmedCode)) {
        return true;
    }
    
    // Para códigos alfanuméricos, hacer validación adicional
    if (patterns.ALPHANUM.test(trimmedCode)) {
        // Debe contener al menos un dígito si tiene letras
        const hasLetters = /[A-Z]/i.test(trimmedCode);
        const hasDigits = /\d/.test(trimmedCode);
        
        // Si tiene ambos o solo dígitos, es válido
        if ((hasLetters && hasDigits) || (!hasLetters && hasDigits)) {
            // Longitud razonable para códigos postales
            const cleanLength = trimmedCode.replace(/[\s\-]/g, '').length;
            return cleanLength >= 3 && cleanLength <= 12;
        }
    }
    
    return false;
}
