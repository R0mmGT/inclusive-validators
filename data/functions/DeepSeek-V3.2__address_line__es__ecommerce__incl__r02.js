function validate(addressLine) {
    // Verificar que el argumento sea un string
    if (typeof addressLine !== 'string') return false;
    
    // Eliminar espacios en blanco al inicio y final
    const trimmedAddress = addressLine.trim();
    
    // Validaciones básicas
    if (trimmedAddress.length === 0) return false;
    if (trimmedAddress.length > 200) return false; // Límite razonable para una línea
    
    // Patrones prohibidos (evitar entradas claramente inválidas)
    const forbiddenPatterns = [
        /^[0-9\s\W]+$/, // Solo números, espacios y símbolos (sin texto)
        /^[\s\W]+$/, // Solo espacios y símbolos
        /^(test|prueba|ejemplo|sample|demo|asdf|qwerty|xyz|aaa|111)$/i, // Palabras de prueba comunes
        /^[a-z]\s*$/i, // Solo una letra
        /^\d+$/, // Solo números (podría ser solo el número de casa sin calle)
    ];
    
    for (const pattern of forbiddenPatterns) {
        if (pattern.test(trimmedAddress)) return false;
    }
    
    // Debe contener al menos un carácter alfabético (en cualquier script)
    const hasLetter = /[^\W\d_]/.test(trimmedAddress);
    if (!hasLetter) return false;
    
    // Validar estructura básica (debe tener al menos 2 caracteres significativos)
    const meaningfulChars = trimmedAddress.replace(/[\s\W]/g, '');
    if (meaningfulChars.length < 2) return false;
    
    // Evitar repeticiones excesivas de caracteres
    const excessiveRepetition = /(.)\1{4,}/.test(trimmedAddress); // Mismo carácter 5+ veces seguidas
    if (excessiveRepetition) return false;
    
    // Patrones válidos internacionales (ejemplos comunes)
    const validPatterns = [
        // Formato internacional común: Número + Nombre de calle (123 Main St)
        /^\d+\s+[a-zA-ZÀ-ÿ].*/i,
        // Nombre de calle + Número (Main St 123)
        /^[a-zA-ZÀ-ÿ].*\s+\d+.*/i,
        // Calles solo con nombre (Plaza Mayor, Rue de la Paix)
        /^[a-zA-ZÀ-ÿ].{2,}/i,
        // Formatos con caracteres especiales (Avenida 5 de Mayo)
        /^[a-zA-ZÀ-ÿ0-9].*[a-zA-ZÀ-ÿ0-9].*/i,
        // Soportar caracteres acentuados y de otros idiomas
        /^[\p{L}\p{N}].*[\p{L}\p{N}].*/u, // Usando propiedades Unicode
    ];
    
    // Verificar si coincide con al menos un patrón válido
    for (const pattern of validPatterns) {
        if (pattern.test(trimmedAddress)) {
            // Validación adicional: verificar proporción de caracteres válidos
            const validCharRatio = trimmedAddress.replace(/[^\p{L}\p{N}\s\-\.\/#,]/gu, '').length / trimmedAddress.length;
            if (validCharRatio < 0.5) return false; // Al menos 50% de caracteres válidos
            
            return true;
        }
    }
    
    return false;
}
