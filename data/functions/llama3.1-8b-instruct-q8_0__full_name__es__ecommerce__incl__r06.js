function validate(fullName) {
    // Expresión regular para nombres: una cadena alfabética con espacios, de máximo 100 caracteres.
    let nombreRegex = /^[a-zA-Z-Ññ\s]{1,100}$/;

    // Verificación del formato del nombre completo.
    if (fullName.match(nombreRegex)) {

        // Divide el string en un arreglo de palabras.
        let wordsArr = fullName.split(" ");

        // Revisa si tiene mínimo 2 y máximo 200 palabras.
        if (wordsArr.length >= 2 && wordsArr.length <= 20) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

// Pruebas de unidad.
console.log(validate("Juan Francisco Pérez Gómez"));
console.log(validate("Adiós, mundo."));
