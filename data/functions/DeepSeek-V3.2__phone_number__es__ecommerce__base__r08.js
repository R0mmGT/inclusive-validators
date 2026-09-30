function validate(phone) {
    // Validar que el argumento sea un string
    if (typeof phone !== 'string') {
        return false;
    }

    // Eliminar espacios en blanco al inicio y final
    const trimmedPhone = phone.trim();
    
    // Validar que no esté vacío después de trim
    if (trimmedPhone.length === 0) {
        return false;
    }

    // Verificar que solo contenga dígitos, espacios, paréntesis, guiones y el símbolo +
    const validCharsRegex = /^[\d\s()+\-]+$/;
    if (!validCharsRegex.test(trimmedPhone)) {
        return false;
    }

    // Eliminar todos los caracteres no numéricos excepto el + inicial si existe
    let cleanPhone = trimmedPhone;
    
    // Conservar el + inicial si está presente
    const hasPlusPrefix = trimmedPhone.startsWith('+');
    if (hasPlusPrefix) {
        // Mantener el + y eliminar otros caracteres no numéricos
        cleanPhone = '+' + trimmedPhone.substring(1).replace(/[^\d]/g, '');
    } else {
        // Eliminar todos los caracteres no numéricos
        cleanPhone = trimmedPhone.replace(/[^\d]/g, '');
    }

    // Validar longitud mínima y máxima (ajustar según necesidades)
    // Longitud típica: 7-15 dígitos sin código de país, 10-15 con código de país
    const digitCount = cleanPhone.replace('+', '').length;
    
    if (hasPlusPrefix) {
        // Con código internacional: 10-15 dígitos total (incluyendo código de país)
        if (digitCount < 10 || digitCount > 15) {
            return false;
        }
    } else {
        // Sin código internacional: 7-11 dígitos
        if (digitCount < 7 || digitCount > 11) {
            return false;
        }
    }

    // Validar que no tenga secuencias inválidas (todos dígitos iguales, etc.)
    const allSameDigits = /^(\d)\1+$/.test(cleanPhone.replace('+', ''));
    if (allSameDigits) {
        return false;
    }

    // Validar estructura básica según región común (opcional, ajustar según necesidad)
    // Ejemplo: validar que números locales no comiencen con 0 o 1 (para algunos países)
    if (!hasPlusPrefix) {
        const firstDigit = cleanPhone.charAt(0);
        if (firstDigit === '0' || firstDigit === '1') {
            return false;
        }
    }

    return true;
}
