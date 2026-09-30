function validate(address) {
    // Verificar que el argumento sea un string
    if (typeof address !== 'string') {
        return false;
    }

    // Eliminar espacios al inicio y final
    const trimmedAddress = address.trim();
    
    // Verificar que no esté vacío
    if (trimmedAddress.length === 0) {
        return false;
    }

    // Longitud mínima y máxima razonable
    if (trimmedAddress.length < 3 || trimmedAddress.length > 100) {
        return false;
    }

    // No debe empezar o terminar con caracteres inválidos
    if (/^[.,;:\-_\s]/.test(trimmedAddress) || /[.,;:\-_\s]$/.test(trimmedAddress)) {
        return false;
    }

    // Debe contener al menos una letra (alfabética de cualquier idioma)
    if (!/[a-zA-Z\u00C0-\u00FF]/.test(trimmedAddress)) {
        return false;
    }

    // Debe contener al menos un número si es una dirección completa
    // (direcciones como "Calle Mayor" son válidas para nombres de calles)
    // Esta regla se relaja para permitir nombres de calles sin número

    // No debe contener caracteres prohibidos
    const prohibitedChars = /[*+=\[\]{}()<>@#$%^&|\\]/;
    if (prohibitedChars.test(trimmedAddress)) {
        return false;
    }

    // No debe tener múltiples espacios consecutivos
    if (/\s{2,}/.test(trimmedAddress)) {
        return false;
    }

    // Patrones comunes de direcciones
    const addressPatterns = [
        // Formato con número: "Calle Ejemplo 123"
        /^[a-zA-Z\u00C0-\u00FF\s]+ \d+[a-zA-Z]?$/,
        
        // Formato con número y piso: "Calle Ejemplo 123, 2ºA"
        /^[a-zA-Z\u00C0-\u00FF\s]+ \d+,?\s*\d*[ºªa-zA-Z]?[a-zA-Z]?$/,
        
        // Formato con número, bloque, escalera: "Calle Ejemplo 123, Bloque 2, Escalera A"
        /^[a-zA-Z\u00C0-\u00FF\s]+ \d+,?\s*(Bloque|Blq|B|Edificio|Ed|E)\s*\d*,?\s*(Escalera|Esc|Puerta|Pta|P)\s*[a-zA-Z0-9]+$/,
        
        // Solo nombre de calle (sin número): "Avenida de la Constitución"
        /^[a-zA-Z\u00C0-\u00FF\s]+$/,
        
        // Con km: "Carretera Nacional VI, km 12"
        /^[a-zA-Z\u00C0-\u00FF\s]+,\s*[kK][mM]\s*\d+$/,
        
        // Con urbanización: "Calle Olivos, Urb. Los Pinos"
        /^[a-zA-Z\u00C0-\u00FF\s]+,\s*(Urb|Urbanización)\.[\s\w\u00C0-\u00FF]+$/
    ];

    // Verificar si coincide con algún patrón
    const matchesPattern = addressPatterns.some(pattern => pattern.test(trimmedAddress));
    
    // Contar componentes básicos
    const words = trimmedAddress.split(/\s+/);
    if (words.length < 1) {
        return false;
    }

    // Verificar que la mayoría de palabras tengan sentido (mezcla de letras y números permitida)
    const validWordCount = words.filter(word => {
        // Una palabra válida puede ser:
        // 1. Solo letras (incluyendo acentos): "Calle", "Mayor"
        // 2. Números: "123"
        // 3. Números con letras: "2ºA", "123B"
        // 4. Abreviaturas comunes: "Av.", "C/", "Nº"
        return /^[a-zA-Z\u00C0-\u00FF]+\.?$/.test(word) || 
               /^\d+[ºªa-zA-Z]?$/.test(word) ||
               /^(Av|C|Pza|Pl|Glta|Urb|Ed|Blq|B)\.?$/.test(word) ||
               /^[Nn]º$/.test(word) ||
               /^[kK][mM]$/.test(word);
    }).length;

    // Al menos el 70% de las palabras deben ser válidas
    const validWordRatio = validWordCount / words.length;
    
    return (matchesPattern || validWordRatio >= 0.7);
}
