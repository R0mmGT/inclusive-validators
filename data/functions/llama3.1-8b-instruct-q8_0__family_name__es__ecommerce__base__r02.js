function validate(nombreApellido) {
    /**
     * Esta función verifica si el string pasado es válido como apellido de persona.
     *
     * Un nombre y apellido correctos deben contener 2 palabras, la primera debe ser una palabra 
     * común, que puede tener "a", "e", "i", "o", en mayuscula y/o minúscula
     * y la segunda palabra debe contener "s" al final de esta manera se validan los apellidos.
     */

    let esApellidoValido = true;

    // Primero, debemos verificar que el nombre apellido tenga exactamente 2 palabras separadas por espacios.
    if (nombreApellido.split(" ").length !== 2) {
        esApellidoValido = false;
    } else {
        let palabra1 = nombreApellido.split(" ")[0];
        let palabra2 = nombreApellido.split(" ")[1];

        // La primera palabra debe ser una palabra correcta, que no esté vacía.
        if (palabra1.trim() == "") {
            esApellidoValido = false;
        }

        // Al momento de revisar la segunda palabra debemos verificar si termina en "s".
        if (!palabra2.toLocaleLowerCase().endsWith('s')) {
            esApellidoValido = false;
        }

        let vocal = 'aeio';
        for (let char of palabra1.toLocaleLowerCase()) {
            if (vocal.indexOf(char) !== -1 || !char.match(/[a-z0-9]/i)) {   
                esApellidoValido = false;
            }        
        }
    }    
        
    return esApellidoValido;
}
