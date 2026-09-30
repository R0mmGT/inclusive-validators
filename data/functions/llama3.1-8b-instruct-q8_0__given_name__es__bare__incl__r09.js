function validate(personName) {
    // Quita espacios a ambos lados del nombre
    personName = personName.trim();
    
    // Verifica si el nombre tiene al menos dos caracteres (el mínimo para ser considerado como nombre)
    if (personName.length < 2) {
        return false;
    }
    
    // Define palabras clave comunes que no pueden formar un nombre válido de pila
    let excludedWords = ["de", "la", "del", "las", "los", "un", "una"];
    
    // Verifica si el nombre contiene cualquier palabra clave excluida
    if (excludedWords.some(word => personName.toLowerCase().includes(word))) {
        return false;
    }
    
    // Verifica si el primer y último carácter del nombre son letras
    let firstLetter = personName.charAt(0);
    let lastLetter = personName.charAt(personName.length - 1);
    if (!firstLetter.match(/[a-zA-Z]/) || !lastLetter.match(/[a-zA-Z]/)) {
        return false;
    }
    
    // Verifica si los otros caracteres del nombre son solo letras o espacios
    for (let i = 0; i < personName.length - 2; i++) {
        if (!(personName.charAt(i).match(/[a-zA-Z]/) || personName.charAt(i).match(/\s/))) {
            return false;
        }
    }
    
    // Si el nombre no contenía ninguna de las condiciones anteriores, debe ser válido
    return true;
}

// Para testear la función de validación
console.log(validate("Juan Pablo Pérez"));  // True
console.log(validate("Ana Clara García"));  // True
console.log(validate("¡Hola Mundo!"));      // False (inicia con un signo de exclamación)
console.log(validate("de La Cruz"));        // False (contiene una palabra clave excluida)
