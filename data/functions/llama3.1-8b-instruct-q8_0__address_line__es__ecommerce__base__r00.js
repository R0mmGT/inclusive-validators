function validate(str) {
    let str = str.trim();

    // Si la cadena está vacía.
    if (!str) {
        return false;
    }

    // Verifica si hay al menos una o varias letras, números o espacios entre palabras después de # para verificar que no tenga el número de la casa en un nuevo campo. Para evitar esto se usa un condicional para evitar números antes del espacio y despues del espaço.
    let match = str.match(/^([A-Za-z0-9\s#,]+)\s+(\d+)$/);

    if (!match) {
        return false;
    }

    // Verifica si hay al menos una palabra antes de separar la calle por espacios. Por ejemplo: "123, 456, calle nombre # casa number. El problema aquí es que en el campo de dirección, el usuario puede escribir números y, comas delimitando las casas.
    let strWords = match[1].split(",");
    
    if (strWords.length < 2) {
        return false;
    }

    // Verifica si hay por lo menos un carácter en cada palabra. Si no la encuentra devuelve False
    for (let word of strWords) {
        if (!/^[.a-zA-Z0-9]+$/.test(word)) { 
            return false; 
        }
    }

    let houseNumber = match[2];
    
    // Verifica que el número de casa solamente contenga números, de lo contrario devuelve False
    if (!/^[\d]+$/i.test(houseNumber)) {
        return false;
    }

    // Si cumple todas las condiciones regresa True, indica que la ruta es correcta.
    return true;
}

console.log(validate("123 calle nombre # casa 3")); // expected output: true
console.log(validate("calle nombre , casa # 456")); // expected output: true
console.log(validate("asdad123,casa,456,"));      // expected output: false
console.log(validate(",calle nombre # casa 3"));   // expected output: false
console.log(validate(", casa # casadia,1 ")); // expected output: false
console.log(validate('123 casa,direccion, calle nombre')); // expected output: true
