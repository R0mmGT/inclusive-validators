function validate(postalCode) {
    // Validaciones básicas
    if (typeof postalCode !== 'string') {
        return false;
    }
    
    // Eliminar espacios en blanco al inicio y final
    const trimmedCode = postalCode.trim();
    
    // Un código postal no puede estar vacío
    if (trimmedCode.length === 0) {
        return false;
    }
    
    // Los códigos postales generalmente tienen entre 2 y 10 caracteres
    if (trimmedCode.length < 2 || trimmedCode.length > 10) {
        return false;
    }
    
    // Algunos países usan códigos postales con letras, números o ambos
    // Patrones de códigos postales por país (formato, longitud específica)
    const countryPatterns = {
        // Estados Unidos: 5 dígitos o 5+4 dígitos
        'US': /^\d{5}(-\d{4})?$/,
        // Canadá: A1A 1A1 (alternando letra, número, letra, espacio, número, letra, número)
        'CA': /^[A-Z]\d[A-Z] \d[A-Z]\d$/,
        // Reino Unido: Formato complejo, múltiples patrones
        'UK': /^(GIR\s?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|[A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))|[0-9][A-HJKS-UW])\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i,
        // Australia: 4 dígitos
        'AU': /^\d{4}$/,
        // Alemania: 5 dígitos
        'DE': /^\d{5}$/,
        // Francia: 5 dígitos
        'FR': /^\d{5}$/,
        // España: 5 dígitos
        'ES': /^\d{5}$/,
        // Italia: 5 dígitos
        'IT': /^\d{5}$/,
        // Japón: 3 dígitos + 4 dígitos (123-4567)
        'JP': /^\d{3}-\d{4}$/,
        // Brasil: 5 dígitos + 3 dígitos (12345-678)
        'BR': /^\d{5}-\d{3}$/,
        // India: 6 dígitos
        'IN': /^\d{6}$/,
        // México: 5 dígitos
        'MX': /^\d{5}$/,
        // China: 6 dígitos
        'CN': /^\d{6}$/,
        // Rusia: 6 dígitos
        'RU': /^\d{6}$/,
        // Argentina: 4 dígitos o 8 con formato
        'AR': /^[A-Z]\d{4}[A-Z]{3}$|^\d{4}$/,
        // Países Bajos: 4 dígitos + 2 letras (1234 AB)
        'NL': /^\d{4}\s?[A-Z]{2}$/,
    };
    
    // Patrones generales que cubren la mayoría de los casos
    const generalPatterns = [
        // Solo números (2-10 dígitos) - usado en muchos países
        /^\d{2,10}$/,
        // Números con guión (formato 12345-6789)
        /^\d{3,10}-\d{2,5}$/,
        // Números con espacio (12345 678)
        /^\d{3,10}\s\d{2,5}$/,
        // Letras y números combinados
        /^[A-Z0-9\s\-]{2,10}$/i,
        // Códigos alfanuméricos sin espacios (A1B2C3)
        /^[A-Z0-9]{2,10}$/i,
    ];
    
    // Primero verificar si cumple con algún patrón específico de país
    for (const pattern of Object.values(countryPatterns)) {
        if (pattern.test(trimmedCode)) {
            return true;
        }
    }
    
    // Luego verificar patrones generales
    for (const pattern of generalPatterns) {
        if (pattern.test(trimmedCode)) {
            return true;
        }
    }
    
    // Algunas validaciones adicionales de sentido común
    // No debe contener solo ceros (a menos que sea válido en algún país específico)
    if (/^0+$/.test(trimmedCode)) {
        return false;
    }
    
    // No debe contener caracteres especiales (excepto guión y espacio que ya están permitidos)
    if (/[^A-Z0-9\s\-]/i.test(trimmedCode)) {
        return false;
    }
    
    // No debe tener múltiples espacios consecutivos o guiones
    if (/\s{2,}/.test(trimmedCode) || /-{2,}/.test(trimmedCode)) {
        return false;
    }
    
    // Verificación final: si pasa las validaciones generales de estructura
    // Debe contener al menos un dígito (la mayoría de códigos postales tienen números)
    if (!/\d/.test(trimmedCode)) {
        // Excepto para algunos códigos especiales como "GIR 0AA" en UK
        // que ya fueron validados por los patrones específicos
        return false;
    }
    
    // Si llegamos aquí y el código tiene una estructura razonable, lo consideramos válido
    // Esto es intencionalmente permisivo para acomodar formatos desconocidos
    const reasonableStructure = /^[A-Z0-9]+([\s\-][A-Z0-9]+)*$/i.test(trimmedCode);
    const reasonableLength = trimmedCode.replace(/[\s\-]/g, '').length >= 3;
    
    return reasonableStructure && reasonableLength;
}
