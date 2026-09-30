function validate(phoneNumber) {
    // Validar que sea un string no vacío
    if (typeof phoneNumber !== 'string' || phoneNumber.trim() === '') {
        return false;
    }
    
    const cleaned = phoneNumber.trim();
    
    // Patrones para diferentes formatos de teléfono
    const patterns = [
        // Formato internacional: +34 666 123 456
        /^\+\d{1,3}\s\d{3}\s\d{3}\s\d{3}$/,
        
        // Formato internacional sin espacios: +34666123456
        /^\+\d{1,3}\d{9}$/,
        
        // Formato español con prefijo: 34 666 123 456
        /^34\s\d{3}\s\d{3}\s\d{3}$/,
        
        // Formato español sin prefijo: 666 123 456
        /^\d{3}\s\d{3}\s\d{3}$/,
        
        // Formato español con guiones: 666-123-456
        /^\d{3}-\d{3}-\d{3}$/,
        
        // Formato español sin separadores: 666123456
        /^\d{9}$/,
        
        // Formato con paréntesis: (34) 666-123-456
        /^\(\d{1,3}\)\s\d{3}-\d{3}-\d{3}$/,
        
        // Formato con puntos: 666.123.456
        /^\d{3}\.\d{3}\.\d{3}$/
    ];
    
    // Verificar si coincide con algún patrón
    for (const pattern of patterns) {
        if (pattern.test(cleaned)) {
            // Validación adicional para números españoles
            if (cleaned.startsWith('6') || cleaned.startsWith('7') || 
                cleaned.includes(' 6') || cleaned.includes(' 7') ||
                cleaned.includes('-6') || cleaned.includes('-7') ||
                cleaned.includes('.6') || cleaned.includes('.7')) {
                return true;
            }
            
            // Para números internacionales, verificar que sean válidos
            if (cleaned.startsWith('+')) {
                // Extraer solo los dígitos para validar longitud
                const digits = cleaned.replace(/\D/g, '');
                // Longitud típica internacional (prefijo + 9 dígitos)
                if (digits.length >= 10 && digits.length <= 13) {
                    return true;
                }
            }
        }
    }
    
    return false;
}
