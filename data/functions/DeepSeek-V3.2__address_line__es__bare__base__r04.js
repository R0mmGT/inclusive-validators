function validate(address) {
    // Validar que sea un string no vacío
    if (typeof address !== 'string' || address.trim() === '') {
        return false;
    }
    
    const trimmedAddress = address.trim();
    
    // Longitud razonable para una dirección (1-100 caracteres)
    if (trimmedAddress.length > 100 || trimmedAddress.length < 1) {
        return false;
    }
    
    // No debe empezar ni terminar con caracteres no válidos
    if (/^[,.!?;:\-\s]/.test(trimmedAddress) || /[,.!?;:\-\s]$/.test(trimmedAddress)) {
        return false;
    }
    
    // Debe contener al menos un número y algunas letras
    const hasNumber = /\d/.test(trimmedAddress);
    const hasLetters = /[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(trimmedAddress);
    
    if (!hasNumber || !hasLetters) {
        return false;
    }
    
    // No debe contener caracteres inválidos (solo permitir letras, números, espacios y algunos caracteres especiales comunes)
    const validChars = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,#\-/]+$/;
    if (!validChars.test(trimmedAddress)) {
        return false;
    }
    
    // No debe tener múltiples espacios consecutivos
    if (/\s{2,}/.test(trimmedAddress)) {
        return false;
    }
    
    // No debe tener múltiples puntos, comas o guiones consecutivos
    if (/[.,\-]{2,}/.test(trimmedAddress)) {
        return false;
    }
    
    // El número debe estar en una posición válida (generalmente al inicio o después de algún separador)
    const addressParts = trimmedAddress.split(/[\s,]+/);
    let hasValidNumberPosition = false;
    
    for (const part of addressParts) {
        if (/^\d+[a-zA-Z]?$/.test(part) || /^\d+[a-zA-Z]?\s/.test(part) || /\s\d+[a-zA-Z]?$/.test(trimmedAddress)) {
            hasValidNumberPosition = true;
            break;
        }
    }
    
    // También considerar casos como "Calle 123" o "Avenida 5 de Mayo"
    if (!hasValidNumberPosition) {
        // Buscar patrones comunes de direcciones
        const commonPatterns = [
            /\d+\s+[a-zA-Z]/,  // número seguido de palabra
            /[a-zA-Z]+\s+\d+/,  // palabra seguida de número
            /#\s*\d+/,          // símbolo # seguido de número
            /\d+\s*-\s*\d+/,    // rango numérico
            /\d+[a-zA-Z]\b/,    // número con letra (ej: 123A)
        ];
        
        hasValidNumberPosition = commonPatterns.some(pattern => pattern.test(trimmedAddress));
    }
    
    if (!hasValidNumberPosition) {
        return false;
    }
    
    // Debe tener al menos 2 palabras (ej: "Calle 123" o "123 Main St")
    const wordCount = trimmedAddress.split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount < 2) {
        return false;
    }
    
    return true;
}
