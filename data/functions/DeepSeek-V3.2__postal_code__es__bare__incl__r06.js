function validate(postalCode) {
    // Validar que el argumento es string
    if (typeof postalCode !== 'string') return false;
    
    // Eliminar espacios al inicio y final
    const trimmedCode = postalCode.trim();
    
    // Verificar longitud mínima y máxima global
    if (trimmedCode.length < 2 || trimmedCode.length > 10) return false;
    
    // Patrones por países basados en estándares internacionales
    const patterns = {
        // Estados Unidos: 5 dígitos o 5+4
        'US': /^\d{5}(-\d{4})?$/,
        // Canadá: A1A 1A1
        'CA': /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,
        // México: 5 dígitos
        'MX': /^\d{5}$/,
        // Reino Unido: múltiples formatos (ej: AA1A 1AA, A1 1AA, etc.)
        'UK': /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i,
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
        // Brasil: 8 dígitos (11111-111)
        'BR': /^\d{5}-\d{3}$/,
        // Argentina: 4 caracteres alfanuméricos (A999 o 9999)
        'AR': /^[A-Z]\d{4}[A-Z]{3}$|^\d{4}$/,
        // India: 6 dígitos
        'IN': /^\d{6}$/,
        // China: 6 dígitos
        'CN': /^\d{6}$/,
        // Japón: 7 dígitos (999-9999)
        'JP': /^\d{3}-\d{4}$|^\d{7}$/,
        // Corea del Sur: 5 dígitos (desde 2015)
        'KR': /^\d{5}$/,
        // Rusia: 6 dígitos
        'RU': /^\d{6}$/,
        // Formato genérico 1: Solo dígitos (3-10 dígitos)
        'DIGITS': /^\d{3,10}$/,
        // Formato genérico 2: Alfanuméricos con posibles espacios/guiones
        'ALPHANUM': /^[A-Z0-9][A-Z0-9\s\-]{1,8}[A-Z0-9]$/i
    };
    
    // Probar patrones específicos primero
    for (const pattern of Object.values(patterns)) {
        if (pattern.test(trimmedCode)) {
            return true;
        }
    }
    
    return false;
}
