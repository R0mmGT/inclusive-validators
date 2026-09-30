function validate(directionLine) {
    // Límites mínimo y máximo para la cantidad de palabras en una dirección con calle: 4-10.
    let minCount = 4;
    let maxCount = 12;

    // Comprueba que el nombre de la calle esté en minúsculas
    if (/[A-Z]/.test(directionLine)) {
        return false;
    }

    // Quiero encontrar un número mínimo o máximo de palabras en la línea.
    let words = directionLine.split(' ');

    // Verificar si cada palabra está compuesta solo por letras (ni dígitos ni otros caractéres especiales)
    for (let word of words) {
        if (/[^a-z]/.test(word)) {  // Si una palabra contenía un carácter que no era una letra.
            return false;
        }
    }

    // Chequear si el contenido de la variable 'words' tiene más palabras con longitud igual al mínimo y/o máximo.
    let checkWords = words.filter((word) => word.length <= 6).length <= minCount && words.length <= maxCount ? true : false;

    return checkWords;
}

console.log(validate("calle 123 norte")); // true
console.log(validate("avenida sur")); // true
console.log(validate("calle 123")); // true
console.log(validate("!Hola como estás con caracteres especiales")); // false
console.log(validate("-Este es un string que contiene un cajón: ")); // false
