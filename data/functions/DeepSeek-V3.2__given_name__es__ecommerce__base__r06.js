function validate(input) {
    // Verificar que el input sea un string
    if (typeof input !== 'string') {
        return false;
    }
    
    // Eliminar espacios al inicio y final
    const trimmed = input.trim();
    
    // Validar longitud mínima y máxima (1-50 caracteres)
    if (trimmed.length < 1 || trimmed.length > 50) {
        return false;
    }
    
    // Validar que contenga solo letras, espacios, guiones y apóstrofes comunes en nombres
    // Permite letras con acentos, diéresis y letras de otros alfabetos
    const nameRegex = /^[\p{L}\s'.-]+$/u;
    if (!nameRegex.test(trimmed)) {
        return false;
    }
    
    // Validar que no comience ni termine con caracteres no alfabéticos
    const firstChar = trimmed.charAt(0);
    const lastChar = trimmed.charAt(trimmed.length - 1);
    const letterRegex = /\p{L}/u;
    if (!letterRegex.test(firstChar) || !letterRegex.test(lastChar)) {
        return false;
    }
    
    // Validar que no tenga caracteres especiales repetidos de manera sospechosa
    const suspiciousPatterns = [
        /'.{0,1}'/,       // Dos apóstrofes muy juntos
        /-{2,}/,          // Dos o más guiones consecutivos
        /\.{2,}/,         // Dos o más puntos consecutivos
        /\s{2,}/,         // Dos o más espacios consecutivos
        /^[^a-zA-ZáéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ]/, // Comienza con caracter no alfabético
        /[^a-zA-ZáéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ]$/  // Termina con caracter no alfabético
    ];
    
    for (const pattern of suspiciousPatterns) {
        if (pattern.test(trimmed)) {
            return false;
        }
    }
    
    // Validar que tenga al menos una letra (por si solo tuviera espacios o caracteres especiales)
    const hasLetter = /\p{L}/u.test(trimmed);
    if (!hasLetter) {
        return false;
    }
    
    // Validar formato: debe comenzar con mayúscula y luego minúsculas
    // Divide por espacios, guiones o apóstrofes para verificar cada parte
    const parts = trimmed.split(/[\s'-]+/).filter(part => part.length > 0);
    
    for (const part of parts) {
        // Cada parte debe comenzar con una letra
        if (!letterRegex.test(part.charAt(0))) {
            return false;
        }
        
        // Verificar que no sea una palabra de una sola letra (excepto iniciales con punto)
        if (part.length === 1 && !part.endsWith('.')) {
            return false;
        }
        
        // Verificar que no haya mayúsculas en medio de una palabra (excepto después de apóstrofe)
        for (let i = 1; i < part.length; i++) {
            const char = part.charAt(i);
            const prevChar = part.charAt(i - 1);
            
            // Permitir mayúscula después de apóstrofe (O'Connor)
            if (char === char.toUpperCase() && char !== char.toLowerCase() && prevChar !== "'") {
                // Verificar si es una letra con tilde mayúscula
                if (!/^[ÁÉÍÓÚÄËÏÖÜÑ]$/.test(char)) {
                    return false;
                }
            }
        }
    }
    
    return true;
}
