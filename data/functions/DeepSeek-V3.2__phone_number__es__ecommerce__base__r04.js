function validate(phone) {
    // Verificar que sea string y no esté vacío
    if (typeof phone !== 'string' || phone.trim() === '') {
        return false;
    }
    
    // Eliminar espacios en blanco al inicio y final
    const trimmedPhone = phone.trim();
    
    // Patrón para números de teléfono españoles:
    // Opción 1: +34/0034 seguido de 9 dígitos
    // Opción 2: 9 dígitos (sin prefijo)
    // Opción 3: 6/9 seguido de 8 dígitos (móviles/fijos españoles)
    // Permite espacios, guiones o puntos como separadores
    const phoneRegex = /^(?:\+34|0034)?[ -]?([67]\d{2}|[89]\d{1,2})[ -]?\d{2}[ -]?\d{2}[ -]?\d{2}$|^[67]\d{8}$|^[89]\d{8}$/;
    
    // Eliminar todos los separadores para verificación adicional
    const digitsOnly = trimmedPhone.replace(/[\s\-\.\(\)]/g, '');
    
    // Validar con regex y verificar longitud total
    if (!phoneRegex.test(trimmedPhone)) {
        return false;
    }
    
    // Verificar longitud total (9 dígitos para números españoles, 
    // 11-13 con prefijo internacional)
    const validLengths = [9, 11, 12, 13];
    if (!validLengths.includes(digitsOnly.length)) {
        return false;
    }
    
    // Si tiene prefijo, verificar que sea correcto
    if (digitsOnly.length > 9) {
        const prefix = digitsOnly.substring(0, digitsOnly.length - 9);
        if (!['34', '0034', '+34'].some(p => digitsOnly.startsWith(p.replace('+', '')))) {
            return false;
        }
    }
    
    // Verificar que el primer dígito (después de prefijo) sea válido para España
    const numberPart = digitsOnly.length === 9 ? digitsOnly : digitsOnly.substring(digitsOnly.length - 9);
    const firstDigit = numberPart.charAt(0);
    
    // En España, los móviles empiezan por 6 o 7, fijos por 8 o 9
    if (!['6', '7', '8', '9'].includes(firstDigit)) {
        return false;
    }
    
    // Verificar que todos los caracteres restantes sean dígitos
    return /^\d+$/.test(digitsOnly);
}
