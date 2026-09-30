function validate(codigoPostal) {
    // Verificar que el argumento sea un string
    if (typeof codigoPostal !== 'string') {
        return false;
    }
    
    // Eliminar espacios al principio y al final
    const codigoLimpio = codigoPostal.trim();
    
    // Patrón para códigos postales españoles: 5 dígitos exactos
    const patronEspanol = /^[0-9]{5}$/;
    
    // Patrón para códigos postales internacionales comunes (ej: US, UK, Canadá)
    // US: 5 dígitos o 5+4 con guión (12345 o 12345-6789)
    // UK: varias combinaciones de letras/dígitos como AA9A 9AA, A9A 9AA, etc.
    // Canadá: A9A 9A9
    // Patrón más flexible que acepta varias combinaciones
    const patronInternacional = /^([A-Z0-9\s\-]{3,10})$/i;
    
    // Verificar primero el formato español
    if (patronEspanol.test(codigoLimpio)) {
        // Validar que el primer dígito no sea 0 (restricción para códigos postales españoles)
        if (codigoLimpio.charAt(0) === '0') {
            return false;
        }
        return true;
    }
    
    // Si no es español, verificar formato internacional básico
    if (patronInternacional.test(codigoLimpio)) {
        // Validaciones adicionales para formatos específicos
        
        // Formato US: 5 dígitos o 5+4
        const patronUS = /^\d{5}(-\d{4})?$/;
        if (patronUS.test(codigoLimpio)) {
            return true;
        }
        
        // Formato UK: varias combinaciones
        const patronUK = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
        if (patronUK.test(codigoLimpio.toUpperCase())) {
            return true;
        }
        
        // Formato Canadá: A9A 9A9
        const patronCanada = /^[A-Z]\d[A-Z] ?\d[A-Z]\d$/i;
        if (patronCanada.test(codigoLimpio.toUpperCase())) {
            return true;
        }
        
        // Para otros países, aceptar cualquier combinación de 3-10 caracteres
        // que contenga al menos un dígito
        const tieneDigito = /\d/.test(codigoLimpio);
        const tieneLetraOMas = /[A-Za-z]/.test(codigoLimpio);
        
        // Debe contener al menos un dígito o una letra además de dígitos
        return (tieneDigito && codigoLimpio.length >= 3 && codigoLimpio.length <= 10);
    }
    
    return false;
}
