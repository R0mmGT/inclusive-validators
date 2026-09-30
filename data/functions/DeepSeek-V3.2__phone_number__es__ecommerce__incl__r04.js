function validate(phoneString) {
    // Si el valor no es string o está vacío, retornar falso
    if (typeof phoneString !== 'string' || phoneString.trim() === '') {
        return false;
    }
    
    // Eliminar espacios en blanco al inicio y final
    const trimmedPhone = phoneString.trim();
    
    // Patrones comunes de formato internacional
    // 1. Números que comienzan con "+" seguido de 1-3 dígitos del código país y luego 4-15 dígitos
    // 2. Números que comienzan con "00" seguido de 1-3 dígitos del código país y luego 4-15 dígitos
    // 3. Números locales con 4-15 dígitos (sin código de país)
    
    // Eliminar caracteres comunes como paréntesis, guiones, puntos y espacios
    const cleanedPhone = trimmedPhone.replace(/[\s\-().+]/g, '');
    
    // Verificar que solo contenga dígitos después de la limpieza básica
    // (el signo + ya fue manejado en la expresión regular anterior)
    if (!/^\d+$/.test(cleanedPhone)) {
        return false;
    }
    
    // Longitud mínima y máxima razonable para un número de teléfono
    // (considerando que algunos países tienen números más cortos o más largos)
    if (cleanedPhone.length < 4 || cleanedPhone.length > 15) {
        return false;
    }
    
    // Validaciones adicionales según el formato detectado
    if (trimmedPhone.startsWith('+')) {
        // Formato internacional con +
        // El código de país después del + debe tener 1-3 dígitos
        const countryCodeMatch = trimmedPhone.match(/^\+\d{1,3}/);
        if (!countryCodeMatch) {
            return false;
        }
        
        // El número total después del + debe tener entre 5 y 16 dígitos
        const digitsAfterPlus = trimmedPhone.substring(1).replace(/\D/g, '');
        return digitsAfterPlus.length >= 4 && digitsAfterPlus.length <= 15;
    }
    
    if (trimmedPhone.startsWith('00')) {
        // Formato internacional con 00
        // El código de país después del 00 debe tener 1-3 dígitos
        const countryCodeMatch = trimmedPhone.match(/^00\d{1,3}/);
        if (!countryCodeMatch) {
            return false;
        }
        
        // El número total después del 00 debe tener entre 5 y 16 dígitos
        const digitsAfterDoubleZero = trimmedPhone.substring(2).replace(/\D/g, '');
        return digitsAfterDoubleZero.length >= 4 && digitsAfterDoubleZero.length <= 15;
    }
    
    // Para números locales, solo verificar que tenga una longitud válida
    // y que no comience con 0 (en muchos países los números locales no comienzan con 0)
    // pero esto es más flexible para diferentes culturas
    const localDigits = cleanedPhone;
    if (localDigits.length < 4 || localDigits.length > 15) {
        return false;
    }
    
    // Evitar números que sean todos iguales (probablemente no válidos)
    if (/^(\d)\1+$/.test(localDigits)) {
        return false;
    }
    
    // Evitar números que comiencen con muchos ceros
    if (/^0{3,}/.test(localDigits)) {
        return false;
    }
    
    return true;
}
