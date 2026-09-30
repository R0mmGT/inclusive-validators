function validate(phone) {
    // Eliminar espacios al inicio y final
    const trimmed = phone.trim();
    
    // Verificar que no esté vacío
    if (!trimmed) return false;
    
    // Patrones válidos:
    // 1. +34 seguido de 9 dígitos
    // 2. 0034 seguido de 9 dígitos  
    // 3. 9 dígitos (sin prefijo)
    // 4. 6 seguido de 8 dígitos (móviles españoles sin prefijo)
    
    const patterns = [
        /^\+34[0-9]{9}$/,      // +34xxxxxxxxx
        /^0034[0-9]{9}$/,      // 0034xxxxxxxxx
        /^[0-9]{9}$/,          // xxxxxxxxx (9 dígitos)
        /^6[0-9]{8}$/          // 6xxxxxxxx (móviles)
    ];
    
    // Verificar si coincide con algún patrón
    return patterns.some(pattern => pattern.test(trimmed));
}
