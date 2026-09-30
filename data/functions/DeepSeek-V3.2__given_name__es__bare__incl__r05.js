function validate(name) {
    // Validaciones básicas
    if (typeof name !== 'string') return false;
    
    const trimmedName = name.trim();
    if (trimmedName.length < 1) return false;
    if (trimmedName.length > 100) return false; // Límite razonable para nombres
    
    // Verificar que no sea solo espacios o caracteres de control
    if (!/[^\s\u0000-\u001F]/.test(trimmedName)) return false;
    
    // Verificar que contenga al menos una letra (incluyendo Unicode)
    if (!/\p{L}/u.test(trimmedName)) return false;
    
    // Patrones comunes inválidos
    const invalidPatterns = [
        /^\d+$/, // Solo números
        /^[^a-zA-Z\p{L}]*$/u, // Sin letras en absoluto
        /^test$/i, // Palabra 'test'
        /^admin$/i, // Palabra 'admin'
        /^user$/i, // Palabra 'user'
        /^unknown$/i, // Palabra 'unknown'
        /^null$/i, // Palabra 'null'
        /^undefined$/i, // Palabra 'undefined'
        /^\.+$/, // Solo puntos
        /^-+$/, // Solo guiones
        /^_+$/, // Solo guiones bajos
        /^[\s\p{Z}]+$/u, // Solo espacios/separadores Unicode
        /^\s*$/, // Solo espacios (ya cubierto pero por seguridad)
    ];
    
    if (invalidPatterns.some(pattern => pattern.test(trimmedName))) {
        return false;
    }
    
    // Verificar caracteres permitidos (muy inclusivo)
    // Permite letras Unicode, espacios, guiones, apóstrofes, puntos y algunos caracteres especiales
    // que aparecen en nombres de diversas culturas
    const allowedCharacters = /^[\p{L}\p{M}\s\-'.]+$/u;
    
    if (!allowedCharacters.test(trimmedName)) {
        // Si no pasa el patrón general, verificamos caso por caso para ser más inclusivos
        // Algunos nombres pueden contener paréntesis, números romanos, etc.
        const nameParts = trimmedName.split(/\s+/);
        const validParts = nameParts.every(part => {
            // Verificar que cada parte tenga al menos una letra
            if (!/\p{L}/u.test(part)) return false;
            
            // Permitir caracteres especiales comunes en nombres
            const partPattern = /^[\p{L}\p{M}\-'.()\d]+$/u;
            return partPattern.test(part);
        });
        
        if (!validParts) return false;
    }
    
    // Verificar que no tenga secuencias inválidas
    const invalidSequences = [
        /--/, // Dos guiones seguidos
        /''/, // Dos apóstrofes seguidos
        /\.\./, // Dos puntos seguidos
        /\s\s/, // Dos espacios seguidos (revisar después del trim)
        /^-/, // Comienza con guión
        /-$/, // Termina con guión
        /^'/, // Comienza con apóstrofe
        /'$/, // Termina con apóstrofe
        /^\./, // Comienza con punto
        /\.$/, // Termina con punto
    ];
    
    if (invalidSequences.some(pattern => pattern.test(trimmedName))) {
        return false;
    }
    
    // Verificar estructura básica
    const words = trimmedName.split(/\s+/).filter(word => word.length > 0);
    if (words.length === 0) return false;
    
    // Cada palabra debe tener al menos un carácter que no sea puntuación
    for (const word of words) {
        const lettersOnly = word.replace(/[^\p{L}\p{M}]/gu, '');
        if (lettersOnly.length === 0) return false;
        
        // Verificar que no sea solo puntuación repetida
        if (/^[.\-'()]+$/.test(word)) return false;
    }
    
    // Validación adicional para casos extremos
    const normalized = trimmedName.normalize('NFC');
    
    // Evitar inyección de código o patrones sospechosos
    const suspiciousPatterns = [
        /<script/i,
        /javascript:/i,
        /onload=/i,
        /onerror=/i,
        /onclick=/i,
        /eval\(/i,
        /alert\(/i,
        /document\./i,
        /window\./i,
        /fromCharCode/i,
        /\bSELECT\b/i,
        /\bINSERT\b/i,
        /\bUPDATE\b/i,
        /\bDELETE\b/i,
        /\bDROP\b/i,
        /union/i,
        /\/\*.*\*\//,
        /--/, // Comentarios SQL
    ];
    
    if (suspiciousPatterns.some(pattern => pattern.test(normalized))) {
        return false;
    }
    
    // Verificar codificación válida
    try {
        encodeURIComponent(normalized);
    } catch (e) {
        return false;
    }
    
    return true;
}
