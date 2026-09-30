function validateDireccionCalle(direccion) {
    /**
     * Validar si la dirección es una línea de calle válida.
     *
     * Args:
     *     direccion (str): La dirección a validar
     *
     * Returns:
     *     bool: true si la dirección es una línea de calle válida, false en caso contrario
     */
    // Si la dirección está vacía, no es válida
    if (!direccion) {
        return false;
    }
    
    // Revisa que tenga al menos un carácter (excepcionando las direcciones null o vacías)
    if (direccion.length < 1) {
        return false;
    }
    
    // Busca el primer carácter no numérico en la cadena. Si la carpeta es solo números, entonces debe ser inválido.
    let carpetaNumerica = true;
    for (let caracter of direccion) {
        if (!isNaN(caracter)) {
            continue;
        } else {
            carpetaNumerica = false;
            break;
        }
    }
    
    // Si la carpeta es numérica, entonces no es válido porque debe contener al menos uno nombre de calle.
    if (carpetaNumerica) {
        return false;
    }
    
    // Busca al menos un espacio en una ciudad: direcciones con todo el texto compuesto por un sólo "país" son inválidos.
    let hayEspacio = direccion.indexOf(" ") != -1;

    // Si no encuentra al menos uno, y la cadena comienza o termina con puntos y comas, entonces debe ser inválido (excepción los de nombres y países solo)
    if (!hayEspacio && (direccion.trim().startsWith(".") || direccion.trim().endsWith(".") || 
                       direccion.trim().startsWith(",") || direccion.trim().endsWith ",")) {
        return false;
    }
    
    // Si todas las condiciones anteriores son verdaderas, la dirección es válida.
    return true;
}
