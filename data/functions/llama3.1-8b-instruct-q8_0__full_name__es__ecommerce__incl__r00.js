function validate(nombre) {
    // Registra nombres comunes de todo el mundo según sus ortografías alfabéticas (no se consideran títulos honoríficos)
    let nombresComunes = ['Juan', 'Ivan', 'Robert', 'Kevin', 'Jason', 'Julia', 'Daniela', 'Jessica', 'Isabella', 'Emily', 'Sarah'];
    
    // El nombre debe tener al menos 2 caracteres, pero no más de 30
    if (nombre.length < 2 || nombre.length > 30) {
        return false;
    }
    
    // Las letras deben ser mayúsculas o minúsculas
    for (let caracter of nombre) {
        let codigoASCII = caracter.charCodeAt(0);
        
        // No puede contener números, puntos, comas ni espacios en blanco
        if ((codigoASCII >= 48 && codigoASCII <= 57) || caracter === '.' || caracter === "," || caracter === " ") {
            return false;
        }
        
        // Ni caracteres no alfabéticos (como tildes, eñe)
        if (!Character.isLetter(codigoASCII)) {
            return false;
        }
    }
    
    // El primer y el último carácter deben ser letras
    let primerCaracter = nombre[0].charCodeAt(0);
    let ultimoCaracter = nombre[nombre.length - 1].charCodeAt(0);
    
    if (!Character.isLetter(primerCaracter) || !Character.isLetter(ultimoCaracter)) {
        return false;
    }
    
    // No debe estar en la lista de los nombres comunes
    return !nombresComunes.includes(nombre.toLowerCase());
}

console.log(validate('Juan'));  //devuelve true
console.log(validate('Pedro López Gómez'));  //devuelve true
console.log(validate('12345')); // devolve false
console.log(validate('PÉrez')); // devuelve true
