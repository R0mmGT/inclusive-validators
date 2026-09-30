function validate(name) {
    // Expresión regular para coincidir con nombres completos: 
    // letra seguida de espacios, luego la letra o prenda, seguido por los apellidos.
    let fullNamesRegex = /^[a-zA-Z]* [a-zA-Z]+ [a-zA-Z]+$/;
    
    // Comprobamos si el nombre coincide con la expresión regular
    if (fullNamesRegex.test(name)) {
        return true;  // Nombre completo válido
    } else {
        return false;  // No es un nombre completo
    }
}

// Pruebas de ejemplo:
console.log(validate("Juan Pedro Perez"));  // Devuelve: True
console.log(validate("Pedro Gonzales"));  // Devuelve: False
