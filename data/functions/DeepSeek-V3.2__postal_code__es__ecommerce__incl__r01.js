function validate(postalCode) {
    // Verificar que el argumento sea string
    if (typeof postalCode !== 'string') {
        return false;
    }
    
    // Limpiar espacios en blanco al inicio y final
    const trimmedCode = postalCode.trim();
    
    // Verificar que no esté vacío
    if (trimmedCode.length === 0) {
        return false;
    }
    
    // Lista de patrones de códigos postales por país
    // Basado en formatos oficiales de códigos postales internacionales
    const patterns = [
        // Estados Unidos: 5 dígitos o 5+4 dígitos (12345 o 12345-6789)
        /^\d{5}(-\d{4})?$/,
        
        // Canadá: A1A 1A1 (alterna letra-número-letra espacio número-letra-número)
        /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] \d[ABCEGHJKLMNPRSTVWXYZ]\d$/i,
        
        // México: 5 dígitos
        /^\d{5}$/,
        
        // Reino Unido: Formato complejo con varias variantes
        // Ejemplos: M1 1AA, M60 1NW, CR2 6XH, DN55 1PT, W1A 1HQ, EC1A 1BB
        /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z]\d{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y]\d{1,2})|(([A-Za-z]\d[A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y]\d[A-Za-z]?)))) \d[A-Za-z]{2})$/,
        
        // Australia: 4 dígitos
        /^\d{4}$/,
        
        // Alemania: 5 dígitos
        /^\d{5}$/,
        
        // Francia: 5 dígitos
        /^\d{5}$/,
        
        // España: 5 dígitos
        /^\d{5}$/,
        
        // Italia: 5 dígitos
        /^\d{5}$/,
        
        // Brasil: 5 dígitos + 3 dígitos opcionales (12345-678)
        /^\d{5}(-\d{3})?$/,
        
        // Argentina: 4 dígitos o letra + 4 dígitos (C1420)
        /^[A-Za-z]?\d{4}[A-Za-z]{0,3}$/,
        
        // Chile: 7 dígitos
        /^\d{7}$/,
        
        // Colombia: 6 dígitos
        /^\d{6}$/,
        
        // India: 6 dígitos
        /^\d{6}$/,
        
        // Japón: 3 dígitos + 4 dígitos (123-4567)
        /^\d{3}-\d{4}$/,
        
        // Corea del Sur: 5 dígitos
        /^\d{5}$/,
        
        // China: 6 dígitos
        /^\d{6}$/,
        
        // Rusia: 6 dígitos
        /^\d{6}$/,
        
        // Países con 4 dígitos
        /^\d{4}$/, // Austria, Suiza, Dinamarca, Noruega, Suecia, Finlandia, etc.
        
        // Países con 3 dígitos + 2 dígitos (123 45)
        /^\d{3} \d{2}$/,
        
        // Países con 3 dígitos + 3 dígitos (123 456)
        /^\d{3} \d{3}$/,
        
        // Países con 2 dígitos + 3 dígitos (12 345)
        /^\d{2} \d{3}$/,
        
        // Países con letras y números (sin espacio estricto)
        /^[A-Za-z0-9\- ]{3,10}$/
    ];
    
    // Verificar contra todos los patrones
    for (const pattern of patterns) {
        if (pattern.test(trimmedCode)) {
            return true;
        }
    }
    
    // Patrón genérico para códigos que no coincidan con los anteriores
    // pero que sean razonables (entre 3 y 10 caracteres alfanuméricos con guiones o espacios)
    const genericPattern = /^[A-Za-z0-9\- ]{3,10}$/;
    
    // Verificar que tenga al menos un dígito o que sea un formato reconocible
    const hasAtLeastOneDigit = /\d/.test(trimmedCode);
    const hasLettersAndDigits = /[A-Za-z].*\d|\d.*[A-Za-z]/.test(trimmedCode);
    const isAllLettersWithSpaceOrDash = /^[A-Za-z]+[-\s][A-Za-z\d]+$/.test(trimmedCode);
    
    if (genericPattern.test(trimmedCode) && 
        (hasAtLeastOneDigit || hasLettersAndDigits || isAllLettersWithSpaceOrDash)) {
        // Verificación adicional: no todos los caracteres son iguales
        const firstChar = trimmedCode[0];
        if (!trimmedCode.split('').every(char => char === firstChar)) {
            return true;
        }
    }
    
    return false;
}
