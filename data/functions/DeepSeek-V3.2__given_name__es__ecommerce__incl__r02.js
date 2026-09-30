function validate(name) {
    // Validaciones básicas
    if (typeof name !== 'string') return false;
    
    const trimmedName = name.trim();
    
    // Verificar longitud mínima y máxima razonable
    if (trimmedName.length < 1 || trimmedName.length > 50) return false;
    
    // Verificar que no contenga solo espacios, números o caracteres especiales
    if (!/[a-zA-ZÀ-ÖØ-öø-ÿ]/.test(trimmedName)) return false;
    
    // Verificar caracteres inválidos (permitir letras, espacios, guiones y apóstrofos comunes)
    const validCharsRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ'\-\.\s]+$/;
    if (!validCharsRegex.test(trimmedName)) return false;
    
    // Verificar patrones sospechosos
    const suspiciousPatterns = [
        /^\d+$/,                         // Solo números
        /[<>{}[\]\\\/|@#$%^&*_+=`~]/,    // Caracteres técnicos/inseguros
        /script/i,                       // Posible inyección
        /SELECT|INSERT|UPDATE|DELETE/i,  // SQL
        /\.{3,}/,                        // Múltiples puntos consecutivos
        /\-{3,}/,                        // Múltiples guiones consecutivos
        /'{3,}/                          // Múltiples apóstrofos consecutivos
    ];
    
    if (suspiciousPatterns.some(pattern => pattern.test(trimmedName))) {
        return false;
    }
    
    // Verificar que haya al menos una letra válida
    const letterGroups = trimmedName.split(/[\s'\-\.]+/);
    const hasValidPart = letterGroups.some(part => 
        part.length > 0 && /[a-zA-ZÀ-ÖØ-öø-ÿ]/.test(part)
    );
    
    if (!hasValidPart) return false;
    
    // Verificar estructura básica (no empezar/finalizar con caracteres especiales)
    if (/^[\s'\-\.]|[\s'\-\.]$/.test(trimmedName)) return false;
    
    // Verificar nombres excesivamente repetitivos
    const simplified = trimmedName.toLowerCase().replace(/[^a-z]/g, '');
    if (simplified.length > 2) {
        const uniqueChars = new Set(simplified);
        if (uniqueChars.size === 1) return false; // Solo un carácter repetido
    }
    
    return true;
}
