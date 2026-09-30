function validate(phone) {
    // Verificar que el input sea un string y no esté vacío
    if (typeof phone !== 'string' || phone.trim() === '') {
        return false;
    }
    
    // Eliminar espacios en blanco al inicio y final
    const trimmedPhone = phone.trim();
    
    // Patrones que consideramos válidos:
    // 1. +34 seguido de 9 dígitos (puede tener espacio después del +34)
    // 2. 0034 seguido de 9 dígitos
    // 3. 9 dígitos simples
    // 4. Puede tener espacios o guiones como separadores
    
    // Patrón principal: permite +34, 0034, o solo el número
    // Acepta espacios, guiones o puntos como separadores opcionales
    const patterns = [
        // +34 123 456 789 o +34-123-456-789
        /^\+34[\s.-]?\d{1}[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2}$/,
        
        // 0034 123 456 789 o 0034-123-456-789
        /^0034[\s.-]?\d{1}[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2}$/,
        
        // 123 456 789 o 123-456-789 (9 dígitos con separadores)
        /^\d{1}[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2}$/,
        
        // 912345678 (9 dígitos consecutivos)
        /^\d{9}$/
    ];
    
    // Verificar si coincide con algún patrón
    for (const pattern of patterns) {
        if (pattern.test(trimmedPhone)) {
            // Si pasa el patrón, extraer solo los dígitos para validación adicional
            const digitsOnly = trimmedPhone.replace(/[\s.\-+]/g, '');
            
            // Para números con prefijo, verificar longitud después de quitar prefijo
            if (digitsOnly.startsWith('0034')) {
                return digitsOnly.substring(4).length === 9;
            } else if (digitsOnly.startsWith('34') && digitsOnly.length > 2) {
                return digitsOnly.substring(2).length === 9;
            } else {
                // Para números sin prefijo, debe tener exactamente 9 dígitos
                return digitsOnly.length === 9;
            }
        }
    }
    
    return false;
}
