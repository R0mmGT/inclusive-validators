function validate(name) {
    // Validación básica de tipo y longitud
    if (typeof name !== 'string') return false;
    
    const trimmedName = name.trim();
    if (trimmedName.length < 1 || trimmedName.length > 100) return false;
    
    // Verificar que no contenga solo espacios
    if (trimmedName === '') return false;
    
    // Patrones de caracteres permitidos (amplios para cubrir múltiples culturas)
    // Letras, espacios internos, guiones, apóstrofos, puntos y algunos caracteres diacríticos comunes
    const validCharacters = /^[\p{L}\s.'\-]+$/u;
    if (!validCharacters.test(trimmedName)) return false;
    
    // Validaciones específicas de estructura
    const invalidPatterns = [
        // No debe comenzar o terminar con caracteres no alfabéticos (excepto apóstrofe inicial en algunos nombres)
        /^[.\-\s]|[\-\s.]$/,
        // No debe tener múltiples espacios consecutivos
        /\s\s+/,
        // No debe tener guiones o apóstrofos consecutivos
        /[.\-']{2,}/,
        // No debe tener puntos consecutivos
        /\.\.+/,
        // No debe tener combinaciones inválidas como " ." o ". " (excepto iniciales como "J. R.")
        /\s\.|\.\s(?!\p{L})/u
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmedName)) return false;
    }
    
    // Verificar que contenga al menos una letra
    const hasLetter = /[\p{L}]/u.test(trimmedName);
    if (!hasLetter) return false;
    
    // Verificar que no sea un título o prefijo común
    const commonTitles = ['mr', 'mrs', 'ms', 'miss', 'dr', 'prof', 'sir', 'madam', 'lord', 'lady'];
    const lowerName = trimmedName.toLowerCase();
    if (commonTitles.some(title => lowerName.startsWith(title + ' ') || lowerName === title)) {
        return false;
    }
    
    // Validaciones adicionales
    // 1. No debe contener solo iniciales sin nombre completo (como "A.")
    if (/^[A-Za-z]\.?$/.test(trimmedName)) return false;
    
    // 2. Para nombres con iniciales, verificar formato válido (ej: "J. R. R. Tolkien")
    if (trimmedName.includes('.')) {
        const parts = trimmedName.split(/\s+/);
        let initialCount = 0;
        let fullNameCount = 0;
        
        for (const part of parts) {
            if (/^[A-Za-z]\.$/.test(part)) {
                initialCount++;
            } else if (/^[\p{L}]+$/u.test(part)) {
                fullNameCount++;
            }
        }
        
        // Debe tener al menos un nombre completo o una combinación válida
        if (fullNameCount === 0 && initialCount > 0) {
            // Permitir solo si hay al menos dos iniciales (ej: "J. R.")
            if (initialCount < 2) return false;
        }
    }
    
    // 3. Verificar que no sean números disfrazados
    if (/^\d+$/.test(trimmedName.replace(/[.\-\s']/g, ''))) return false;
    
    return true;
}
