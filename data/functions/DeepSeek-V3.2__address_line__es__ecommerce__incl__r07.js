/**
 * Valida si una cadena es una dirección postal (calle) válida.
 * @param {string} address - La dirección a validar.
 * @returns {boolean} - `true` si es válida, `false` en caso contrario.
 */
function validate(address) {
    // Validaciones básicas
    if (typeof address !== 'string') return false;
    
    const trimmedAddress = address.trim();
    
    // 1. No vacía después de trim
    if (trimmedAddress.length === 0) return false;
    
    // 2. Longitud mínima y máxima razonable (1-200 caracteres)
    if (trimmedAddress.length < 1 || trimmedAddress.length > 200) return false;
    
    // 3. Contiene al menos un carácter alfanumérico (evita solo símbolos/puntuación)
    if (!/[a-zA-Z0-9]/.test(trimmedAddress)) return false;
    
    // 4. Caracteres permitidos (amplio para diferentes culturas)
    // - Letras (incluyendo acentos y caracteres internacionales)
    // - Números
    // - Espacios
    // - Símbolos comunes en direcciones: .,-/#'&()@
    // - Caracteres Unicode adicionales para otros alfabetos
    const allowedPattern = /^[\p{L}\p{N}\s.,\-\/#&'()@]+$/u;
    if (!allowedPattern.test(trimmedAddress)) return false;
    
    // 5. Validaciones estructurales
    // a) No puede empezar o terminar con caracteres no alfanuméricos (excepto si es número inicial)
    if (/^[^\p{L}\p{N}]/.test(trimmedAddress) || /[^\p{L}\p{N}]$/.test(trimmedAddress)) {
        // Permite números al inicio (como "123 Main St")
        if (!/^\p{N}/u.test(trimmedAddress) && !/^\p{L}/u.test(trimmedAddress)) return false;
        // Permite terminaciones comunes como "St." o "Ave."
        const commonSuffixes = /\.|st|street|ave|avenue|rd|road|ln|lane|dr|drive|blvd|boulevard$/i;
        if (!commonSuffixes.test(trimmedAddress.toLowerCase())) return false;
    }
    
    // b) No puede tener múltiples espacios consecutivos
    if (/\s{2,}/.test(trimmedAddress)) return false;
    
    // c) Debe tener al menos un espacio (para separar calle/número) O
    //    comenzar con número seguido de letra (como "123Main")
    //    O ser una dirección válida de una sola palabra (menos común pero posible)
    const hasSpace = /\s/.test(trimmedAddress);
    const startsWithNumberThenLetter = /^\p{N}+[\p{L}\p{N}]/u.test(trimmedAddress);
    const singleWordWithMinLength = /^[\p{L}\p{N}]{3,}$/u.test(trimmedAddress);
    
    if (!hasSpace && !startsWithNumberThenLetter && !singleWordWithMinLength) {
        return false;
    }
    
    // d) No puede tener solo números (a menos que sea un número de dirección corto válido, como "123")
    if (/^\p{N}+$/u.test(trimmedAddress)) {
        // Permite números cortos para direcciones como "123", pero no largos como "123456"
        return trimmedAddress.length <= 5;
    }
    
    // 6. Palabras prohibidas o no válidas
    const invalidWords = [
        'prueba', 'test', 'ejemplo', 'example', 'undefined', 'null', 
        'calle falsa', 'fake street', 'invalid', 'no válido'
    ];
    const lowerAddress = trimmedAddress.toLowerCase();
    if (invalidWords.some(word => lowerAddress.includes(word))) return false;
    
    // 7. Validación de formato específico por país (patrones comunes)
    // Esto es opcional y puede expandirse según necesidades
    
    return true;
}
