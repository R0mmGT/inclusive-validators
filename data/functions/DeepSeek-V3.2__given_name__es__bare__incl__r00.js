function validate(name) {
    if (typeof name !== 'string') {
        return false;
    }
    
    const trimmedName = name.trim();
    
    if (trimmedName.length === 0 || trimmedName.length > 100) {
        return false;
    }
    
    // Patrones que definitivamente no son nombres válidos
    const invalidPatterns = [
        /^\d+$/, // Solo números
        /^[^a-zA-ZÀ-ÿ\s\-'’.]+$/, // Sin letras (incluye caracteres latinos extendidos)
        /\n|\r|\t/, // Saltos de línea o tabs
        /[\x00-\x1F\x7F-\x9F]/, // Caracteres de control
        /^\.|\.$|^\-|\-$|^\'|\'$/, // Puntos o guiones/apóstrofes al inicio/final (a menos que sea parte de construcción)
        /\-\-|\'\'|\.\./, // Secuencias repetidas de guiones, apóstrofes o puntos
        /\s\s+/, // Múltiples espacios consecutivos
        /[\[\]{}()<>]/, // Corchetes, llaves, paréntesis, brackets
        /[@#$%^&*+=|\\:;"<>?~`]/, // Símbolos técnicos/matemáticos
        /^\s+$/ // Solo espacios
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmedName)) {
            return false;
        }
    }
    
    // Verificar que tenga al menos una letra (incluyendo caracteres acentuados)
    if (!/[a-zA-ZÀ-ÿ]/.test(trimmedName)) {
        return false;
    }
    
    // Patrones para nombres compuestos y con apóstrofes/guiones (válidos en muchas culturas)
    const validNamePatterns = [
        /^[a-zA-ZÀ-ÿ]+([\s\-'][a-zA-ZÀ-ÿ]+)*$/, // Ej: "Jean-Pierre", "O'Connor", "María José"
        /^[a-zA-ZÀ-ÿ]+\s+[a-zA-ZÀ-ÿ]+(\s+[a-zA-ZÀ-ÿ]+)*$/, // Múltiples nombres
        /^[a-zA-ZÀ-ÿ]+['’][a-zA-ZÀ-ÿ]+$/ // Apóstrofes internos: "D'Angelo"
    ];
    
    // Verificar que coincida con al menos un patrón válido
    for (const pattern of validNamePatterns) {
        if (pattern.test(trimmedName)) {
            // Verificación adicional para nombres con prefijos/partículas
            const nameParts = trimmedName.split(/[\s\-']/);
            
            // Cada parte debe tener al menos 1 letra
            for (const part of nameParts) {
                if (part.length === 0 || !/[a-zA-ZÀ-ÿ]/.test(part)) {
                    return false;
                }
                
                // Las partes muy cortas deben ser válidas (ej: "Al", "Ed", "Jo")
                if (part.length === 1 && !/[a-zA-ZÀ-ÿ]/.test(part)) {
                    return false;
                }
            }
            
            return true;
        }
    }
    
    return false;
}
