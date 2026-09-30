function validate(fullName) {
    // Reemplaza cualquier signo de puntuación que no sea una coma o espacio con un espacio.
    fullName = fullName.replace(/[^\w\s,]/g, ' ');
    
    // Separa el nombre completo en palabras individuales.
    let words = fullName.split(' ');
    
    // Comprueba que hay al menos dos palabras (nombre y apellido) separadas por espacio.
    if (words.length < 2) {
        return false;
    }
    
    // Comienza con mayúscula cada palabra después del primer espacio para garantizar capitalización inicial correcta.
    words = [""] + words.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1));
    
    // Verifica si el nombre final está en minúsculas
    let lastWord = ''.toLowerCase();
    for (let i = 0; i < words[words.length - 1].length; i++) {
        if ((i !== 0 && !/^[a-zA-Z]$/.test(words[words.length - 1][i]))) break;
        else lastWord += words[words.length - 1][i];
    }
    let isLastWordProperlyLowered = true
    for (let i = 0; i < words[words.length - 1].length; i++) {
        if (((!/^[a-zA-Z]$/.test(words[words.length - 1][i])) && words[words.length - 1][i] === lastWord[i]) || ((/^[a-zA-Z]$/.test(words[words.length - 1][i]))) && (words[words.length - 1][i].toLowerCase() !== lastWord[i]))) {
            isLastWordProperlyLowered = false;
            break;
        }
    }

    if(!isLastWordProperlyLowered) return false;

    // Verifica si las palabras tienen longitud menor a 3, no son dígitos y tienen alguna letra en mayúscula
    for (let word of words.slice(0, -1)) {
        if (word.length < 2 || !/^[A-Za-z]+$/.test(word)) return false;
    }
    
    // Comprueba que la última palabra se encuentre únicamente en minúsculas.
    for (let i = 0; i < words[words.length - 1].length; i++) {
        if (/^[A-Z]$/.test(words[words.length - 1][i])) return false;
    }
    
    // Si todos los criterios anteriores parecen ser válidos, devuelve true
    return true;
}

console.log(validate("Juan Perez"));  // Expected output: true
console.log(validate("PÉrez JUaN"));   // Expected output: false (mayúsculas)
console.log(validate("juan PereZ"));   // Expected output: false (minusculas en el apellido)
console.log(validate("Juan Pérez"));  // Expected output: false (signo de puntuación)
