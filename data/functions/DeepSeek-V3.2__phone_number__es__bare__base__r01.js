function validate(phone) {
    // Eliminar espacios en blanco al inicio y final
    const trimmed = phone.trim();
    
    // Verificar que no esté vacío después del trim
    if (!trimmed) return false;
    
    // Verificar que solo contenga dígitos, guiones, paréntesis, espacios y el signo +
    const validChars = /^[\d\s\-+()]+$/;
    if (!validChars.test(trimmed)) return false;
    
    // Eliminar todos los caracteres no numéricos excepto el + inicial si existe
    let digitsOnly = '';
    let hasInitialPlus = false;
    
    for (let i = 0; i < trimmed.length; i++) {
        const char = trimmed[i];
        if (i === 0 && char === '+') {
            digitsOnly += char;
            hasInitialPlus = true;
        } else if (char >= '0' && char <= '9') {
            digitsOnly += char;
        }
    }
    
    // Si tenía + inicial, asegurarnos que se mantuvo
    if (trimmed[0] === '+' && !hasInitialPlus) return false;
    
    // Contar dígitos (sin contar el + si existe)
    const digitCount = hasInitialPlus ? digitsOnly.length - 1 : digitsOnly.length;
    
    // Validar longitud: entre 7 y 15 dígitos (estándar internacional)
    if (digitCount < 7 || digitCount > 15) return false;
    
    // El + solo puede aparecer al inicio si está presente
    if (trimmed.includes('+') && trimmed[0] !== '+') return false;
    
    // Validar paréntesis balanceados si existen
    const openParen = (trimmed.match(/\(/g) || []).length;
    const closeParen = (trimmed.match(/\)/g) || []).length;
    if (openParen !== closeParen) return false;
    
    // Validar que los paréntesis contengan un código de área válido (3 dígitos)
    const parenMatch = trimmed.match(/\((\d+)\)/);
    if (parenMatch && parenMatch[1].length !== 3) return false;
    
    // Validar que no haya dos signos + o múltiples grupos de paréntesis
    if ((trimmed.match(/\+/g) || []).length > 1) return false;
    if ((trimmed.match(/\(/g) || []).length > 1) return false;
    
    // Validar que los guiones no estén consecutivos o al inicio/final
    if (trimmed.includes('--') || trimmed.startsWith('-') || trimmed.endsWith('-')) return false;
    
    return true;
}
