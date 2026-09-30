function validate(addressLine) {
    // Verificar que el argumento sea un string
    if (typeof addressLine !== 'string') {
        return false;
    }
    
    // Eliminar espacios al inicio y final
    const trimmedAddress = addressLine.trim();
    
    // Longitud mínima y máxima razonable
    if (trimmedAddress.length < 2 || trimmedAddress.length > 200) {
        return false;
    }
    
    // Debe contener al menos un carácter que no sea espacio
    if (!trimmedAddress.match(/[^\s]/)) {
        return false;
    }
    
    // Caracteres permitidos (amplio para diferentes idiomas y formatos):
    // - Letras de cualquier alfabeto (incluyendo acentos y caracteres especiales)
    // - Números
    // - Espacios
    // - Caracteres comunes en direcciones: .,-/#'()[]&@
    // - Símbolos de moneda o unidades si son relevantes (ej: $, €, №)
    const allowedCharacters = /^[\p{L}\p{N}\s.,\-/#'()\[\]&@$€№º°ªçÇñÑ¡!¿?]*$/u;
    if (!allowedCharacters.test(trimmedAddress)) {
        return false;
    }
    
    // No debe contener solo números
    if (/^\d+$/.test(trimmedAddress.replace(/\s/g, ''))) {
        return false;
    }
    
    // No debe contener secuencias repetitivas (como "aaaaaaa" o "123123123")
    if (/(.)\1{5,}/.test(trimmedAddress.replace(/\s/g, ''))) {
        return false;
    }
    
    // Validaciones específicas para evitar entradas no válidas:
    
    // No debe ser solo caracteres especiales o puntuación
    if (!trimmedAddress.match(/[\p{L}\p{N}]/u)) {
        return false;
    }
    
    // No debe contener palabras comúnmente usadas en pruebas o spam
    const invalidPatterns = [
        /test/i,
        /prueba/i,
        /asdf/i,
        /qwerty/i,
        /xxxx/i,
        /aaaa/i,
        /falso/i,
        /fake/i,
        /example/i,
        /ejemplo/i,
        /undefined/i,
        /null/i,
        /insertar/i,
        /direccion/i
    ];
    
    // Solo rechazar si el patrón coincide con toda la dirección (o casi toda)
    // para no invalidar direcciones legítimas que puedan contener estas palabras
    const lowerAddress = trimmedAddress.toLowerCase();
    for (const pattern of invalidPatterns) {
        // Solo rechazar si la dirección es corta y coincide exactamente
        // o si es claramente una entrada de prueba
        if (pattern.test(lowerAddress) && 
            (trimmedAddress.length < 20 || 
             new RegExp(`^${pattern.source}$`, 'i').test(trimmedAddress))) {
            return false;
        }
    }
    
    // Verificar proporción de caracteres (no demasiados números o símbolos)
    const letterCount = (trimmedAddress.match(/[\p{L}]/gu) || []).length;
    const digitCount = (trimmedAddress.match(/\p{N}/gu) || []).length;
    const symbolCount = trimmedAddress.length - letterCount - digitCount - (trimmedAddress.match(/\s/g) || []).length;
    
    // Debe tener una proporción razonable de letras (al menos 30% de los caracteres no espaciados)
    const nonSpaceChars = trimmedAddress.replace(/\s/g, '').length;
    if (nonSpaceChars > 0 && (letterCount / nonSpaceChars) < 0.3) {
        return false;
    }
    
    // No demasiados símbolos (menos del 40% de los caracteres no espaciados)
    if (nonSpaceChars > 0 && (symbolCount / nonSpaceChars) > 0.4) {
        return false;
    }
    
    // Debe contener al menos una palabra con 2 o más letras
    const words = trimmedAddress.split(/\s+/).filter(word => word.length > 0);
    const hasMeaningfulWord = words.some(word => {
        const lettersOnly = word.replace(/[^\p{L}]/gu, '');
        return lettersOnly.length >= 2;
    });
    
    if (!hasMeaningfulWord) {
        return false;
    }
    
    return true;
}
