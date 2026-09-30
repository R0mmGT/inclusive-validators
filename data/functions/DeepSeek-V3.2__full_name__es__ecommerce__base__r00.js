function validate(input) {
    // Verificar que el input sea un string no vacío
    if (typeof input !== 'string' || input.trim().length === 0) {
        return false;
    }
    
    const name = input.trim();
    
    // Verificar longitud razonable (1-70 caracteres)
    if (name.length > 70 || name.length < 1) {
        return false;
    }
    
    // Verificar que solo contenga letras, espacios, apóstrofes, guiones y puntos
    // (permitiendo caracteres acentuados y letras internacionales)
    const validNamePattern = /^[\p{L}\s'.-\p{M}]+$/u;
    if (!validNamePattern.test(name)) {
        return false;
    }
    
    // Verificar que no comience ni termine con espacios, guiones, puntos o apóstrofes
    if (/^[\s.'-]|[\s.'-]$/.test(name)) {
        return false;
    }
    
    // Verificar que no contenga secuencias inválidas (como dos puntos seguidos)
    if (/\.\.|--|''|\s\s/.test(name)) {
        return false;
    }
    
    // Verificar que tenga al menos un espacio (nombre y apellido)
    // pero permitir nombres de una sola palabra para casos especiales
    const nameParts = name.split(/\s+/).filter(part => part.length > 0);
    
    if (nameParts.length < 1) {
        return false;
    }
    
    // Verificar que cada parte tenga al menos 2 caracteres (excepto iniciales con punto)
    for (const part of nameParts) {
        // Permitir iniciales con punto como "J. R. R. Tolkien"
        if (part.length === 2 && part.endsWith('.')) {
            continue;
        }
        
        // Las partes normales deben tener al menos 2 caracteres
        if (part.length < 2) {
            return false;
        }
        
        // Verificar que no sean solo números
        if (/^\d+$/.test(part)) {
            return false;
        }
    }
    
    // Verificar que tenga al menos una letra (no solo símbolos)
    if (!/\p{L}/u.test(name)) {
        return false;
    }
    
    // Verificar mayúsculas/minúsculas: primera letra de cada palabra debe ser mayúscula
    // (pero ser flexible con nombres como "de la Fuente" o "mcDonald")
    const words = name.split(/\s+/);
    for (let i = 0; i < words.length; i++) {
        const word = words[i].replace(/[.'-]/g, '');
        if (word.length > 0) {
            const firstLetter = word.charAt(0);
            // Permitir prefijos comunes en minúscula
            const commonPrefixes = ['de', 'la', 'las', 'los', 'del', 'y', 'el', 'van', 'von', 'di', 'da'];
            const isCommonPrefix = commonPrefixes.includes(word.toLowerCase());
            const isAfterHyphen = i > 0 && words[i-1].endsWith('-');
            
            if (!isCommonPrefix && !isAfterHyphen && !/[A-ZÁÉÍÓÚÑ]/.test(firstLetter)) {
                return false;
            }
        }
    }
    
    return true;
}
