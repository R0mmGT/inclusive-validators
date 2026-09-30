function validate(input) {
    // Verificar que el argumento sea un string
    if (typeof input !== 'string') {
        return false;
    }
    
    // Verificar longitud mínima y máxima razonable para un apellido
    if (input.length < 2 || input.length > 50) {
        return false;
    }
    
    // Verificar que no esté vacío después de trim
    const trimmedInput = input.trim();
    if (trimmedInput.length === 0) {
        return false;
    }
    
    // Patrón básico para apellidos:
    // - Puede contener letras (incluyendo acentos y diéresis comunes en español y otros idiomas europeos)
    // - Puede contener espacios, guiones o apóstrofes para apellidos compuestos
    // - Puede empezar con mayúscula (aunque no requerimos estrictamente esto)
    // - No puede contener números ni caracteres especiales adicionales
    
    const surnamePattern = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñÀàÈèÌìÒòÙùÂâÊêÎîÔôÛûÇçÄäËëÏïÖöÅåÆæØøß\s'-]+$/;
    
    if (!surnamePattern.test(trimmedInput)) {
        return false;
    }
    
    // Validaciones adicionales:
    
    // No puede contener solo espacios, guiones o apóstrofes
    if (/^[\s'-]+$/.test(trimmedInput)) {
        return false;
    }
    
    // No puede empezar ni terminar con guion o apóstrofe
    if (trimmedInput.startsWith('-') || trimmedInput.endsWith('-') || 
        trimmedInput.startsWith("'") || trimmedInput.endsWith("'")) {
        return false;
    }
    
    // No puede tener espacios múltiples consecutivos
    if (/\s\s+/.test(trimmedInput)) {
        return false;
    }
    
    // No puede tener guiones o apóstrofes consecutivos
    if (/--|''|'-|'-/.test(trimmedInput)) {
        return false;
    }
    
    // Debe contener al menos una letra (no solo espacios/separadores)
    if (!/[A-Za-zÁáÉéÍíÓóÚúÜüÑñÀàÈèÌìÒòÙùÂâÊêÎîÔôÛûÇçÄäËëÏïÖöÅåÆæØøß]/.test(trimmedInput)) {
        return false;
    }
    
    return true;
}
