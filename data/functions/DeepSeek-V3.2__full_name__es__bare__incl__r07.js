/**
 * Valida si una cadena es un nombre completo de persona válido
 * Consideraciones para múltiples culturas:
 * 1. Permite caracteres alfabéticos de diversos idiomas (incluyendo acentos)
 * 2. Permite espacios, guiones y apóstrofes como separadores
 * 3. Rechaza números, símbolos especiales y solo espacios
 * 4. Valida longitud mínima y estructura básica
 * 
 * @param {string} input - Cadena a validar como nombre completo
 * @returns {boolean} - true si es válido, false en caso contrario
 */
function validate(input) {
    // Verificar que el input sea string y tenga longitud
    if (typeof input !== 'string' || input.length === 0) {
        return false;
    }
    
    // Verificar longitud mínima y máxima razonable para nombres
    // Mínimo: 2 caracteres (ej: "Li" o "Al")
    // Máximo: 100 caracteres para nombres muy largos con prefijos/títulos
    if (input.length < 2 || input.length > 100) {
        return false;
    }
    
    // Eliminar espacios en blanco al inicio y final
    const trimmedInput = input.trim();
    
    // Verificar que no quede vacío después del trim
    if (trimmedInput.length === 0) {
        return false;
    }
    
    // Patrón principal que permite:
    // 1. Letras (incluyendo Unicode para soportar diversos idiomas)
    // 2. Espacios, guiones y apóstrofes como separadores
    // 3. Puntos para iniciales o abreviaciones (ej: "J. R. R. Tolkien")
    // 4. Caracteres diacríticos (acentos, diéresis, etc.)
    const namePattern = /^[\p{L}\p{M}]([\p{L}\p{M}'.-]*(?:\s+[\p{L}\p{M}'.-]+)*)$/u;
    
    // Verificar patrón básico
    if (!namePattern.test(trimmedInput)) {
        return false;
    }
    
    // Validaciones adicionales:
    
    // 1. No puede comenzar o terminar con separadores
    const invalidStartEnd = /^[\s'.-]|[\s'.-]$/;
    if (invalidStartEnd.test(trimmedInput)) {
        return false;
    }
    
    // 2. No permite separadores consecutivos (ej: "Juan--López")
    const consecutiveSeparators = /[\s'.-]{2,}/;
    if (consecutiveSeparators.test(trimmedInput)) {
        return false;
    }
    
    // 3. Debe contener al menos un espacio (para nombre completo)
    //    o al menos dos palabras si consideramos nombres de una sola palabra válidos
    //    pero para nombre "completo" normalmente esperamos al menos nombre y apellido
    
    // Contar palabras (secuencias de letras separadas por espacios válidos)
    const words = trimmedInput.split(/[\s-]+/).filter(word => {
        // Filtrar palabras que contengan al menos una letra
        return /[\p{L}\p{M}]/u.test(word);
    });
    
    // Un nombre completo válido debe tener al menos 2 palabras significativas
    // Esto cubre la mayoría de las culturas (nombre + apellido)
    if (words.length < 2) {
        return false;
    }
    
    // 4. Cada palabra debe tener al menos una letra y longitud mínima
    for (const word of words) {
        // Eliminar puntos, apóstrofes y guiones para verificar letras
        const cleanWord = word.replace(/['.-]/g, '');
        
        // Palabra debe contener al menos un carácter alfabético
        if (cleanWord.length === 0) {
            return false;
        }
        
        // Palabra debe tener al menos 2 letras (excepto iniciales como "J.")
        // pero las iniciales ya están cubiertas por el patrón principal
    }
    
    // 5. Verificar que no sea solo números o caracteres especiales
    const onlySpecialChars = /^[^a-zA-ZáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙäëïöüÄËÏÖÜâêîôûÂÊÎÔÛãñõÃÑÕçÇ\p{L}]*$/u;
    if (onlySpecialChars.test(trimmedInput.replace(/[\s'.-]/g, ''))) {
        return false;
    }
    
    return true;
}
