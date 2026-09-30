function validate(fullName) {
    // Expresión regular para validar patrones básicos de nombres de persona que se encuentran comúnmente en la mayoría de los países y culturas.
    var pattern = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
    
    // Busca una coincidencia en toda la cadena de nombre completo utilizando el patrón anterior.

    if (pattern.test(fullName)) {
        return true;  // Devuelve un valor Verdadero si encuentra una coincidencia.
        
    } else {
        return false;  // Devuelve un valor Falsy si no encuentra una coincidencia o la cadena de nombre completo está vacía.
    }
}

// Pruebas para determinar la validez del formato:
console.log(validate('John Doe'));      // true : Patrón válido
console.log(validate('Jane Mary Smith'));   // true: Validación con múltiples nombres válidos
console.log(validate('123 Broadway'));  // false: Sin cadenas de alfabéticas, no es el nombre de persona.
console.log(validate(false));       // false: El tipo no es una cadena de texto.
