function validate(name) {
    // Primero, comprobamos que la cadena no esté vacía.
    if (name.length === 0) {
        return false;
    }

    // Comprobamos si la cadena contiene al menos dos palabras separadas por un espacio.
    let words = name.split(' ');
    if (words.length < 2) {
        return false;
    }

    // Luego, validamos cada palabra en la cadena para asegurarnos de que esté compuesta solo por caracteres alfabéticos y espacios en blanco.
    for (let word of words) {
        let valid = true;
        for (let char of word) {
            if (!char.match(/^[a-zA-Z]$/)) {
                valid = false;
                break;
            }
        }
        if (!valid || !word.trim()) {  // comprobamos si la palabra tiene sentido y no es un espacio en blanco vacío
            return false;
        }
    }

    // Si hemos pasado todas las validaciones, el nombre completo de persona es válido.
    return true;
}
