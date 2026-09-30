function validate(postalCode) {
    // Un valor nulo o vacío es invalido
    if (!postalCode && postalCode !== 0) {
        return false;
    }
    
    // Revisa si tiene uno o más caracteres alfabéticos 
    let match = /^[a-zA-Z]+.*$/.test(postalCode);
    if (!match) {
        return false;
    }
    
    // Revisa si todos los carácteres son válidos
    for (let i = 0; i < postalCode.length; i++) {
        if ((!/[A-Za-z]/.test(postalCode[i])) || 
            (/\d/.test(postalCode[i]) && !([' ', '-', '.', '/'].includes(postalCode[i])))) {
            return false;
        }
    }

    // Si ya pasamos por todas las validaciones es porque el código postal es correcto
    return true;
}

// Probar con algunos ejemplos:
console.log(validate("12345"));  // true
console.log(validate("AB 12"));  // false
console.log(validate("ABC12"));  // false
console.log(validate("ABC1 2"));  // false
console.log(validate(""));
console.log(validate(null));
