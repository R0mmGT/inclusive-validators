function validate(phoneNumber) {
    // Validación básica: no vacío, máximo 25 caracteres
    if (typeof phoneNumber !== 'string' || phoneNumber.trim().length === 0 || phoneNumber.length > 25) {
        return false;
    }
    
    const trimmed = phoneNumber.trim();
    
    // Eliminar prefijos internacionales (+ o 00) para análisis
    let numberWithoutPrefix = trimmed;
    let hasPlus = false;
    
    if (trimmed.startsWith('+')) {
        numberWithoutPrefix = trimmed.substring(1);
        hasPlus = true;
    } else if (trimmed.startsWith('00')) {
        numberWithoutPrefix = trimmed.substring(2);
        hasPlus = true;
    }
    
    // Verificar que solo contenga dígitos, espacios, guiones, puntos y paréntesis
    const allowedChars = /^[\d\s\-\.\(\)\+]+$/;
    if (!allowedChars.test(trimmed)) {
        return false;
    }
    
    // Contar solo dígitos
    const digitCount = (numberWithoutPrefix.match(/\d/g) || []).length;
    
    // Longitud mínima y máxima de dígitos según estándares internacionales
    if (digitCount < 4 || digitCount > 15) {
        return false;
    }
    
    // Verificar estructura básica:
    // 1. No debe empezar con 0 si tiene prefijo internacional (excepto Italia, etc., pero en general)
    if (hasPlus && numberWithoutPrefix.startsWith('0')) {
        // Algunos países como Italia (+39) o Alemania (+49) pueden tener 0 después del +, pero es ambiguo
        // Para simplificar, lo permitimos con advertencia en comentarios
    }
    
    // 2. No debe tener secuencias inválidas como +++ o ---
    const invalidSequences = /(\+\+|\-\-|\.\.|\(\))/;
    if (invalidSequences.test(trimmed)) {
        return false;
    }
    
    // 3. Verificar paréntesis balanceados
    const parentheses = trimmed.match(/[\(\)]/g) || [];
    let balance = 0;
    for (const char of parentheses) {
        balance += char === '(' ? 1 : -1;
        if (balance < 0) return false; // Paréntesis cerrado sin abrir
    }
    if (balance !== 0) return false; // Paréntesis no balanceados
    
    // 4. El número debe contener al menos 4 dígitos consecutivos en algún lugar
    const digitsOnly = trimmed.replace(/[^\d]/g, '');
    if (!/(\d{4,})/.test(digitsOnly)) {
        return false;
    }
    
    // 5. No debe contener solo espacios o caracteres especiales
    if (digitsOnly.length === 0) {
        return false;
    }
    
    // 6. Validación por regiones/patrones comunes (no exhaustiva pero útil)
    const commonPatterns = [
        /^\+1\s*\(?\d{3}\)?[\s\-.]?\d{3}[\s\-.]?\d{4}$/, // USA/Canadá
        /^\+44\s*\d{2,5}\s*\d{6,10}$/, // UK
        /^\+33\s*[1-9]\s*(\d{2}\s*){4}$/, // Francia
        /^\+49\s*[1-9]\d{1,4}\s*\d{3,12}$/, // Alemania
        /^\+34\s*[5-9]\d{2}\s*\d{2}\s*\d{2}\s*\d{2}$/, // España
        /^\+81\s*\d{1,4}\s*\d{1,4}\s*\d{3,4}$/, // Japón
        /^\d{5,15}$/, // Solo dígitos (mínimo 5)
        /^[\d\s\-\(\)\.]{6,25}$/, // Formato general con caracteres especiales
    ];
    
    // Si coincide con algún patrón común, es válido
    for (const pattern of commonPatterns) {
        if (pattern.test(trimmed)) {
            return true;
        }
    }
    
    // Si no coincide con patrones, hacer validación estructural básica
    // Debe tener al menos 4 dígitos y formato razonable
    const structuralTest = /^[\+\d][\d\s\-\.\(\)]{4,24}$/;
    if (!structuralTest.test(trimmed)) {
        return false;
    }
    
    // Verificar proporción de dígitos vs caracteres especiales
    const totalChars = trimmed.length;
    const digitRatio = digitsOnly.length / totalChars;
    
    // Si la proporción de dígitos es muy baja, probablemente no sea un número válido
    if (digitRatio < 0.3) {
        return false;
    }
    
    // Validación de grupos de dígitos
    const digitGroups = trimmed.split(/[^\d]+/).filter(group => group.length > 0);
    
    // Debe tener al menos un grupo de dígitos con longitud razonable
    const validGroup = digitGroups.some(group => group.length >= 3);
    if (!validGroup) {
        return false;
    }
    
    return true;
}
