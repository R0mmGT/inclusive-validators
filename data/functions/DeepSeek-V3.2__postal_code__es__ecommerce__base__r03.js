function validate(codigoPostal) {
    // Verificar que el argumento sea un string
    if (typeof codigoPostal !== 'string') {
        return false;
    }
    
    // Verificar que no esté vacío
    if (codigoPostal.trim() === '') {
        return false;
    }
    
    // Patrones para diferentes formatos de códigos postales
    const patrones = [
        // Estados Unidos: 5 dígitos, opcionalmente seguido de guión y 4 dígitos (ZIP+4)
        /^\d{5}(-\d{4})?$/,
        
        // Canadá: A1A 1A1 (alternancia letra-número con espacio en medio)
        /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
        
        // México: 5 dígitos
        /^\d{5}$/,
        
        // España: 5 dígitos
        /^\d{5}$/,
        
        // Reino Unido: Formato complejo como AA1A 1AA, A1 1AA, A1A 1AA, etc.
        /^(GIR 0AA|[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2})$/i,
        
        // Alemania: 5 dígitos
        /^\d{5}$/,
        
        // Francia: 5 dígitos
        /^\d{5}$/,
        
        // Italia: 5 dígitos
        /^\d{5}$/,
        
        // Australia: 4 dígitos
        /^\d{4}$/,
        
        // Argentina: 4 dígitos, a veces letra opcional
        /^\d{4}[A-Za-z]?$/
    ];
    
    // Verificar si el código postal coincide con al menos un patrón
    const codigoLimpio = codigoPostal.trim();
    
    // Primera verificación: común para la mayoría de países
    for (const patron of patrones) {
        if (patron.test(codigoLimpio)) {
            return true;
        }
    }
    
    // Segunda verificación: si es un código de 5 dígitos numéricos (país desconocido)
    if (/^\d{5}$/.test(codigoLimpio)) {
        return true;
    }
    
    // Tercera verificación: si contiene solo dígitos y tiene entre 3 y 10 caracteres
    if (/^\d{3,10}$/.test(codigoLimpio)) {
        return true;
    }
    
    return false;
}
