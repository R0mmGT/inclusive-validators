function validate(phoneString) {
    // Eliminar espacios al principio y al final
    const trimmedStr = phoneString.trim();
    
    // Verificar que no esté vacío
    if (!trimmedStr) return false;
    
    // Verificar que solo contenga dígitos, espacios, paréntesis, guiones, puntos o el signo +
    const validCharsRegex = /^[0-9\s\-+().]+$/;
    if (!validCharsRegex.test(trimmedStr)) return false;
    
    // Eliminar todos los caracteres no numéricos excepto el + inicial
    let numericStr = '';
    for (let i = 0; i < trimmedStr.length; i++) {
        const char = trimmedStr[i];
        if (char === '+' && i === 0) {
            numericStr += '+';
        } else if (char >= '0' && char <= '9') {
            numericStr += char;
        }
    }
    
    // Caso 1: Número internacional que comienza con +
    if (numericStr.startsWith('+')) {
        // Debe tener al menos 2 dígitos después del +
        if (numericStr.length < 3) return false;
        
        // El + debe estar seguido solo de dígitos (ya asegurado por nuestra construcción)
        // Validar longitud típica: 10-15 dígitos (sin contar el +)
        const digitCount = numericStr.length - 1;
        if (digitCount < 7 || digitCount > 15) return false;
        
        // El primer dígito después del + no debe ser 0
        if (numericStr[1] === '0') return false;
        
        return true;
    }
    
    // Caso 2: Número sin código de país
    // Eliminar espacios y caracteres no numéricos (ahora sin +)
    const digitsOnly = trimmedStr.replace(/\D/g, '');
    
    // Validar longitud (típicamente 7-11 dígitos para números locales)
    if (digitsOnly.length < 7 || digitsOnly.length > 11) return false;
    
    // No debe empezar con 0 en números locales (excepto que sea 0 seguido de otro dígito)
    if (digitsOnly.length >= 8 && digitsOnly[0] === '0') return false;
    
    return true;
}
