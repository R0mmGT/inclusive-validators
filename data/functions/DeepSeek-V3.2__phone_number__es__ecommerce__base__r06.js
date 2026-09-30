function validate(phoneNumber) {
    // Eliminar espacios en blanco al inicio y al final
    const trimmed = phoneNumber.trim();
    
    // Verificar que no esté vacío después de trim
    if (!trimmed) return false;
    
    // Patrón para validar números de teléfono
    // Permite:
    // - Números que comienzan con + seguido de 1-3 dígitos (código de país opcional)
    // - Números que comienzan con 00 seguido de 1-3 dígitos (código de país opcional)
    // - Números nacionales (6-12 dígitos)
    // - Puede contener espacios, guiones o puntos como separadores
    // - No permite paréntesis ni otros caracteres especiales
    const pattern = /^(?:(?:\+|00)[1-9]\d{0,2}[\s.-]?)?(?:[1-9]\d{1,4}[\s.-]?){2,}\d{2,}$/;
    
    // Verificar coincidencia con el patrón
    if (!pattern.test(trimmed)) return false;
    
    // Limpiar el número para contar solo dígitos
    const digitsOnly = trimmed.replace(/[\s.-]/g, '');
    
    // Contar dígitos totales (incluyendo código de país si existe)
    const totalDigits = digitsOnly.length;
    
    // Verificar longitud razonable (mínimo 6, máximo 15 dígitos)
    if (totalDigits < 6 || totalDigits > 15) return false;
    
    // Verificar que no comience con 0 a menos que sea un número nacional que lo requiera
    // (esta regla puede ajustarse según el país objetivo)
    if (digitsOnly.match(/^00/)) {
        // Número internacional con 00
        const withoutPrefix = digitsOnly.substring(2);
        if (withoutPrefix.length < 4) return false; // Código de país + número demasiado corto
    } else if (digitsOnly.match(/^\+/)) {
        // Número internacional con +
        const withoutPrefix = digitsOnly.substring(1);
        if (withoutPrefix.length < 4) return false; // Código de país + número demasiado corto
    }
    
    // Validación adicional: verificar que haya al menos un grupo de dígitos significativo
    const digitGroups = trimmed.split(/[\s.-]+/);
    const validGroups = digitGroups.filter(group => group.length > 0);
    
    if (validGroups.length < 1) return false;
    
    // Verificar que cada grupo contenga solo dígitos
    for (const group of validGroups) {
        if (!/^\d+$/.test(group.replace(/^\+/, '').replace(/^00/, ''))) {
            return false;
        }
    }
    
    return true;
}
