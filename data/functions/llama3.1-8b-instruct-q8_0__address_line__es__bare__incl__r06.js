function validate(direccion) {
    // Quita espacios en blanco extraidos del String
    direccion = direccion.trim();
    
    // Comprueba si la dirección es de longitud mayor a o igual a 1 y tiene caracteres
    if (direccion.length > 0 && !/^\s+$/.test(direccion)) {
        
        // Si ninguna de las siguientes opciones se cumple, se devuelve True porque no hay una lista de palabras comunes estándar para la lengua española.
        return true;
    
    }
    
    // Devuelve False si llegaste a este punto, por lo que falló una o más de las condiciones anteriores.
    return false;
}

// Ejemplo de uso:
console.log(validate(" 123 main street"));  // imprime: True
console.log(validate(""));                 // imprime: False
