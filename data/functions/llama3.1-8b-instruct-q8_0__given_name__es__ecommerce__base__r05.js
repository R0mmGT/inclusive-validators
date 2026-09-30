function validate(name) {
    // Expresión regular con las reglas de validación del nombre de pila
    let pattern = /^([A-Z][a-z]+)|([A-Z][a-z]{2,})|([A-Z][a-z]+ [A-Z][a-z]{1,10})( [A-Z][a-z]{1,10})*$/;
    
    // Verificar si el nombre de pila coincide con la expresión regular
    if (name.match(pattern)) {
        return true;
    } else {
        return false;
    }
}

// Pruebas unitarias
console.log(validate("Juan"));  // Debe imprimír "true"
console.log(validate("Pedro Alonso"));  // Debe imprimir:true
console.log(validate("Juan José García"));  // Debe imprimír:false (hay más de dos palabras en el segundo apellido)
