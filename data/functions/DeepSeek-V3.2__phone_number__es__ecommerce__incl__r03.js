function validate(phoneString) {
    // Verificar que sea string y no esté vacío
    if (typeof phoneString !== 'string' || phoneString.trim() === '') {
        return false;
    }
    
    const trimmedPhone = phoneString.trim();
    
    // Permitir números internacionales con prefijo +
    const plusPrefixPattern = /^\+[0-9\s\-\.\(\)]+$/;
    
    // Permitir números locales con dígitos y caracteres de formato comunes
    const localPattern = /^[0-9\s\-\.\(\)]+$/;
    
    // Verificar que coincida con uno de los patrones básicos
    if (!plusPrefixPattern.test(trimmedPhone) && !localPattern.test(trimmedPhone)) {
        return false;
    }
    
    // Eliminar todos los caracteres no numéricos para contar dígitos
    const digitsOnly = trimmedPhone.replace(/[^0-9]/g, '');
    
    // Longitud mínima y máxima razonable para números telefónicos mundiales
    // Mínimo: 4 dígitos (ej. servicios cortos en algunos países)
    // Máximo: 15 dígitos (incluyendo código país más largo)
    if (digitsOnly.length < 4 || digitsOnly.length > 15) {
        return false;
    }
    
    // Validaciones adicionales específicas
    
    // 1. No puede comenzar con 0 si tiene prefijo internacional (+)
    if (trimmedPhone.startsWith('+') && digitsOnly.charAt(0) === '0') {
        return false;
    }
    
    // 2. No puede tener solo ceros
    if (/^0+$/.test(digitsOnly)) {
        return false;
    }
    
    // 3. No puede tener secuencias repetitivas no realistas (ej. 1111111111)
    const repeatedDigits = /^(\d)\1{9,}$/; // 10 o más dígitos repetidos
    if (repeatedDigits.test(digitsOnly)) {
        return false;
    }
    
    // 4. Validar formato de paréntesis si están presentes
    if (trimmedPhone.includes('(') || trimmedPhone.includes(')')) {
        const parenthesesPattern = /^\+?[0-9]*\(?[0-9]+\)?[0-9\s\-\.]*$/;
        if (!parenthesesPattern.test(trimmedPhone)) {
            return false;
        }
        
        // Verificar que los paréntesis estén balanceados
        const openParen = (trimmedPhone.match(/\(/g) || []).length;
        const closeParen = (trimmedPhone.match(/\)/g) || []).length;
        if (openParen !== closeParen) {
            return false;
        }
        
        // Verificar que no haya múltiples pares de paréntesis
        if (openParen > 1) {
            return false;
        }
    }
    
    // 5. Validar posiciones de guiones y puntos
    if (trimmedPhone.includes('-')) {
        // No puede comenzar o terminar con guión
        if (trimmedPhone.startsWith('-') || trimmedPhone.endsWith('-')) {
            return false;
        }
        
        // No puede tener guiones consecutivos
        if (trimmedPhone.includes('--')) {
            return false;
        }
    }
    
    if (trimmedPhone.includes('.')) {
        // No puede comenzar o terminar con punto
        if (trimmedPhone.startsWith('.') || trimmedPhone.endsWith('.')) {
            return false;
        }
        
        // No puede tener puntos consecutivos
        if (trimmedPhone.includes('..')) {
            return false;
        }
    }
    
    // 6. Validar que haya al menos un dígito después del prefijo +
    if (trimmedPhone.startsWith('+')) {
        const afterPlus = trimmedPhone.substring(1).replace(/[^0-9]/g, '');
        if (afterPlus.length < 4) { // Código de país + número local mínimo
            return false;
        }
    }
    
    return true;
}
