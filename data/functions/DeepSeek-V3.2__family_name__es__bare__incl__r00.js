/**
 * Valida si una cadena es un apellido de persona válido considerando
 * diversidad internacional.
 * 
 * Reglas de validación:
 * 1. No vacío y longitud máxima razonable (ej. 70 caracteres)
 * 2. Solo contiene letras, espacios, guiones, apóstrofes, puntos y algunos
 *    caracteres diacríticos comunes
 * 3. No comienza ni termina con caracteres no alfabéticos (excepto apóstrofes 
 *    y guiones en algunos casos culturales)
 * 4. No contiene patrones no válidos como múltiples espacios consecutivos
 * 
 * @param {string} apellido - El apellido a validar
 * @returns {boolean} - true si es válido, false en caso contrario
 */
function validate(apellido) {
    // Validación básica: no vacío y longitud máxima
    if (typeof apellido !== 'string' || apellido.trim().length === 0 || apellido.length > 70) {
        return false;
    }
    
    const trimmed = apellido.trim();
    
    // Patrón principal que acepta:
    // - Letras de múltiples alfabetos (incluye Unicode para soportar caracteres internacionales)
    // - Espacios simples, guiones, apóstrofes y puntos
    // - Caracteres diacríticos comunes (á, é, ö, ç, ñ, etc.)
    const validCharactersPattern = /^[\p{L}]([\p{L}\s'\-\.])*[\p{L}]$/u;
    
    // Verificar que comience y termine con letra (con excepciones culturales)
    const startsWithLetter = /^[\p{L}]/u.test(trimmed);
    const endsWithLetter = /[\p{L}]$/u.test(trimmed);
    
    // Algunas culturas permiten apóstrofes o guiones al inicio/final (ej. O'Connor, -Smith)
    // pero implementamos reglas más estrictas para casos generales
    
    // Verificar caracteres válidos en todo el string
    const allValidChars = /^[\p{L}\s'\-\.]+$/u.test(trimmed);
    
    // Verificar que no haya múltiples espacios, guiones o apóstrofes consecutivos
    const noMultipleSeparators = !/(\s{2,}|'{2,}|\-{2,}|\.{2,})/.test(trimmed);
    
    // Verificar que no haya combinaciones inválidas como espacio seguido de guión
    const noInvalidCombinations = !/(\s[\-\']|[\-\']\s)/.test(trimmed);
    
    // Verificar que no sea solo caracteres especiales
    const notOnlySpecialChars = /[\p{L}]/u.test(trimmed);
    
    // Casos especiales culturales (ej. apellidos con "de la", "van der", etc.)
    // Permitimos estos patrones siempre que cumplan reglas básicas
    
    // Verificar que tenga al menos una letra y no solo números o símbolos
    const hasAtLeastOneLetter = /[\p{L}]/u.test(trimmed);
    
    // Validación para apellidos con prefijos comunes (de, van, von, etc.)
    // Estos son válidos aunque tengan espacios
    const validWithSpaces = trimmed.split(/\s+/).every(part => {
        // Cada parte separada por espacios debe tener al menos una letra
        return /[\p{L}]/u.test(part) && /^[\p{L}'\-\.]+$/u.test(part);
    });
    
    return (
        startsWithLetter &&
        endsWithLetter &&
        allValidChars &&
        noMultipleSeparators &&
        noInvalidCombinations &&
        notOnlySpecialChars &&
        hasAtLeastOneLetter &&
        validWithSpaces &&
        validCharactersPattern.test(trimmed)
    );
}
