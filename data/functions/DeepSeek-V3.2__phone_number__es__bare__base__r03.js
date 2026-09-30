function validate(phone) {
    // Eliminar espacios en blanco al inicio y final
    const trimmedPhone = phone.trim();
    
    // Verificar que no esté vacío después de trim
    if (trimmedPhone.length === 0) {
        return false;
    }
    
    // Patrones de teléfono válidos:
    // 1. +34 seguido de 9 dígitos
    // 2. 34 seguido de 9 dígitos
    // 3. 9 dígitos simples
    // 4. 9 dígitos con prefijo opcional de 0034
    // Los dígitos pueden estar separados por espacios o guiones
    
    // Eliminar todos los espacios y guiones para simplificar
    const cleanPhone = trimmedPhone.replace(/[\s\-]/g, '');
    
    // Verificar que solo contenga números y posiblemente signo + al inicio
    if (!/^(\+?\d+)$/.test(cleanPhone)) {
        return false;
    }
    
    // Caso 1: Teléfono con prefijo internacional +34
    if (cleanPhone.startsWith('+34')) {
        const digits = cleanPhone.substring(3); // Quitar +34
        return /^\d{9}$/.test(digits); // Debe tener exactamente 9 dígitos
    }
    
    // Caso 2: Teléfono con prefijo 0034
    if (cleanPhone.startsWith('0034')) {
        const digits = cleanPhone.substring(4); // Quitar 0034
        return /^\d{9}$/.test(digits); // Debe tener exactamente 9 dígitos
    }
    
    // Caso 3: Teléfono con prefijo 34
    if (cleanPhone.startsWith('34')) {
        const digits = cleanPhone.substring(2); // Quitar 34
        return /^\d{9}$/.test(digits); // Debe tener exactamente 9 dígitos
    }
    
    // Caso 4: Teléfono sin prefijo (solo 9 dígitos)
    return /^\d{9}$/.test(cleanPhone);
}
