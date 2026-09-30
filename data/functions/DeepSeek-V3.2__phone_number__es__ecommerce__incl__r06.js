function validate(phoneString) {
    // Verificar que el input sea un string
    if (typeof phoneString !== 'string') {
        return false;
    }
    
    // Eliminar espacios en blanco al principio y al final
    const trimmed = phoneString.trim();
    
    // Verificar que el string no esté vacío después del trim
    if (trimmed.length === 0) {
        return false;
    }
    
    // Patrones comunes para números de teléfono internacionales
    // 1. Números que empiezan con + seguido de 1-3 dígitos del código de país y luego 4-14 dígitos
    // 2. Números que empiezan con 00 seguido de 1-3 dígitos del código de país y luego 4-14 dígitos
    // 3. Números locales con 5-15 dígitos (sin código de país)
    // 4. Números con paréntesis, guiones, puntos o espacios como separadores
    
    // Patrón principal que permite diversos formatos internacionales
    const internationalPattern = /^(\+|00)[1-9]\d{0,2}[\s\-.]?\(?\d{1,5}\)?[\s\-.]?\d{1,5}[\s\-.]?\d{2,10}$/;
    
    // Patrón para números locales (sin código de país)
    const localPattern = /^[\s\-.]?\(?\d{1,5}\)?[\s\-.]?\d{1,5}[\s\-.]?\d{2,10}$/;
    
    // Contar solo los dígitos para verificar la longitud total
    const digitCount = (trimmed.match(/\d/g) || []).length;
    
    // Verificar longitud mínima y máxima razonable de dígitos
    if (digitCount < 5 || digitCount > 15) {
        return false;
    }
    
    // Verificar que haya al menos un dígito
    if (digitCount === 0) {
        return false;
    }
    
    // Verificar que no haya caracteres no válidos
    // Permitir: dígitos, +, -, ., (, ), espacios
    const validCharsPattern = /^[\d\+\-\.\(\)\s]+$/;
    if (!validCharsPattern.test(trimmed)) {
        return false;
    }
    
    // Verificar formatos específicos problemáticos
    // No permitir múltiples signos + seguidos
    if (trimmed.includes('++')) {
        return false;
    }
    
    // No permitir paréntesis desbalanceados
    const openParen = (trimmed.match(/\(/g) || []).length;
    const closeParen = (trimmed.match(/\)/g) || []).length;
    if (openParen !== closeParen) {
        return false;
    }
    
    // Verificar que los paréntesis contengan solo dígitos
    const parenContentMatch = trimmed.match(/\(([^)]+)\)/g);
    if (parenContentMatch) {
        for (const match of parenContentMatch) {
            const content = match.slice(1, -1);
            if (!/^\d+$/.test(content)) {
                return false;
            }
        }
    }
    
    // Verificar que no haya secuencias inválidas de separadores
    if (/[\-\s\.]{2,}/.test(trimmed)) {
        return false;
    }
    
    // Si comienza con + o 00, debe seguir el patrón internacional
    if (trimmed.startsWith('+') || trimmed.startsWith('00')) {
        return internationalPattern.test(trimmed);
    }
    
    // Para números locales, verificar el patrón local
    return localPattern.test(trimmed);
}
