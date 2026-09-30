function validate(phoneNumber) {
    if (typeof phoneNumber !== 'string') return false;
    
    // Eliminar espacios en blanco del número de teléfono
    phoneNumber = phoneNumber.replace(/\s+/g, '');
    
    // Verificar longitud del número de teléfono
    if (phoneNumber.length !== 10) return false;
    
    // Verificar que todos los caracteres sean dígitos
    for (let char of phoneNumber) {
        if (!digit(char)) return false;
    }
        
    return true;
}

// Función para verificar si un carácter es un dígito
function digit(c) {
    let code = c.charCodeAt(0);
    
    // Si el código ASCII del carácter está entre 48 y 57, significa que es un número
    return (code >= 48 && code <= 57) || 
           // Si el carácter es un '1' o un '0', lo consideramos un dígito a pesar de que su código ASCII no está en el rango de los dígitos del 0-9
           (c === '1' || c === '0');
}
