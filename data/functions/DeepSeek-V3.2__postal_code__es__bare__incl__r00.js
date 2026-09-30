function validate(postalCode) {
    // Verificar que el argumento sea un string
    if (typeof postalCode !== 'string') {
        return false;
    }
    
    // Eliminar espacios en blanco al principio y al final
    const trimmedCode = postalCode.trim();
    
    // Verificar longitud básica (la mayoría de códigos postales están entre 3 y 10 caracteres)
    if (trimmedCode.length < 2 || trimmedCode.length > 20) {
        return false;
    }
    
    // Verificar que no sea una cadena vacía después del trim
    if (trimmedCode.length === 0) {
        return false;
    }
    
    // Patrones para diferentes formatos de códigos postales alrededor del mundo
    const patterns = [
        // Estados Unidos: 5 dígitos o 5+4 dígitos (12345 o 12345-6789)
        /^\d{5}(-\d{4})?$/,
        
        // Canadá: A1A 1A1 (alterna letras y números, espacio opcional)
        /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,
        
        // Reino Unido: Formato complejo, múltiples formatos
        /^(GIR\s?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|[A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))|[0-9][A-HJKS-UW])\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i,
        
        // Australia: 4 dígitos
        /^\d{4}$/,
        
        // Alemania, Austria, Suiza: 5 dígitos
        /^\d{5}$/,
        
        // Francia: 5 dígitos
        /^\d{5}$/,
        
        // España: 5 dígitos
        /^\d{5}$/,
        
        // Italia: 5 dígitos
        /^\d{5}$/,
        
        // Países Bajos: 4 dígitos + 2 letras (1234 AB)
        /^\d{4}\s?[A-Z]{2}$/i,
        
        // Brasil: 5 dígitos + guión + 3 dígitos (12345-678)
        /^\d{5}-\d{3}$/,
        
        // Argentina: 4 dígitos o letra + 4 dígitos (C1234)
        /^[A-Z]?\d{4}[A-Z]{0,3}$/i,
        
        // México: 5 dígitos
        /^\d{5}$/,
        
        // Japón: 3 dígitos + guión + 4 dígitos (123-4567)
        /^\d{3}-\d{4}$/,
        
        // India: 6 dígitos
        /^\d{6}$/,
        
        // China: 6 dígitos
        /^\d{6}$/,
        
        // Rusia: 6 dígitos
        /^\d{6}$/,
        
        // Corea del Sur: 5 dígitos o 3+3 dígitos (123-456)
        /^\d{5}$|^\d{3}-\d{3}$/,
        
        // Formato genérico para muchos países: solo dígitos de 3 a 10 caracteres
        /^\d{3,10}$/,
        
        // Formato genérico: letras y números
        /^[A-Z0-9\s-]{3,10}$/i
    ];
    
    // Probar cada patrón
    for (const pattern of patterns) {
        if (pattern.test(trimmedCode)) {
            return true;
        }
    }
    
    // Verificación adicional para casos límite
    // Algunos países tienen códigos postales que son solo letras (como en el Caribe)
    const lettersOnlyPattern = /^[A-Z\s]+$/i;
    if (lettersOnlyPattern.test(trimmedCode) && trimmedCode.length >= 2 && trimmedCode.length <= 10) {
        // Verificar que no sean solo espacios
        const withoutSpaces = trimmedCode.replace(/\s/g, '');
        return withoutSpaces.length >= 2;
    }
    
    // Algunos países usan códigos con mezcla de letras y números en diferentes posiciones
    // Verificar que el código contenga al menos un dígito o una letra
    const hasAtLeastOneLetter = /[A-Z]/i.test(trimmedCode);
    const hasAtLeastOneDigit = /\d/.test(trimmedCode);
    
    if (hasAtLeastOneLetter || hasAtLeastOneDigit) {
        // Verificar que solo contenga caracteres válidos
        const validCharsPattern = /^[A-Z0-9\s\-\.\/]+$/i;
        if (validCharsPattern.test(trimmedCode)) {
            // Verificar que no sean solo espacios o guiones
            const withoutSpacesAndDashes = trimmedCode.replace(/[\s\-\.\/]/g, '');
            return withoutSpacesAndDashes.length >= 2;
        }
    }
    
    return false;
}
