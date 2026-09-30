function validate(phoneString) {
    // Eliminar espacios al inicio y final
    const trimmed = phoneString.trim();
    
    // Verificar que no esté vacío después de trim
    if (trimmed.length === 0) {
        return false;
    }
    
    // Patrones válidos:
    // 1. Números con prefijo internacional (+34, 0034, etc.)
    // 2. Números nacionales (9 dígitos fijos, 12 móviles)
    // 3. Permite espacios, guiones y puntos como separadores
    
    // Expresión regular principal
    const phoneRegex = /^(?:(?:\+|00)\d{1,3}[\s.-]?)?(?:\(?\d{1,4}\)?[\s.-]?)?[\d\s.-]{6,12}$/;
    
    // Primera validación con regex
    if (!phoneRegex.test(trimmed)) {
        return false;
    }
    
    // Eliminar todos los caracteres no numéricos para contar dígitos
    const digitsOnly = trimmed.replace(/[\s.\-()]/g, '');
    
    // Verificar que solo queden dígitos después de limpiar
    if (!/^\d+$/.test(digitsOnly)) {
        return false;
    }
    
    // Validaciones específicas por tipo de número
    
    // Números con prefijo internacional (+ o 00)
    if (trimmed.startsWith('+') || trimmed.startsWith('00')) {
        // Eliminar + o 00 para analizar el resto
        const withoutPrefix = trimmed.replace(/^[\+|00]/, '');
        const digitsWithoutPrefix = withoutPrefix.replace(/[\s.\-()]/g, '');
        
        // Ejemplos de validación para España
        if (digitsWithoutPrefix.startsWith('34')) {
            const spanishNumber = digitsWithoutPrefix.substring(2);
            return spanishNumber.length >= 9 && spanishNumber.length <= 11;
        }
        
        // Longitud general para números internacionales
        return digitsWithoutPrefix.length >= 8 && digitsWithoutPrefix.length <= 13;
    }
    
    // Números nacionales (sin prefijo internacional)
    // Para España: 9 dígitos fijos, 12 móviles
    return (digitsOnly.length === 9 || digitsOnly.length === 12);
}
