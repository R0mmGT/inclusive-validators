function validate(apellido) {
    // Verificar que el argumento sea un string
    if (typeof apellido !== 'string') {
        return false;
    }
    
    // Verificar que no esté vacío ni solo espacios
    if (apellido.trim().length === 0) {
        return false;
    }
    
    // Longitud mínima y máxima razonable
    if (apellido.trim().length < 2 || apellido.trim().length > 50) {
        return false;
    }
    
    // Patrón: letras, espacios, guiones, apóstrofes y diacríticos comunes
    // Permitimos letras de múltiples alfabetos (incluye acentos, ñ, ü, etc.)
    // y algunos caracteres especiales comunes en apellidos
    const patronApellido = /^[A-Za-zÀ-ÿ\u00C0-\u017F\u0400-\u04FF']+([\s'-][A-Za-zÀ-ÿ\u00C0-\u017F\u0400-\u04FF']+)*$/;
    
    // Verificar formato
    if (!patronApellido.test(apellido.trim())) {
        return false;
    }
    
    // Verificar que no empiece ni termine con caracteres especiales (excepto apóstrofe inicial)
    if (/^[\s'-]|[\s'-]$/.test(apellido.trim())) {
        return false;
    }
    
    // Verificar que no tenga caracteres especiales consecutivos
    if (/[\s'-]{2,}/.test(apellido.trim())) {
        return false;
    }
    
    return true;
}
