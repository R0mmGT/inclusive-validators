function validate(addressLine) {
    // Verificar que sea un string
    if (typeof addressLine !== 'string') {
        return false;
    }
    
    // Longitud mínima y máxima razonable para una dirección
    if (addressLine.length < 3 || addressLine.length > 100) {
        return false;
    }
    
    // No debe contener solo espacios o caracteres no imprimibles
    if (addressLine.trim().length === 0) {
        return false;
    }
    
    // Debe contener al menos un número (generalmente el número de casa)
    if (!/\d/.test(addressLine)) {
        return false;
    }
    
    // Debe contener al menos una letra (generalmente el nombre de la calle)
    if (!/[a-zA-Z]/.test(addressLine)) {
        return false;
    }
    
    // Caracteres permitidos: letras, números, espacios, puntos, comas, guiones, barras, símbolos comunes
    if (!/^[a-zA-Z0-9\s.,\-/#&'"()]+$/.test(addressLine)) {
        return false;
    }
    
    // No debe contener secuencias de espacios múltiples consecutivos
    if (/\s{3,}/.test(addressLine)) {
        return false;
    }
    
    // No debe contener palabras de más de 25 caracteres (probable error)
    const words = addressLine.split(/\s+/);
    for (const word of words) {
        if (word.length > 25) {
            return false;
        }
    }
    
    // Debe tener una estructura básica: al menos dos partes (número y calle)
    const trimmedAddress = addressLine.trim();
    const parts = trimmedAddress.split(/\s+/);
    if (parts.length < 2) {
        return false;
    }
    
    // Verificar que haya al menos una palabra con solo letras (nombre de calle)
    const hasLetterWord = parts.some(part => /^[a-zA-Z]+$/.test(part) || /^[a-zA-Z]+[a-zA-Z.'-]*$/.test(part));
    if (!hasLetterWord) {
        return false;
    }
    
    return true;
}
