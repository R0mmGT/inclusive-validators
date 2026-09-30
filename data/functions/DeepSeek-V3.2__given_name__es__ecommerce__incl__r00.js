function validate(name) {
    // Verificar que el argumento sea un string
    if (typeof name !== 'string') {
        return false;
    }

    // Eliminar espacios en blanco al inicio y final
    const trimmedName = name.trim();
    
    // Verificar que no esté vacío después de trim
    if (trimmedName.length === 0) {
        return false;
    }

    // Longitud mínima y máxima razonable para un nombre
    if (trimmedName.length < 1 || trimmedName.length > 100) {
        return false;
    }

    // Verificar que solo contenga caracteres válidos para nombres
    // Permitir letras, espacios, guiones, apóstrofos y puntos (para abreviaciones)
    // Usar Unicode para soportar todos los alfabetos
    const validNamePattern = /^[\p{L}\p{M}'\-\.\s]+$/u;
    if (!validNamePattern.test(trimmedName)) {
        return false;
    }

    // Verificar que no empiece ni termine con caracteres no alfabéticos
    const startsWithLetter = /^[\p{L}\p{M}]/u.test(trimmedName);
    const endsWithLetter = /[\p{L}\p{M}]$/u.test(trimmedName);
    if (!startsWithLetter || !endsWithLetter) {
        return false;
    }

    // Verificar que no tenga caracteres especiales repetidos en secuencia
    const repeatedSpecials = /['\-\.\s]{2,}/u.test(trimmedName);
    if (repeatedSpecials) {
        return false;
    }

    // Verificar que no tenga solo espacios o caracteres especiales
    const onlyLettersPattern = /[\p{L}\p{M}]/u;
    if (!onlyLettersPattern.test(trimmedName)) {
        return false;
    }

    // Verificar que no contenga números
    const hasNumbers = /\d/u.test(trimmedName);
    if (hasNumbers) {
        return false;
    }

    // Verificar que no contenga caracteres de control o emojis
    const hasControlChars = /[\p{C}\p{Emoji}]/u.test(trimmedName);
    if (hasControlChars) {
        return false;
    }

    // Validaciones específicas para patrones problemáticos
    // No permitir solo puntos o guiones
    if (/^[\.\-']+$/.test(trimmedName.replace(/[^\-\'\.]/g, ''))) {
        return false;
    }

    // Verificar que tenga al menos una letra (considerando nombres compuestos)
    const lettersOnly = trimmedName.replace(/[^\p{L}\p{M}]/gu, '');
    if (lettersOnly.length === 0) {
        return false;
    }

    // Verificar formato general (no más de 4 partes separadas por espacios/guiones)
    const nameParts = trimmedName.split(/[\s\-]+/);
    if (nameParts.length > 6) { // Permitir hasta 6 partes para nombres muy largos
        return false;
    }

    // Cada parte debe comenzar con una letra
    for (const part of nameParts) {
        if (part.length > 0 && !/^[\p{L}\p{M}]/u.test(part)) {
            return false;
        }
    }

    return true;
}
