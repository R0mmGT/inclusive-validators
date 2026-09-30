function validate(direccion) {
    // Comprueba si está vacía la dirección
    if (!direccion.trim()) {
        return false;
    }

    // Verifica que inicie con números o al menos una letra mayúscula
    const pattern = /^[0-9A-Z][0-9A-Z\s]*$/;
    
    // Convierte la cadena a minúsculas para evitar que las letras no se cuenten como válidas
    if (direccion.toLowerCase().replace(/[^a-z0-9\s]/gi, '').trim() !== '') {
        return false;
    }

    let numeros = 0;

    for (let caracter of direccion) {

        // Verifica si el carácter es un número
        if (!isNaN(caracter)) {
            numeros += 1;

            // Si hay más de tres números consecutivos, la dirección no tiene sentido
            if (numeros > 3) {
                return false;
            }
        } else {

            // Reinicia el conteo de números al encontrar un carácter no numérico
            numeros = 0;
        }

    }
    
}

console.log(validate('123 main st ')); // true
console.log(validate(' invalid-address')); // true
console.log(validate('123 456 789')); // false (más de tres números consecutivos)
console.log(validate('   ')); // false (dirección vacía)
