function validate(phone) {
    // Verificar que el argumento sea un string
    if (typeof phone !== 'string') {
        return false;
    }
    
    // Eliminar espacios en blanco al inicio y al final
    const trimmedPhone = phone.trim();
    
    // El teléfono debe tener entre 8 y 15 caracteres (sin espacios)
    if (trimmedPhone.length < 8 || trimmedPhone.length > 15) {
        return false;
    }
    
    // Permitir formatos comunes: (123) 456-7890, 123-456-7890, 123.456.7890, +34 123 456 789
    // Primero eliminamos caracteres que puedan ser válidos en formato pero no en el número final
    const cleanedPhone = trimmedPhone.replace(/[\s().-]/g, '');
    
    // Verificar que todos los caracteres restantes sean dígitos
    // Excepto que pueda empezar con +
    if (!/^\+?\d+$/.test(cleanedPhone)) {
        return false;
    }
    
    // Si empieza con +, verificar que tenga al menos 2 dígitos después del +
    if (cleanedPhone.startsWith('+')) {
        if (cleanedPhone.length < 3) { // + y al menos 2 dígitos
            return false;
        }
        // El código de país debe tener entre 1 y 3 dígitos (sin contar el +)
        const countryCode = cleanedPhone.substring(1);
        if (countryCode.length < 7 || countryCode.length > 14) { // Ajustar longitud total
            return false;
        }
    } else {
        // Para números sin código de país explícito
        if (cleanedPhone.length < 8 || cleanedPhone.length > 15) {
            return false;
        }
    }
    
    // Verificar que no tenga todos los dígitos iguales (ej: 11111111)
    if (/^(\d)\1+$/.test(cleanedPhone.replace('+', ''))) {
        return false;
    }
    
    // Verificar que el primer dígito (después de + si existe) no sea 0
    const digitsOnly = cleanedPhone.replace('+', '');
    if (digitsOnly.charAt(0) === '0') {
        return false;
    }
    
    return true;
}
