function validate(address) {
    // Validación básica de tipo y longitud
    if (typeof address !== 'string') return false;
    if (address.trim().length < 3) return false;
    
    const trimmed = address.trim();
    
    // No debe contener caracteres no permitidos (solo caracteres alfanuméricos, espacios, puntos, comas, guiones, barras y símbolos comunes)
    const invalidCharPattern = /[<>{}[\]\\|`~!@#$%^&*()_+=]/;
    if (invalidCharPattern.test(trimmed)) return false;
    
    // Debe contener al menos un número (para el número de puerta)
    const hasNumber = /\d/.test(trimmed);
    if (!hasNumber) return false;
    
    // Debe contener al menos una letra (para el nombre de la calle)
    const hasLetter = /[a-zA-Z]/.test(trimmed);
    if (!hasLetter) return false;
    
    // No debe tener múltiples espacios consecutivos
    if (/\s{2,}/.test(trimmed)) return false;
    
    // Validación de estructura básica
    const words = trimmed.split(/\s+/);
    
    // Debe tener al menos 2 palabras (ej: "Calle 123" o "123 Main")
    if (words.length < 2) return false;
    
    // El primer o último elemento debe contener un número (para casos como "123 Main St" o "Main St 123")
    const firstHasNumber = /\d/.test(words[0]);
    const lastHasNumber = /\d/.test(words[words.length - 1]);
    
    if (!firstHasNumber && !lastHasNumber) {
        // Buscar número en cualquier posición
        let hasNumberAnywhere = false;
        for (let word of words) {
            if (/\d/.test(word)) {
                hasNumberAnywhere = true;
                break;
            }
        }
        if (!hasNumberAnywhere) return false;
    }
    
    // No debe ser solo números (debe tener texto)
    const allWordsAreNumbers = words.every(word => /^\d+$/.test(word));
    if (allWordsAreNumbers) return false;
    
    return true;
}
