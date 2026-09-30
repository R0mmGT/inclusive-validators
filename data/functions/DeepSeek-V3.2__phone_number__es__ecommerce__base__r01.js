function validate(phoneString) {
    // Eliminar espacios en blanco al inicio y al final
    const trimmed = phoneString.trim();
    
    // Verificar que no esté vacío
    if (!trimmed) return false;
    
    // Verificar longitud básica (entre 8 y 15 dígitos es un rango razonable)
    const digitsOnly = trimmed.replace(/\D/g, '');
    if (digitsOnly.length < 8 || digitsOnly.length > 15) return false;
    
    // Patrón para teléfonos internacionales/móviles
    // Permite: +34 666 123 456, 666-123-456, (555) 123-4567, 555.123.4567, etc.
    const patterns = [
        // Internacional: +34 666 123 456
        /^\+\d{1,3}[\s.-]?\d{1,4}[\s.-]?\d{3}[\s.-]?\d{3,4}$/,
        
        // Con paréntesis: (555) 123-4567
        /^\(\d{3}\)[\s.-]?\d{3}[\s.-]?\d{4}$/,
        
        // Con guiones o puntos: 555-123-4567, 555.123.4567
        /^\d{3}[\s.-]?\d{3}[\s.-]?\d{4}$/,
        
        // Solo números: 5551234567 (10 dígitos)
        /^\d{8,15}$/,
        
        // Con espacios: 555 123 4567
        /^\d{3}[\s]?\d{3}[\s]?\d{4}$/,
        
        // Móviles españoles: 6XX XXX XXX o 7XX XXX XXX
        /^[67]\d{2}[\s.-]?\d{3}[\s.-]?\d{3}$/,
        
        // Teléfonos fijos españoles: 9XX XXX XXX
        /^9\d{2}[\s.-]?\d{3}[\s.-]?\d{3}$/
    ];
    
    // Verificar si coincide con algún patrón válido
    return patterns.some(pattern => pattern.test(trimmed));
}
