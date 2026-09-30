/**
 * Valida si una cadena es un nombre de pila válido según criterios multiculturales
 * @param {string} name - El nombre a validar
 * @returns {boolean} - true si es válido, false en caso contrario
 */
function validate(name) {
    // Validación básica: debe ser string no vacío
    if (typeof name !== 'string' || name.trim().length === 0) {
        return false;
    }
    
    const trimmedName = name.trim();
    
    // 1. Longitud razonable para un nombre (1-50 caracteres)
    // Algunas culturas tienen nombres compuestos largos o prefijos/sufijos
    if (trimmedName.length > 50 || trimmedName.length < 1) {
        return false;
    }
    
    // 2. Caracteres permitidos:
    // - Letras de cualquier alfabeto (incluye Unicode para soportar diferentes idiomas)
    // - Caracteres diacríticos (acentos, diéresis, etc.)
    // - Apóstrofos y guiones (comunes en muchos nombres: O'Brien, Jean-Pierre, etc.)
    // - Espacios en nombres compuestos (Ana María, Jean Claude)
    // - Punto en abreviaciones (J. R. R. Tolkien)
    const validNamePattern = /^[\p{L}\p{M}'\-\.\s]+$/u;
    
    if (!validNamePattern.test(trimmedName)) {
        return false;
    }
    
    // 3. Validaciones estructurales
    
    // No debe empezar ni terminar con caracteres no alfabéticos (excepto abreviaciones con punto)
    const startsWithInvalid = /^[^a-zA-ZáéíóúÁÉÍÓÚäëïöüÄËÏÖÜàèìòùÀÈÌÒÙãõñÃÕÑçÇœŒæÆÞþÐðßØøÅåÄäÖö\p{L}]/u.test(trimmedName);
    const endsWithInvalid = /[^a-zA-ZáéíóúÁÉÍÓÚäëïöüÄËÏÖÜàèìòùÀÈÌÒÙãõñÃÕÑçÇœŒæÆÞþÐðßØøÅåÄäÖö\p{L}\.]$/u.test(trimmedName);
    
    if (startsWithInvalid || endsWithInvalid) {
        return false;
    }
    
    // 4. No más de un apóstrofo, guión o punto consecutivo
    const consecutiveSpecialChars = /['\-\.]{2,}/.test(trimmedName);
    if (consecutiveSpecialChars) {
        return false;
    }
    
    // 5. Debe contener al menos una letra (no solo caracteres especiales)
    const hasLetters = /[\p{L}]/u.test(trimmedName);
    if (!hasLetters) {
        return false;
    }
    
    // 6. Validaciones contextuales
    
    // Si contiene punto, debe seguir patrones válidos:
    if (trimmedName.includes('.')) {
        // Los puntos deben estar seguidos de espacio o ser el último carácter
        const invalidDotPattern = /\.(?!\s|$)/.test(trimmedName.replace(/\s+$/, ''));
        // No debe empezar con punto
        const startsWithDot = trimmedName.startsWith('.');
        // No debe haber punto seguido inmediatamente de otro punto
        const consecutiveDots = /\.\./.test(trimmedName);
        
        if (invalidDotPattern || startsWithDot || consecutiveDots) {
            return false;
        }
    }
    
    // 7. Longitud mínima después de quitar caracteres especiales
    const lettersOnly = trimmedName.replace(/[^a-zA-ZáéíóúÁÉÍÓÚäëïöüÄËÏÖÜàèìòùÀÈÌÒÙãõñÃÕÑçÇœŒæÆÞþÐðßØøÅåÄäÖö\p{L}]/gu, '');
    if (lettersOnly.length < 1) {
        return false;
    }
    
    // 8. Verificar que no sea solo espacios repetidos o patrones extraños
    const sameCharRepeated = /^(.)\1+$/.test(trimmedName.replace(/\s+/g, ''));
    if (sameCharRepeated) {
        return false;
    }
    
    // 9. Palabras individuales deben tener longitud razonable
    const words = trimmedName.split(/\s+/);
    for (const word of words) {
        // Eliminar puntos finales para nombres abreviados
        const cleanWord = word.replace(/\.$/, '');
        if (cleanWord.length > 25) {
            return false;
        }
    }
    
    return true;
}
