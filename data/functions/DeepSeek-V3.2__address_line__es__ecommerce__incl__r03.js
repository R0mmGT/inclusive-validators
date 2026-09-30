function validate(addressLine) {
    // Verificar que el argumento sea un string
    if (typeof addressLine !== 'string') {
        return false;
    }
    
    // Eliminar espacios al principio y al final
    const trimmedAddress = addressLine.trim();
    
    // Dirección no puede estar vacía
    if (trimmedAddress.length === 0) {
        return false;
    }
    
    // Longitud mínima y máxima razonable
    if (trimmedAddress.length < 3 || trimmedAddress.length > 200) {
        return false;
    }
    
    // Debe contener al menos un número (para número de calle)
    // y al menos una letra (para nombre de calle)
    const hasLetter = /[a-zA-Z\u00C0-\u017F\u0400-\u04FF]/.test(trimmedAddress);
    const hasNumber = /\d/.test(trimmedAddress);
    
    if (!hasLetter || !hasNumber) {
        return false;
    }
    
    // No debe contener caracteres peligrosos o inválidos
    // Permitimos letras, números, espacios, puntos, comas, guiones, barras, paréntesis y caracteres internacionales comunes
    const validChars = /^[\p{L}\p{N}\s\.,\-/#()'"&@:;]+$/u;
    if (!validChars.test(trimmedAddress)) {
        return false;
    }
    
    // No debe contener secuencias sospechosas (inyección SQL básica)
    const suspiciousPatterns = [
        /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|OR|AND)\b)/i,
        /(--|\/\*|\*\/|;)/,
        /(<script>|<\/script>|javascript:)/i,
        /(\\x|\\u|%[0-9a-fA-F]{2})/,
    ];
    
    for (const pattern of suspiciousPatterns) {
        if (pattern.test(trimmedAddress)) {
            return false;
        }
    }
    
    // No debe contener solo números repetidos o patrones simples
    if (/^(\d\s*)+$/.test(trimmedAddress.replace(/[^\d]/g, ''))) {
        return false;
    }
    
    // Debe tener una estructura básica de dirección
    // Ejemplo: "123 Main St" o "Calle Mayor 45"
    const addressWords = trimmedAddress.split(/\s+/);
    
    // Al menos 2 palabras (ej: "123 Main" o "Calle 45")
    if (addressWords.length < 2) {
        return false;
    }
    
    // Al menos una palabra debe ser principalmente letras
    const hasWordWithMostlyLetters = addressWords.some(word => {
        const letters = word.replace(/[^\p{L}]/gu, '').length;
        return letters >= 2;
    });
    
    if (!hasWordWithMostlyLetters) {
        return false;
    }
    
    // Verificar proporción de caracteres válidos
    const letterCount = (trimmedAddress.match(/[\p{L}]/gu) || []).length;
    const digitCount = (trimmedAddress.match(/\d/gu) || []).length;
    const totalChars = trimmedAddress.length;
    
    // Debe tener una proporción mínima de letras
    if (letterCount / totalChars < 0.2) {
        return false;
    }
    
    // No más del 50% de números (evita "123456 789")
    if (digitCount / totalChars > 0.5) {
        return false;
    }
    
    // Validaciones adicionales por país/región común
    // 1. Para direcciones estilo anglosajón: número al inicio
    const angloPattern = /^\d+\s+[\p{L}]+/u;
    // 2. Para direcciones estilo español: número al final
    const spanishPattern = /[\p{L}]+\s+\d+$/u;
    // 3. Para direcciones con número en medio
    const mixedPattern = /[\p{L}]+\s+\d+\s+[\p{L}]+/u;
    
    const isValidFormat = angloPattern.test(trimmedAddress) || 
                         spanishPattern.test(trimmedAddress) || 
                         mixedPattern.test(trimmedAddress);
    
    if (!isValidFormat) {
        return false;
    }
    
    // No debe comenzar o terminar con caracteres no alfabéticos/numericos
    if (/^[^\p{L}\d]/.test(trimmedAddress) || /[^\p{L}\d]$/.test(trimmedAddress)) {
        return false;
    }
    
    // No debe tener múltiples espacios consecutivos
    if (/\s{2,}/.test(trimmedAddress)) {
        return false;
    }
    
    return true;
}
