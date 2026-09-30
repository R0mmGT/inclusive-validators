function validate(phoneString) {
    if (typeof phoneString !== 'string') {
        return false;
    }
    
    // Limpiar espacios en blanco al principio y al final
    const cleaned = phoneString.trim();
    
    // Casos especiales que deben rechazarse
    if (cleaned === '' || cleaned.length < 5) {
        return false;
    }
    
    // Eliminar caracteres comunes en números de teléfono
    // Permitimos: dígitos, '+', '-', '(', ')', '.', y espacios
    let normalized = '';
    for (let i = 0; i < cleaned.length; i++) {
        const char = cleaned[i];
        if ((char >= '0' && char <= '9') || char === '+') {
            normalized += char;
        } else if (char === '-' || char === '(' || char === ')' || char === '.' || char === ' ') {
            // Estos caracteres se ignoran pero no se añaden
            continue;
        } else {
            // Carácter no permitido
            return false;
        }
    }
    
    // Verificar que haya al menos algunos dígitos
    const digitCount = normalized.replace(/\D/g, '').length;
    if (digitCount < 5) {
        return false;
    }
    
    // Verificar formato básico
    // 1. Si empieza con '+', debe tener al menos 2 dígitos después
    if (normalized.startsWith('+')) {
        if (normalized.length < 3) {
            return false;
        }
        // El '+' debe ir seguido de dígitos
        if (!/^\+\d+$/.test(normalized)) {
            return false;
        }
        // Eliminar el '+' para contar dígitos
        const digitsOnly = normalized.substring(1);
        // Debe tener entre 5 y 15 dígitos (límites razonables internacionales)
        if (digitsOnly.length < 5 || digitsOnly.length > 15) {
            return false;
        }
    } else {
        // Si no empieza con '+', debe contener solo dígitos
        if (!/^\d+$/.test(normalized)) {
            return false;
        }
        // Longitud razonable para números sin código de país
        if (normalized.length < 5 || normalized.length > 15) {
            return false;
        }
    }
    
    // Validaciones adicionales de sentido común
    // 1. No todos los dígitos iguales (ej: 1111111111)
    const digitsOnly = normalized.replace(/\D/g, '');
    if (/^(\d)\1+$/.test(digitsOnly)) {
        return false;
    }
    
    // 2. Verificar patrones inválidos comunes (como muchos ceros)
    const zeroCount = (digitsOnly.match(/0/g) || []).length;
    if (zeroCount > digitsOnly.length * 0.8) {
        return false;
    }
    
    // 3. Verificar que no sea un número claramente inválido
    // (esto es una lista mínima, se podría expandir)
    const invalidPatterns = [
        /^123456/,
        /^111111/,
        /^000000/,
        /^999999/,
        /^012345/,
        /^543210/
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(digitsOnly)) {
            return false;
        }
    }
    
    // Si pasó todas las validaciones
    return true;
}
