function validate(address) {
    // Verificar que sea un string y no esté vacío
    if (typeof address !== 'string' || address.trim() === '') {
        return false;
    }

    const trimmedAddress = address.trim();
    const length = trimmedAddress.length;
    
    // Longitudes razonables para una dirección
    if (length < 5 || length > 100) {
        return false;
    }

    // Patrón básico: debe contener al menos un número y algún texto
    // Formato típico: número + espacio + texto (ej: "123 Main St")
    // También acepta formatos como "Calle Mayor, 123" o "Av. Libertador 1234"
    
    // Verificar que tenga al menos un dígito (para el número)
    if (!/\d/.test(trimmedAddress)) {
        return false;
    }

    // Verificar que tenga al menos una letra (para el nombre de la calle)
    if (!/[a-zA-ZÀ-ÿ]/.test(trimmedAddress)) {
        return false;
    }

    // Verificar caracteres permitidos
    // Letras, números, espacios, puntos, comas, guiones, apóstrofes, barras, símbolos de número y almohadilla
    const allowedChars = /^[a-zA-Z0-9À-ÿ\s\.,\-'/#ñÑáéíóúÁÉÍÓÚüÜ&]+$/;
    if (!allowedChars.test(trimmedAddress)) {
        return false;
    }

    // Verificar que no tenga múltiples espacios consecutivos
    if (/\s{2,}/.test(trimmedAddress)) {
        return false;
    }

    // Verificar que no empiece o termine con caracteres no alfabéticos/númericos
    // (excepto símbolos comunes como # que pueden ir al inicio)
    if (/^[.,\s\-]/.test(trimmedAddress) || /[.,\s\-]$/.test(trimmedAddress)) {
        return false;
    }

    // Verificar que haya al menos 2 palabras (número y calle mínimo)
    const words = trimmedAddress.split(/\s+/).filter(word => word.length > 0);
    if (words.length < 2) {
        return false;
    }

    // Verificar que no todas las palabras sean solo números
    const allWordsAreNumbers = words.every(word => /^\d+$/.test(word));
    if (allWordsAreNumbers) {
        return false;
    }

    // Verificar que no tenga secuencias repetitivas (como "aaa" o "123123")
    const hasRepetitivePattern = /(.+?)\1{2,}/.test(trimmedAddress.replace(/\s/g, ''));
    if (hasRepetitivePattern) {
        return false;
    }

    // Verificar formato específico de dirección
    // Al menos un patrón que se parezca a "número + algo" o "algo + número"
    const addressPatterns = [
        /\d+\s+[a-zA-ZÀ-ÿ]/,        // número seguido de texto
        /[a-zA-ZÀ-ÿ]+\s+\d+/,        // texto seguido de número
        /#\d+\s+[a-zA-ZÀ-ÿ]/,       // #número seguido de texto
        /[a-zA-ZÀ-ÿ]+\s*,\s*\d+/    // texto, número
    ];

    const isValidPattern = addressPatterns.some(pattern => pattern.test(trimmedAddress));
    
    return isValidPattern;
}
