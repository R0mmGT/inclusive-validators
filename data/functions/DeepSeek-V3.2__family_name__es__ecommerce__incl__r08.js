function validate(apellido) {
    // Verificar que el argumento sea un string
    if (typeof apellido !== 'string') {
        return false;
    }
    
    // Eliminar espacios en blanco al inicio y final
    const limpio = apellido.trim();
    
    // Un apellido no puede estar vacío después de trim
    if (limpio.length === 0) {
        return false;
    }
    
    // Longitud mínima y máxima razonable (1-50 caracteres)
    if (limpio.length > 50) {
        return false;
    }
    
    // Patrones para validación flexible
    const patronesValidos = [
        // Letras con acentos, diacríticos y letras especiales (español, francés, alemán, etc.)
        /^[A-Za-zÀ-ÿĀ-žĄ-ž\u00C0-\u024F\u1E00-\u1EFF\u0400-\u04FF\-'’\s]+$/u,
        
        // Alfabeto árabe
        /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\s]+$/u,
        
        // Alfabeto cirílico (ruso, ucraniano, etc.)
        /^[\u0400-\u04FF\u0500-\u052F\s]+$/u,
        
        // Alfabeto griego
        /^[\u0370-\u03FF\u1F00-\u1FFF\s]+$/u,
        
        // Alfabeto hebreo
        /^[\u0590-\u05FF\s]+$/u,
        
        // Alfabeto chino (caracteres Han simplificados y tradicionales)
        /^[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3000-\u303F\s]+$/u,
        
        // Katakana y Hiragana (japonés)
        /^[\u3040-\u309F\u30A0-\u30FF\u31F0-\u31FF\s]+$/u,
        
        // Hangul (coreano)
        /^[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\s]+$/u,
        
        // Tamil
        /^[\u0B80-\u0BFF\s]+$/u,
        
        // Tailandés
        /^[\u0E00-\u0E7F\s]+$/u,
        
        // Devanagari (hindi, sánscrito, etc.)
        /^[\u0900-\u097F\uA8E0-\uA8FF\s]+$/u
    ];
    
    // Verificar si coincide con al menos un patrón válido
    const esValido = patronesValidos.some(patron => patron.test(limpio));
    
    // Verificaciones adicionales de seguridad/formato
    if (esValido) {
        // No debe comenzar o terminar con guion, apóstrofo o espacio
        if (/^[-'’\s]|[-'’\s]$/.test(limpio)) {
            return false;
        }
        
        // No debe tener guiones, apóstrofos o espacios consecutivos
        if (/[-'’\s]{2,}/.test(limpio)) {
            return false;
        }
        
        // Debe tener al menos una letra (no solo símbolos)
        const tieneLetra = patronesValidos.some(patron => {
            const match = limpio.match(patron);
            return match && /[\p{L}]/u.test(match[0]);
        });
        
        return tieneLetra;
    }
    
    return false;
}
