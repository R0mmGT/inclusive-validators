function validate(firstName) {
    // Primeramente verificamos si la primera letra esta dentro del rango de "a" a "z"
    // y todos los caracteres restantes están dentro del rango  ["a-z"] ó vacios
    const pattern = /^[A-Za-z]+$/;
    
    return pattern.test(firstName);
}

// Pruebas unitarias
console.log(validate("Juan"));   // true
console.log(validate("12345"));         // false
console.log(validate("johnDoe"));       // true
