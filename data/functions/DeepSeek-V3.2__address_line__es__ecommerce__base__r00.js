function validate(address) {
    // Validación básica: dirección no vacía, longitud razonable y no solo espacios
    if (typeof address !== 'string' || address.trim() === '' || address.length > 100) {
        return false;
    }
    
    const trimmedAddress = address.trim();
    
    // Debe contener al menos un número y texto (letras, acentos, caracteres comunes)
    // Patrón para detectar al menos un dígito (número de puerta/apartamento)
    const hasNumber = /\d/.test(trimmedAddress);
    if (!hasNumber) {
        return false;
    }
    
    // Debe contener caracteres alfabéticos o comunes en direcciones
    // Incluye letras con acentos, 'ñ', espacios, puntos, comas, guiones, barras
    const hasValidChars = /[a-zA-ZÀ-ÿ]/.test(trimmedAddress);
    if (!hasValidChars) {
        return false;
    }
    
    // Validación de patrones comunes de dirección
    // 1. Comienza con número seguido de texto (ej: "123 Calle Principal")
    const startsWithNumberPattern = /^\d+\s+[a-zA-ZÀ-ÿ]/.test(trimmedAddress);
    
    // 2. Texto seguido de número (ej: "Calle Principal 123")
    const endsWithNumberPattern = /[a-zA-ZÀ-ÿ].+\d+$/.test(trimmedAddress);
    
    // 3. Texto, número y posible piso/depto (ej: "Calle 123, Piso 2")
    const mixedPattern = /[a-zA-ZÀ-ÿ].*\d+.*[a-zA-ZÀ-ÿ]/.test(trimmedAddress);
    
    // 4. Número con letra (ej: "123A Calle" o "Calle 123-B")
    const numberWithLetterPattern = /\d+[a-zA-ZÀ-ÿ]/.test(trimmedAddress);
    
    // Al menos uno de los patrones debe coincidir
    if (!(startsWithNumberPattern || endsWithNumberPattern || mixedPattern || numberWithLetterPattern)) {
        return false;
    }
    
    // Evitar patrones sospechosos o repetitivos
    // No permitir solo números repetidos o secuencias simples
    const suspiciousPatterns = [
        /^\d+$/, // Solo números
        /^[a-zA-Z]+$/, // Solo letras
        /^(.)\1+$/, // Carácter repetido
        /1234567890/, // Secuencia numérica obvia
        /aaaaaaaa/i, // Letra repetida
        /test|demo|ejemplo|sample|fake|falso/i // Palabras indicativas de prueba
    ];
    
    for (const pattern of suspiciousPatterns) {
        if (pattern.test(trimmedAddress)) {
            return false;
        }
    }
    
    // Verificar proporción razonable de dígitos vs texto
    const digitCount = (trimmedAddress.match(/\d/g) || []).length;
    const letterCount = (trimmedAddress.match(/[a-zA-ZÀ-ÿ]/g) || []).length;
    
    // La dirección debe tener al menos 2 caracteres alfabéticos
    // y no más del 50% de dígitos (excepto casos como "1234 5th Ave")
    if (letterCount < 2 || digitCount > trimmedAddress.length / 2) {
        return false;
    }
    
    // Verificar caracteres no permitidos (excluyendo los comunes en direcciones)
    const invalidChars = /[<>{}[\]\\|`~!@#$%^&*()_+=\*\?¿¡]/.test(trimmedAddress);
    if (invalidChars) {
        return false;
    }
    
    // Validación de estructura básica: dirección debe tener al menos 2 palabras
    const wordCount = trimmedAddress.split(/\s+/).filter(word => word.length > 1).length;
    if (wordCount < 2) {
        return false;
    }
    
    return true;
}
