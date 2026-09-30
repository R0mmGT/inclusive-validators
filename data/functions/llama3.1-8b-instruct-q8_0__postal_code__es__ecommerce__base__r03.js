function validate(zipCode) {
    // Elimina cualquier espacio del código postal
    zipCode = zipCode.replace(/\s+/g, '');

    // Si la longitud de la cadena no es igual a 5 o 9 dígitos, el código postal no es válido.
    if (!/^\d*$/.test(zipCode) || (zipCode.length !== 5 && zipCode.length !== 9)) {
        return false;
    }

    // Comprueba si el código postal tiene una longitud de 5 dígitos, en cuyo caso comienza con un número impar entre 0 y 9
    if (zipCode.length === 5) {
        let a = parseInt(zipCode[0]);
        return a % 2 !== 0 && !isNaN(a);
    }

    // Comprueba si el código postal tiene una longitud de 9 dígitos, comienza con los números 8 u oriente 90 y contiene un guión
    if (zipCode.length === 9) {
        let primero = parseInt(zipCode[0]);
        return primero === 8 || primero === 98 && zipCode.includes('-');
    }

    // Si no cumple ninguna de las condiciones, el código postal no es válido.
    return false;
}

console.log(validate('')); //false
console.log(validate('a')); //false
console.log(validate('1234')); //true
console.log(validate('12345')); //true
console.log(validate(' 1234')); //true
console.log(validate('-')); //false
