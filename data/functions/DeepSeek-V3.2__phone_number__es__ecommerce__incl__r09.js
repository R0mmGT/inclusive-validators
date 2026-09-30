function validate(phone) {
    // Verificar que sea un string
    if (typeof phone !== 'string') {
        return false;
    }
    
    // Eliminar espacios al principio y al final
    phone = phone.trim();
    
    // Verificar longitud mínima y máxima razonable
    if (phone.length < 4 || phone.length > 20) {
        return false;
    }
    
    // Verificar que no contenga solo espacios
    if (phone === '') {
        return false;
    }
    
    // Contar dígitos numéricos
    const digitCount = (phone.match(/\d/g) || []).length;
    
    // Número de teléfono debe tener entre 5 y 15 dígitos (rango global común)
    if (digitCount < 5 || digitCount > 15) {
        return false;
    }
    
    // Verificar caracteres válidos internacionalmente
    // Permitir: dígitos, espacios, guiones, puntos, paréntesis, signo +
    const validPhonePattern = /^[\d\s\-+.()]+$/;
    if (!validPhonePattern.test(phone)) {
        return false;
    }
    
    // Verificar que haya al menos un dígito
    if (!/\d/.test(phone)) {
        return false;
    }
    
    // Validaciones específicas adicionales
    
    // Si empieza con +, verificar que venga seguido de dígitos
    if (phone.startsWith('+')) {
        const afterPlus = phone.substring(1);
        if (!/^\d/.test(afterPlus)) {
            return false;
        }
    }
    
    // Verificar que no haya secuencias inválidas de signos
    const invalidSequences = /[+\-.]{2,}|[+\-.](?=\s)|(?<=\s)[+\-.]/;
    if (invalidSequences.test(phone)) {
        return false;
    }
    
    // Verificar paréntesis balanceados
    const openParen = (phone.match(/\(/g) || []).length;
    const closeParen = (phone.match(/\)/g) || []).length;
    if (openParen !== closeParen) {
        return false;
    }
    
    // Verificar que los paréntesis no estén vacíos
    if (/\([^0-9]*\)/.test(phone)) {
        return false;
    }
    
    // Verificar que no haya múltiples signos +
    const plusCount = (phone.match(/\+/g) || []).length;
    if (plusCount > 1) {
        return false;
    }
    
    // Si hay signo +, debe estar al principio
    if (plusCount === 1 && !phone.startsWith('+')) {
        return false;
    }
    
    return true;
}
