function validate(zipCode) {
    // Reemplaza cualquier caracter que no sean dígitos
    let cleanedZip = zipCode.replace(/[^\d]/g, '');
    
    // Un código postal válido debe tener entre 5 y 9 dígitos
    if (cleanedZip.length >= 5 && cleanedZip.length <= 9) {
        return true;
    } else {
        return false;
    }
}

console.log(validate("123456789"));  // Debe ser true
console.log(validate("12345"));      // Debe ser false
console.log(validate("hello world")); // Debe ser false
