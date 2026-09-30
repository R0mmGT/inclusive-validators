function validate(phoneNumber) {
    // Validar que sea string y no esté vacío
    if (typeof phoneNumber !== 'string' || !phoneNumber.trim()) {
        return false;
    }
    
    // Normalizar: eliminar espacios, guiones, puntos, paréntesis
    // y caracteres especiales comunes excepto el signo +
    let normalized = phoneNumber.replace(/[\s\-\.()]/g, '');
    
    // Validar longitud mínima y máxima (ajustado para teléfonos internacionales)
    // La longitud mínima típica (sin código de país) es 4 dígitos
    // La máxima común es 15 dígitos (incluyendo código de país)
    const digitsOnly = normalized.replace(/\D/g, '');
    if (digitsOnly.length < 4 || digitsOnly.length > 15) {
        return false;
    }
    
    // Patrones específicos para casos comunes
    const patterns = [
        // Formato internacional con + y código de país (ej: +34666777888)
        /^\+\d{1,4}\d{4,14}$/,
        // Formato con 00 y código de país (ej: 0034666777888)
        /^00\d{1,4}\d{4,14}$/,
        // Formato local sin código de país (al menos 4 dígitos)
        /^\d{4,15}$/,
        // Formato E.164: + seguido de 1-15 dígitos
        /^\+\d{1,15}$/,
        // Códigos especiales cortos (servicios de emergencia, información)
        /^\d{3,4}$/,
        // Números premium/tarifas especiales que pueden empezar con *
        /^[\*\#]\d+$/,
    ];
    
    // Verificar si coincide con algún patrón
    for (const pattern of patterns) {
        if (pattern.test(normalized)) {
            return true;
        }
    }
    
    // Patrón genérico flexible: mezcla de dígitos, +, *, # al inicio
    // y posiblemente algunos separadores comunes
    const genericPattern = /^[\+\*\#]?[\d\s\-\.\(\)]{4,20}$/;
    const cleanedGeneric = phoneNumber.replace(/[\s\-\.\(\)]/g, '');
    const hasMinimumDigits = (cleanedGeneric.match(/\d/g) || []).length >= 4;
    
    return genericPattern.test(phoneNumber) && hasMinimumDigits;
}
