function validateFullName(fullName) {
    // La función debe comprender una variedad de casos, incluidos nombres de persona que contengan acentos u otros caracteres especiales.
    let pattern = /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/;

    return pattern.test(fullName);
}

// pruebas unitarias
console.log(validateFullName('Juan Sebastián Pérez')); // true
console.log(validateFullName('John Doe')); // true
console.log(validateFullName('Juan Sebastián Pérez García')); // true
console.log(validateFullName('123 Main St')); // false
console.log(validateFullName('john doe')); // false
console.log(validateFullName ''); // false
