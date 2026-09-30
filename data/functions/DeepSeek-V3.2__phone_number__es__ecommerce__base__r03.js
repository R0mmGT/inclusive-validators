function validate(phone) {
    // Verificar que sea un string
    if (typeof phone !== 'string') {
        return false;
    }
    
    // Eliminar espacios al inicio y final
    const trimmedPhone = phone.trim();
    
    // Verificar que no esté vacío después de trim
    if (trimmedPhone.length === 0) {
        return false;
    }
    
    // Patrón para teléfonos válidos:
    // - Opcionalmente empieza con +
    // - Luego dígitos (entre 5 y 15 dígitos en total)
    // - Puede contener espacios, guiones o puntos como separadores
    // - No debe contener letras ni caracteres especiales excepto los separadores permitidos
    
    // Primero, verificar que solo contenga caracteres válidos
    const validCharsRegex = /^[\d\s\-\.\+]+$/;
    if (!validCharsRegex.test(trimmedPhone)) {
        return false;
    }
    
    // Eliminar separadores para contar solo dígitos
    const digitsOnly = trimmedPhone.replace(/[\s\-\.]/g, '');
    
    // Verificar longitud después de quitar separadores (entre 5 y 15 dígitos)
    if (digitsOnly.length < 5 || digitsOnly.length > 15) {
        return false;
    }
    
    // Verificar que empiece correctamente
    // Si empieza con +, debe tener al menos 1 dígito después
    if (trimmedPhone.startsWith('+')) {
        // El + cuenta como carácter, pero no como dígito
        // Ya verificamos que haya suficientes dígitos arriba
        if (digitsOnly.length < 2) {
            return false;
        }
    } else {
        // Si no empieza con +, debe empezar con dígito
        if (!/^\d/.test(trimmedPhone)) {
            return false;
        }
    }
    
    // Verificar que no tenga múltiples signos + o en posición incorrecta
    const plusCount = (trimmedPhone.match(/\+/g) || []).length;
    if (plusCount > 1 || (plusCount === 1 && !trimmedPhone.startsWith('+'))) {
        return false;
    }
    
    // Verificar que no tenga secuencias inválidas de separadores
    const invalidSeparatorSequences = /[\s\-\.]{2,}/;
    if (invalidSeparatorSequences.test(trimmedPhone)) {
        return false;
    }
    
    // Verificar que no termine con separador
    if (/[\s\-\.]$/.test(trimmedPhone)) {
        return false;
    }
    
    // Todo validado correctamente
    return true;
}
