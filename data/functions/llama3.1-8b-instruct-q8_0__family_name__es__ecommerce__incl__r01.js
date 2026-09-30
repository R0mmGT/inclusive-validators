function validateApellido(apellido) {
    /**
     * Valida si un string es un apellido válido.
     *
     * Un apellido válido contiene entre 1 y 100 caracteres, 
     * contiene solamente letras mayúsculas y minúsculas, espacios en blanco (entre dos palabras del apellido),
     * apóstrofe único (para nominales con tildes),
     * guiones bajos (en apellido de nacionalidades como 'de la', 'van der', etc.),
     * o comas si contiene nombres propios que incluyen un segundo nombre dentro del apellido.
     *
     * @param {string} apellido El string a validar
     *
     * @return {boolean} True si el string es válido, false en caso contrario
     */
    // Las apellidos tienen más de 1 y menos de 100 caracteres
    if (apellido.length < 2 || apellido.length > 101) {
        return false;
    }
    //
    let contieneEspacio = false;
    for (let i = 0; i < apellido.length - 1; i++) {
        // Si encontramos un espacio en blanco, marcamos que hemos encontrado uno.
        if (apellido[i] === " ") {
            contieneEspacio = true;
        }
        // Si el carácter actual no es una letra ni un espaço o símbolo válido y ya encontramos un espacio
        else if (!/^[A-Za-zÀ-ÿ'_,.-]+$/.test(apellido[i])) {
            return false;
        }
    }

    // Si no encontró un espacio en blanco, el string es inválido.
    if (!contieneEspacio) {
        return false;

    }

    // Comprobamos si hay más de un caracter que contenga mayúsculas o minúsculas
    let contieneMinMay = false;
    for (let i = 0; i < apellido.length; i++) {
        if (/^[A-Z]+$/.test(apellido[i]) || /^[a-z]+$/.test(apellido[i])) {
            contieneMinMay = true;
        }
    }

    // Si no encontró un caracter que contenga tanto mayúsculas como minúsculas, el string es inválido.
    if (!contieneMinMay) {
        return false;
    }
    //
    // El apellido es válido si todos los caracteres del mismo son validos para ser incluidos en él.
    return true;
}
