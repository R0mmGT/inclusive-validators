function validate(phoneString) {
    // Validación básica de entrada
    if (typeof phoneString !== 'string') {
        return false;
    }
    
    // Eliminar espacios en blanco al inicio y final
    const trimmed = phoneString.trim();
    
    // Verificar si la cadena está vacía después del trim
    if (trimmed.length === 0) {
        return false;
    }
    
    // Expresión regular flexible para números de teléfono internacionales
    // Permite:
    // 1. Signo de más (+) opcional al inicio
    // 2. Código de país (1-3 dígitos)
    // 3. Separadores comunes: espacios, guiones, puntos, paréntesis
    // 4. Números locales (4-14 dígitos adicionales)
    const phoneRegex = /^[+]?(?:[\s\-\.\(\)]?\d[\s\-\.\(\)]?){6,15}$/;
    
    // Verificar formato básico
    if (!phoneRegex.test(trimmed)) {
        return false;
    }
    
    // Contar solo los dígitos
    const digitCount = trimmed.replace(/\D/g, '').length;
    
    // La mayoría de los números de teléfono tienen entre 6 y 15 dígitos
    // (incluyendo código de país). Algunos países tienen hasta 17 dígitos.
    if (digitCount < 6 || digitCount > 17) {
        return false;
    }
    
    // Verificar que no haya caracteres inválidos repetidos o patrones extraños
    // Evitar números que sean solo ceros o patrones repetidos simples
    const digitsOnly = trimmed.replace(/\D/g, '');
    if (/^(\d)\1+$/.test(digitsOnly)) {
        return false; // Todos los dígitos iguales
    }
    
    // Verificar que tenga al menos un dígito después del signo + (si existe)
    if (trimmed.startsWith('+') && digitsOnly.length === 0) {
        return false;
    }
    
    // Verificación adicional para formatos con paréntesis
    // Si hay un paréntesis de apertura, debe haber uno de cierre
    const openParen = (trimmed.match(/\(/g) || []).length;
    const closeParen = (trimmed.match(/\)/g) || []).length;
    if (openParen !== closeParen) {
        return false;
    }
    
    // Verificar que los paréntesis estén en posiciones válidas
    if (openParen > 0) {
        // Los paréntesis deben estar juntos (para código de área)
        if (!/\(\d+\)/.test(trimmed.replace(/\s/g, ''))) {
            return false;
        }
    }
    
    return true;
}
