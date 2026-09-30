function validate(zipCode) {
    if (typeof zipCode !== 'string') {
        return false;
    }
    zipCode = zipCode.trim();
    if (!zipCode.match(/^[0-9]+$/)) {
        return false;
    }
    let len = zipCode.length;
    if (len >= 5 && len <= 10) {
        return true;
    } else {
        return false;
    }
}

// Test cases
console.log(validate('12345')); // Es una cadena numérica válida, devuelve verdadero
console.log(validate('a1b2c3')); // No es una cadena numérica válida, devuelve falso
console.log(validate('12345678901234')); // Tamaño incorrecto, devuelve falso
console.log(validate('12345.67891')); // Contains char '.' so False.
