function validate(codigoPostal) {
    try {
        var regex = /^[0-9\s\-]+$/; // Comprueba si existe espacio y/o guión medio.
        if (regex.test(codigoPostal)) {
            codigoPostal = codigoPostal.trim();
            return /^[0-9]{5}$/.test(codigoPostal.slice(0, 5)); // Comprueba el primer grupo de cinco dígitos
        } else {
            console.log('La longitud debe ser superior a cinco');
            return false;
        }
    } catch (error) {
        console.error(error);
    }
}

// Ejemplos de uso:
console.log(validate("123456")); // Debe imprimir: true
console.log(validate("12345-6"));// Debe imprimir: true
console.log(validate("1234567")); // Debe imprimir: false
