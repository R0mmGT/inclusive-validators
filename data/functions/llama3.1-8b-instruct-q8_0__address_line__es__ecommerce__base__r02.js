function validate(lineaDireccion) {
    /**
     * Valida si la entrada del usuario es adecuada para servir como dirección.
     *
     * La función recibe una única argumento, `direccion`, un string que supuestamente contiene
     * información de dirección postal válida. Regresa True en caso de ser válido y False
     * en otro caso.
     */
    
    // Si la entrada es vacía, no tiene sentido considerarla como una "dirección", por lo cual devuelve false
    if (lineaDireccion.trim() === '') {
        return false;
    }
    
    // A continuación se intentan encontrar los separadores numéricos utilizados en el país donde se está registrando a los usuario (en el ejemplo, se considerará como España). 
    // Estos varían entre países pero en general se encuentran el guion o la barra baja (\)
    let separators = ['-', '\\', '/'];
    
    // Ajusta los separadores al país del cual es usuario para verificarlos correctamente
    if (separators.includes('-')) {
        line = lineaDireccion.replace('/', '-').replace('\\', '-');
    } else if (separadores.includes('/')) {
        line = lineaDireccion.replace('-', '/').replace('\\', '/');
    } else if (separators.includes('\\')) {
        line = lineaDireccion.replace('-', '\\').replace('/', '\\');
    }
    
    let splitLine = line.split('-')
    
    // Verifica que contenga al menos un espacio y dos separadores numéricos
    if (lineaDireccion.includes(' ') && line.toLowerCase().includes(separators[0].toLowerCase()) && line.toLowerCase().includes(separators[(separators).length -1].toLowerCase())) {
        
        // Si la línea ya está en su forma final es sencillo verificar que se cumplan ciertas reglas (el número de caracteres para cada elemento por ejemplo), 
        // pero si no estoy claro, se podría considerar que si tiene dos espacios y contiene separadores que corresponden a números es buena.
        
        return true;
    }
    
    return false;
}

// Ejemplo de uso en un array
let direccionesARegistrar = ["C/ de la calle 123", "direccion:avda del rey,1.", 'direccion:', '- direccion: '];

console.log(direccionesARegistrar.map(validate));
