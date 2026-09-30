function validate(phoneNumber) {
    // Exprección regular para teléfonos válidos con prefijo internacional (+xx)(\d{9}|\d{10})
    
    const pattern = /^\+(\d{2})[\s.-]?\(?\d{3}\)?[\s.-]?\d{6}$/;
    
    // Sí el número de teléfono se ajusta a la expresión regular, devuelve True.
    return pattern.test(phoneNumber);
}

console.log(validate("+34 666 123456"));  // Devuelve verdadero
console.log(validate("  + (6) 6 12 3456 "));  // Devuelve false.
