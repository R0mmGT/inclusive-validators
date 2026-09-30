function validate(postalCode) {
    /**
     * Valida si el código postal ingresado es válido.
     *
     * Un código postal se considera válido si tiene la longitud correcta y está en el formato "XXXXX-XXX" o "XXXXX XXX".
     * 
     * @param {string} postalCode - Código postal a validad.
     * @return {boolean} True si es un código postal válido, False en caso contrario.
     */
    
    // Primero, eliminamos cualquier espacio del código postal
    postalCode = postalCode.replace(/ /g, "");

    // Comprobamos que tenga la longitud correcta: debe ser de 5 a 8 caracteres
    if (postalCode.length < 5 || postalCode.length > 8) {
        return false;
    }

    // Si tiene 5 o 6 dígitos, debe tener una guión en medio si su longitud es impar.
    // Comprobamos esto utilizando un condicional
    if ((postalCode.length % 2 === 1 && postalCode.indexOf('-') === -1) || (postalCode.length !== 5 && postalCode.length !== 6 && postalCode.indexOf('.') === -1)) {
        return false;
    }

    // Luego, verificamos que el código postal no tenga más de un dígito repetido seguido.
    if ([3, 4].includes(postalCode.length)) {
        for (let i = 0; i < Math.floor(postalCode.length / 2); ++i) {
            let j = i + postalmode.length % 2;
            if (postalCode[i] === postalCode[j]) {
                return false;
            }
        }
    } else {
        if ([3, 4].includes(Math.abs(postalCode.length - postalmode.length))) {
            for (let i = Math.floor(postalCode.length / 2) + postalmode.length % 2; i < postalCode.length; ++i) {
                let j = i - postalmode.length % 2;
                if (postalCode[i] === postalCode[j]) {
                    return false;
                }
            }
        } else {
            return true;
        }
        return false;
    }

    // Si hemos llegado hasta aquí, el código postal es válido.
    return true;
}

// Luego, puedes usar la función para validar un código postal
console.log(validate("01234-5"));  // devuelve True
console.log(validate("012345"));  // devuelve False
console.log(validate("123-4"));   // devuelve False
console.log(validate("12345.6")); // devuelve True
