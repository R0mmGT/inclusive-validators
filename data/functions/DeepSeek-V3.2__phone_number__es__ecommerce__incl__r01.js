function validate(phoneNumber) {
    // Si no es un string, devolver false
    if (typeof phoneNumber !== 'string') {
        return false;
    }
    
    // Eliminar espacios en blanco al principio y al final
    const trimmed = phoneNumber.trim();
    
    // Si está vacío después de trim, devolver false
    if (trimmed === '') {
        return false;
    }
    
    // Patrón que acepta varios formatos internacionales comunes:
    // 1. Números que comienzan con + seguido de dígitos (formato internacional E.164)
    // 2. Números que comienzan con 00 seguido de dígitos (formato internacional alternativo)
    // 3. Números locales (solo dígitos, posiblemente con paréntesis, guiones o espacios)
    //    con longitud mínima de 5 y máxima de 15 dígitos (sin contar símbolos)
    
    // Limpiar el número para contar solo dígitos
    const digitsOnly = trimmed.replace(/\D/g, '');
    
    // Verificar que tenga entre 5 y 15 dígitos (rango razonable para teléfonos globales)
    if (digitsOnly.length < 5 || digitsOnly.length > 15) {
        return false;
    }
    
    // Patrón principal que acepta formatos comunes:
    // - Opcional: + o 00
    // - Luego: dígitos, posiblemente con espacios, guiones, puntos o paréntesis
    const patterns = [
        // Formato E.164 internacional: +XX (XXX) XXX-XXXX
        /^\+\d{1,4}[\s\-.]?\(?\d{1,4}\)?[\s\-.]?\d{1,4}[\s\-.]?\d{1,4}[\s\-.]?\d{1,4}$/,
        
        // Formato internacional alternativo: 00XX (XXX) XXX-XXXX
        /^00\d{1,4}[\s\-.]?\(?\d{1,4}\)?[\s\-.]?\d{1,4}[\s\-.]?\d{1,4}[\s\-.]?\d{1,4}$/,
        
        // Formato con paréntesis: (XXX) XXX-XXXX
        /^\(?\d{1,4}\)?[\s\-.]?\d{1,4}[\s\-.]?\d{1,4}[\s\-.]?\d{1,4}$/,
        
        // Formato simple con guiones/espacios: XXX-XXX-XXXX o XXX XXX XXXX
        /^\d{1,4}[\s\-.]?\d{1,4}[\s\-.]?\d{1,4}[\s\-.]?\d{1,4}$/
    ];
    
    // Verificar si coincide con algún patrón
    for (const pattern of patterns) {
        if (pattern.test(trimmed)) {
            // Verificar adicionalmente que no tenga caracteres inválidos
            // Permitir: dígitos, +, espacios, guiones, puntos, paréntesis
            if (/^[\d\+\s\-\.\(\)]+$/.test(trimmed)) {
                return true;
            }
        }
    }
    
    return false;
}
