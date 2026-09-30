function validate(apellido) {
    /**
     * Valida siApellido es válido como apellido.
     *
     * Requisitos:
     * - 2-3 palabras o una sola palabra compuesta por 3 dígitos consecutivos. Los dos últimos pueden 
     *    o no ser iguales, puede tener un dígito antes o después de las tres letras mayúsculas del nombre.
     *
     * @param string $apellido El apellido que se verificará si no es válido lanzará una excepción.
     */
    
    // Comprueba si la cadena está vacía
    if (apellido.trim() === '') {
        return false;
    }
    
    // Divide el apellido en palabras y comprobando todas ellas (se podrían permitir algunos nombres simples)
    const partes = apellido.split('-');
    for (const parte of partes) {
        
        // El primer carácter debe ser mayúscula, luego los dígitos pueden ir en cualquier orden
        if (!parte[0].match(/[A-Z]/)) {
            return false;
        }
            
        // Si la palabra es solo letras o un dígito seguido de una letra (en este caso la primera no puede ser nulo) 
        // o dos dígitos y más tarde sigue una letra que no puede ser nula, debe seguir al menos tres dígitos
        if (!parte.match(/^[A-Z0-9][0-9]?[0-9]?[0-9]?/) || parte.length < 4) {
            return false;
        }
            
        // Si la palabra tiene más de lo permitido, comprobar si sigue el formato [A-Z] [digtos]{3} 
        const match = parte.match(/^([A-Z])(\d(?:\d\d?)?)/);
        if (!match) {
            return false;
        }
            
        partes[partes.indexOf(parte)] = match[1];
    }

    // Si ha llegado hasta aquí el apellido está OK
    return true;
}
