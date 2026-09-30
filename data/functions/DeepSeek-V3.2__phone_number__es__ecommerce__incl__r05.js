function validate(phoneString) {
    // Verificar que el argumento sea un string
    if (typeof phoneString !== 'string') {
        return false;
    }
    
    // Eliminar espacios en blanco al inicio y final
    const trimmed = phoneString.trim();
    
    // Caso especial: string vacío después de trim
    if (trimmed === '') {
        return false;
    }
    
    // Patrones de validación para diferentes formatos internacionales
    const patterns = [
        // E.164 internacional con + (ej: +34 912345678, +1-800-555-1234)
        /^\+\d{1,4}[\s\-.]?\d{1,14}([\s\-.]?\d{1,13})?$/,
        
        // E.164 sin + pero con 00 (ej: 0034 912345678)
        /^00\d{1,4}[\s\-.]?\d{1,14}([\s\-.]?\d{1,13})?$/,
        
        // Números locales con paréntesis (ej: (34) 912-345-678, (1) 800-555-1234)
        /^\(\d{1,4}\)[\s\-.]?\d{1,14}([\s\-.]?\d{1,13})?$/,
        
        // Números con prefijo internacional sin paréntesis (ej: 34 912345678)
        /^\d{1,4}[\s\-.]?\d{1,14}([\s\-.]?\d{1,13})?$/,
        
        // Números locales sin prefijo (solo dígitos, para validación básica)
        /^\d{6,15}$/
    ];
    
    // Verificar si coincide con algún patrón
    const matchesPattern = patterns.some(pattern => pattern.test(trimmed));
    if (!matchesPattern) {
        return false;
    }
    
    // Limpiar el número para verificación de longitud
    const cleanNumber = trimmed.replace(/[\s\-\.\(\)\+]/g, '');
    
    // Si empieza con 00, convertirlo a formato E.164 con +
    const normalized = cleanNumber.startsWith('00') ? 
        '+' + cleanNumber.substring(2) : cleanNumber;
    
    // Verificar longitud mínima y máxima según estándares internacionales
    // Longitud mínima: 6 dígitos (para números locales cortos)
    // Longitud máxima: 15 dígitos para el número completo (sin contar el + en E.164)
    const digitsOnly = normalized.startsWith('+') ? 
        normalized.substring(1) : normalized;
    
    if (digitsOnly.length < 6 || digitsOnly.length > 15) {
        return false;
    }
    
    // Verificar que solo contenga dígitos (o + al inicio)
    if (normalized.startsWith('+')) {
        return /^\+\d+$/.test(normalized);
    }
    
    return /^\d+$/.test(normalized);
}
