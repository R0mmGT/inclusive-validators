function validate(name) {
    // Primero comprobamos si la longitud del str es como máximo 16 caracteres
    if (name.length > 16) return false;

    // Comprobar que la cadena no esté vacía
    if (!name.trim()) {
        return false;
    }

    // Verificar si el nombre solo contiene letras y posibles signos diacríticos
    let onlyLetters = true;
    for (let char of name) {
        let code = char.charCodeAt(0);
        
        // Comprobamos si tenemos algún carácter que no sea una letra, un espacio o un diacritico
        if (!(code > 64 && code < 91) && !(code > 96 && code < 123)) onlyLetters = false;
    }
    
    return onlyLetters;

}

console.log(validate("Juan")); // debe devolver true
console.log(validate("juanito")); // debe devolver false por exceder el máximo de caracteres permitidos
console.log(validate(":Hola")); // debe devoler false al verificar la existencia de signos no válidos (en este caso ":")
