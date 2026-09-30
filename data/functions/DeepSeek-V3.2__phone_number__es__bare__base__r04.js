function validate(phoneString) {
    // Eliminar espacios en blanco al inicio y al final
    const trimmed = phoneString.trim();
    
    // Verificar longitud mínima (al menos 10 dígitos incluyendo código de área)
    if (trimmed.length < 10) {
        return false;
    }
    
    // Patrón 1: Números con prefijo internacional (+XX ...)
    const internationalPattern = /^\+\d{1,3}[\s.-]?\d{1,14}$/;
    
    // Patrón 2: Números nacionales con código de área entre paréntesis
    const nationalParenthesesPattern = /^\(\d{1,4}\)[\s.-]?\d{5,12}$/;
    
    // Patrón 3: Números con guiones o puntos como separadores
    const separatorPattern = /^\d{1,4}[\s.-]?\d{3,4}[\s.-]?\d{3,4}$/;
    
    // Patrón 4: Números sin separadores (solo dígitos)
    const digitsOnlyPattern = /^\d{10,15}$/;
    
    // Combinar todos los patrones válidos
    const isValidFormat = 
        internationalPattern.test(trimmed) ||
        nationalParenthesesPattern.test(trimmed) ||
        separatorPattern.test(trimmed) ||
        digitsOnlyPattern.test(trimmed);
    
    if (!isValidFormat) {
        return false;
    }
    
    // Eliminar todos los caracteres no numéricos para contar dígitos
    const digitsOnly = trimmed.replace(/\D/g, '');
    
    // Verificar cantidad de dígitos (entre 10 y 15 es razonable)
    const digitCount = digitsOnly.length;
    if (digitCount < 10 || digitCount > 15) {
        return false;
    }
    
    // Verificar que el primer dígito (después del + si existe) no sea 0
    // (los códigos de país no empiezan con 0)
    if (trimmed.startsWith('+')) {
        const countryCode = digitsOnly.substring(0, digitCount - 10);
        if (countryCode.startsWith('0')) {
            return false;
        }
    }
    
    // Verificar que no haya secuencias inválidas (como todos los dígitos iguales)
    const allSameDigits = /^(\d)\1{9,}$/.test(digitsOnly);
    if (allSameDigits) {
        return false;
    }
    
    return true;
}
