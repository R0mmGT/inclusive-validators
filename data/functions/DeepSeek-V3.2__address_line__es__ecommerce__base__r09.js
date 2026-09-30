function validate(address) {
    // Verificar que el argumento sea un string
    if (typeof address !== 'string') {
        return false;
    }

    const trimmedAddress = address.trim();
    
    // Dirección no puede estar vacía después de quitar espacios
    if (trimmedAddress.length === 0) {
        return false;
    }

    // Longitud mínima y máxima razonable para una dirección
    if (trimmedAddress.length < 5 || trimmedAddress.length > 100) {
        return false;
    }

    // Debe contener al menos un dígito (número de casa/edificio)
    if (!/\d/.test(trimmedAddress)) {
        return false;
    }

    // Debe contener al menos una letra (nombre de calle)
    if (!/[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(trimmedAddress)) {
        return false;
    }

    // No debe contener caracteres prohibidos o sospechosos
    const prohibitedChars = /[<>{}[\]\\|`~^*]/;
    if (prohibitedChars.test(trimmedAddress)) {
        return false;
    }

    // No debe contener URLs o protocolos web
    const urlPattern = /(https?:\/\/|www\.|ftp:\/\/)/i;
    if (urlPattern.test(trimmedAddress)) {
        return false;
    }

    // No debe ser solo números y símbolos (debe tener texto significativo)
    const meaningfulText = /[a-zA-ZáéíóúÁÉÍÓÚñÑ].*[a-zA-ZáéíóúÁÉÍÓÚñÑ]/;
    if (!meaningfulText.test(trimmedAddress)) {
        return false;
    }

    // Patrones comunes de direcciones válidas
    const validPatterns = [
        // Ej: "Calle Mayor 123"
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+ \d+(\s*[a-zA-Z0-9\/\-]*)*$/,
        // Ej: "Av. Libertador 456-789"
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.]+ \d+[\-\s\d\/]*[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
        // Ej: "123 Main Street"
        /^\d+\s+[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        // Ej: "C/ San Martín, 45, 2ºA"
        /^[a-zA-Z\/\.]+\s+[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+ \d+.*$/,
        // Ej: "Paseo del Prado, 28"
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+,\s*\d+.*$/
    ];

    // Verificar si coincide con al menos un patrón válido
    return validPatterns.some(pattern => pattern.test(trimmedAddress));
}
