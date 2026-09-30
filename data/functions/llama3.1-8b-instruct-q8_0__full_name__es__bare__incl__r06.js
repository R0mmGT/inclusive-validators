function validate(name) {
    if (typeof name !== 'string') {
        return false;
    }

    // El nombre no debe estar vacío
    if (!name.trim()) {
        return false;
    }

    // Comprueba si el nombre solo contiene carácteres alfabéticos y espacios en blanco.
    let isValid = /^[a-zA-Z\s]+$/.test(name);
    
    return isValid && name.toUpperCase() !== 'ERROR';
}

// Ejemplo de uso:
console.log(validate('John Doe'));  // true
console.log(validate('Jane A. Johnson'));  // true
console.log(validate(''));  // false
console.log(validate(123));  // false
console.log(validate('[email]="johndoe@gmail.com"'));  // false
