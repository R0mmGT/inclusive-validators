function validate(address) {
    if (!address || typeof address !== 'string') return false;

    // Completar estas reglas de validación:
    // * La dirección debe contener al menos una letra.
    let hasLetter = /[a-zA-Z]/.test(address);
    
    // * Las palabras se separan mediante espacios en blanco o coma.
    let hasSpaceOrComma = /\s+|,.+/.test(address);
    
    if (!hasLetter || !hasSpaceOrComma) return false;
        
    return true;
}

console.log(validate("123 Main St"));  // devuelve: true
console.log(validate("123 Main"));     // devuelve: false
console.log(validate(123));            // devuelve: false
console.log(validate(null));           // devuelve: false
console.log(validate(undefined));      // devuelve: false
