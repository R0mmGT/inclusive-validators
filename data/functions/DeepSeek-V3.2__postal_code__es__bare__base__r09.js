function validate(codigoPostal) {
    // Validar que sea string
    if (typeof codigoPostal !== 'string') {
        return false;
    }
    
    // Validar longitud (5 dígitos para el formato español)
    if (codigoPostal.length !== 5) {
        return false;
    }
    
    // Validar que todos los caracteres sean dígitos
    if (!/^\d+$/.test(codigoPostal)) {
        return false;
    }
    
    // Validar rangos de códigos postales españoles:
    // 01-52: provincias (excepto códigos especiales)
    const dosPrimeros = parseInt(codigoPostal.substring(0, 2));
    
    // Los códigos postales especiales (correos, apartados, etc.) van del 00 al 00,
    // pero el 00 no es un código postal válido para direcciones normales
    if (dosPrimeros === 0) {
        return false;
    }
    
    // En España, los códigos postales válidos para provincias van de 01 a 52
    // (Ceuta: 51, Melilla: 52)
    if (dosPrimeros >= 1 && dosPrimeros <= 52) {
        return true;
    }
    
    // Excluir códigos especiales de 53 a 99
    return false;
}
