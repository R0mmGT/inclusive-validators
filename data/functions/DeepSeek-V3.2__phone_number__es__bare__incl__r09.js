function validate(phoneString) {
    // Validación básica de entrada
    if (typeof phoneString !== 'string' || phoneString.trim() === '') {
        return false;
    }
    
    // Eliminar espacios, guiones, puntos, paréntesis y el signo +
    let cleaned = phoneString.replace(/[\s\-\.\(\)]/g, '');
    
    // Detectar y manejar prefijo internacional (+ o 00)
    if (cleaned.startsWith('+')) {
        cleaned = cleaned.substring(1);
    } else if (cleaned.startsWith('00')) {
        cleaned = cleaned.substring(2);
    }
    
    // Eliminar ceros iniciales si no es un prefijo internacional
    // (algunos países usan 0 como prefijo nacional)
    if (cleaned.length > 0 && cleaned[0] === '0') {
        cleaned = cleaned.substring(1);
    }
    
    // Verificar que solo contenga dígitos
    if (!/^\d+$/.test(cleaned)) {
        return false;
    }
    
    // Longitudes de teléfono típicas en el mundo (sin prefijo internacional)
    // Mínimo: 5 dígitos (algunas islas pequeñas)
    // Máximo: 15 dígitos (incluyendo código de país extenso)
    const minLength = 5;
    const maxLength = 15;
    
    // Verificar longitud
    if (cleaned.length < minLength || cleaned.length > maxLength) {
        return false;
    }
    
    // Patrones específicos por código de país (opcional pero útil)
    // Aquí podríamos agregar validaciones más específicas por país
    
    // Verificación adicional: no todos los dígitos iguales
    if (/^(\d)\1+$/.test(cleaned)) {
        return false; // Ej: 111111, 222222, etc.
    }
    
    // Si pasa todas las validaciones
    return true;
}
