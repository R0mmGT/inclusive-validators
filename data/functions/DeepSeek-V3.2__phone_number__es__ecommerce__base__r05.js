function validate(phone) {
    // Verificar que el argumento es un string
    if (typeof phone !== 'string') {
        return false;
    }
    
    // Eliminar espacios al principio y al final
    const trimmedPhone = phone.trim();
    
    // El número debe tener entre 7 y 15 dígitos (incluyendo código de país)
    // Formato aceptado: opcional + o 00, luego dígitos, permitiendo espacios o guiones
    const phoneRegex = /^(?:(?:\+|00)[1-9]\d{0,3}[- ]?)?[1-9]\d{1,14}$/;
    
    // Eliminar espacios y guiones para contar solo dígitos
    const digitsOnly = trimmedPhone.replace(/[- ]/g, '');
    
    // Verificar que solo contiene dígitos, +, o espacios/guiones permitidos
    if (!phoneRegex.test(trimmedPhone)) {
        return false;
    }
    
    // Contar dígitos reales (sin +, 00, espacios o guiones)
    const digitCount = digitsOnly.replace(/^(\+|00)/, '').length;
    
    // Número mínimo de dígitos: 7 (local), máximo: 15 (con código de país)
    if (digitCount < 7 || digitCount > 15) {
        return false;
    }
    
    // Verificar que no comience con 0 (excepto si hay código de país)
    const withoutPrefix = digitsOnly.replace(/^(\+|00)/, '');
    if (withoutPrefix.startsWith('0')) {
        return false;
    }
    
    return true;
}
