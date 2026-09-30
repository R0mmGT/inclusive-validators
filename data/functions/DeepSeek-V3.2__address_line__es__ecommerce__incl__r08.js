function validate(addressLine) {
    // Validación básica: no vacío, longitud razonable, no solo espacios
    if (typeof addressLine !== 'string' || addressLine.trim() === '') {
        return false;
    }
    
    const trimmed = addressLine.trim();
    const length = trimmed.length;
    
    // Longitud razonable para una dirección postal (2-200 caracteres)
    if (length < 2 || length > 200) {
        return false;
    }
    
    // No debe consistir únicamente de números (las direcciones suelen tener texto)
    if (/^\d+$/.test(trimmed)) {
        return false;
    }
    
    // Validación de caracteres: permite letras, números, espacios y caracteres comunes en direcciones
    // Incluye caracteres acentuados, letras internacionales y símbolos comunes
    const validCharsPattern = /^[\p{L}\p{M}\d\s.,'\-/#&()\[\]@+:;"]+$/u;
    if (!validCharsPattern.test(trimmed)) {
        return false;
    }
    
    // Debe contener al menos una letra (incluyendo letras internacionales)
    const hasLetter = /[\p{L}\p{M}]/u.test(trimmed);
    if (!hasLetter) {
        return false;
    }
    
    // Validación de patrones sospechosos o inadecuados
    const suspiciousPatterns = [
        /(.)\1{10,}/, // Carácter repetido más de 10 veces
        /test\s+address/i,
        /asdf|qwer|zxcv/i, // Patrones de teclado
        /^\s*\d+\s*$/, // Solo números (ya cubierto pero por si acaso)
        /https?:\/\//i, // URLs
        /[<>\\|{}~^`]/, // Caracteres técnicos raros en direcciones
    ];
    
    for (const pattern of suspiciousPatterns) {
        if (pattern.test(trimmed)) {
            return false;
        }
    }
    
    // No debe comenzar o terminar con caracteres no alfabéticos/dígitos (espacios ya eliminados)
    if (/^[.,'\-/#&()\[\]@+:;"]/.test(trimmed) || /[.,'\-/#&()\[\]@+:;"]$/.test(trimmed)) {
        return false;
    }
    
    // Verificar estructura básica: debe contener algún número o alguna palabra significativa
    // Dividir en palabras y verificar que haya al menos una palabra con 2+ caracteres
    const words = trimmed.split(/\s+/).filter(word => word.length >= 2);
    if (words.length === 0) {
        return false;
    }
    
    // Verificar proporción de caracteres válidos vs total
    const validChars = trimmed.match(/[\p{L}\p{M}\d]/gu);
    if (!validChars || validChars.length / length < 0.5) {
        return false;
    }
    
    return true;
}
