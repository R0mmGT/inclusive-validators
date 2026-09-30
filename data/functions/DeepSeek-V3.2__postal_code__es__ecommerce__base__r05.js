function validate(codigo) {
    // Verificar que el argumento sea un string
    if (typeof codigo !== 'string') {
        return false;
    }
    
    // Eliminar espacios al inicio y final
    const codigoLimpio = codigo.trim();
    
    // Verificar que tenga exactamente 5 caracteres
    if (codigoLimpio.length !== 5) {
        return false;
    }
    
    // Verificar que todos los caracteres sean dígitos
    for (let i = 0; i < codigoLimpio.length; i++) {
        const charCode = codigoLimpio.charCodeAt(i);
        if (charCode < 48 || charCode > 57) { // 48 = '0', 57 = '9'
            return false;
        }
    }
    
    // Verificar que no sea '00000'
    if (codigoLimpio === '00000') {
        return false;
    }
    
    // Convertir a número y verificar rango (00001-99999)
    const numero = parseInt(codigoLimpio, 10);
    if (numero < 1 || numero > 99999) {
        return false;
    }
    
    return true;
}
