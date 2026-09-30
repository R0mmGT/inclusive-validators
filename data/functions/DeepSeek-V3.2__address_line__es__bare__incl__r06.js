function validate(street) {
    // Verificar que el argumento es un string
    if (typeof street !== 'string') {
        return false;
    }
    
    // Eliminar espacios al inicio y final
    const trimmed = street.trim();
    
    // Una dirección no puede estar vacía después de trim
    if (trimmed.length === 0) {
        return false;
    }
    
    // Longitud mínima razonable (ej: "A 1" o "1" en algunos países)
    if (trimmed.length < 1) {
        return false;
    }
    
    // Longitud máxima razonable para una línea de dirección (250 caracteres)
    if (trimmed.length > 250) {
        return false;
    }
    
    // Caracteres básicos permitidos en direcciones internacionales:
    // - Letras (incluyendo acentos y caracteres internacionales)
    // - Números
    // - Espacios
    // - Guiones, puntos, comas, barras, apóstrofes, paréntesis
    // - Caracteres específicos de direcciones (# para números de apartamento, etc.)
    const basicPattern = /^[\p{L}\p{N}\s\-\.,\/#'"()&]+$/u;
    
    if (!basicPattern.test(trimmed)) {
        return false;
    }
    
    // Debe contener al menos una letra o un número
    const hasLetterOrNumber = /[\p{L}\p{N}]/u.test(trimmed);
    if (!hasLetterOrNumber) {
        return false;
    }
    
    // No debe contener solo espacios repetidos
    if (/^\s+$/.test(trimmed)) {
        return false;
    }
    
    // No debe contener secuencias inválidas de caracteres
    // Ej: múltiples puntos seguidos, guiones al inicio/final, etc.
    const invalidSequences = [
        /^[\/\.,\-]+$/,  // Solo caracteres de puntuación
        /[\.,\-]{3,}/,   // Tres o más puntos, comas o guiones seguidos
        /^\s*[\/\.,\-]+\s*$/,  // Solo puntuación con espacios
    ];
    
    for (const pattern of invalidSequences) {
        if (pattern.test(trimmed)) {
            return false;
        }
    }
    
    // Verificar que no tenga más de 4 espacios consecutivos
    if (/\s{5,}/.test(trimmed)) {
        return false;
    }
    
    // Para direcciones internacionales, no podemos imponer un formato específico
    // ya que los formatos varían enormemente entre países:
    // - "Calle Mayor 123" (España)
    // - "123 Main St" (EEUU)
    // - "Av. Paulista, 1000" (Brasil)
    // - "Τσακάλωφ 34" (Grecia)
    // - "вул. Хрещатик, 22" (Ucrania)
    // - "東京渋谷区道玄坂２丁目" (Japón)
    // - "الرياض، العليا، شارع الملك فهد" (Arabia Saudita)
    
    return true;
}
