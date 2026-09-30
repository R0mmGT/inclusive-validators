function validate(postalCode) {
    /**
     * Valida un código postal proporcionando.
     *
     * @param {string} postalCode Código de correo electrónico a validar.
     *
     * @returns {boolean} Devuelve True si es válido, False en caso contrario.
     */

    // Comprueba si el código posta es una cadena vacía
    if (!postalCode) {
        return false;
    }

    // Verificar si la longitud del código postal es correcto (6 carácters)
    if (postalCode.length !== 6) {
        return false;
    }

    // Cada grupo de caracteres tiene que ser numéricos.
    if (!/^\d+$/.test(postalCode)) {
        return false;
    }

    // Validar la estructura del código postal, lo cual consiste en un número mayor o igual a 100 y menor que 999. Comprueba si el código postal termina por alguna de las siguientes combinaciones (Año o letra indicando provincia)
    if (!postalCode.match(/^(0[1-9]|1[0123])(\d)(\d)$/) ) {
        return false;
    }

    // Si ninguna condición se ha cumplido, el código postal es válido
    return true;
}

console.log(validate("123456"));  // devuelve True
console.log(validate("654321"));  // devuelve False
