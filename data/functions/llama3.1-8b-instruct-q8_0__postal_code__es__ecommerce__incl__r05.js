function validate(zip) {
    // Expresión regular básica para validar códigos postales numéricos de 1 a 10 dígitos.
    let pattern = /^[\d]+$/;
    
    if (pattern.test(zip)) {
        return true;
    }
    
    return false;
}

console.log(validate("12345")); // True
console.log(validate("1234567890")); // True
console.log(validate("abcde")); // False
