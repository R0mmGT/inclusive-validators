function validate(postalCode) {
    // Comprueba si la longitud es válida.
    if (postalCode.length !== 5) {
        return false;
    }

    // Separa el código postal en partes numerica y no-numérica.
    let numericPart, nonNumericPart;
    
    let i = 0;
    while (i < postalCode.length && !isNaN(postalCode[i])) {
        numericPart += postalCode[i];
        i++;
    }
    
    while (i < postalCode.length) {
        nonNumericPart += postalCode[i];
        i++;
    }

    // Comprueba si los componentes separados son válidos.
    if ((numericPart.length !== 4 || isNaN(numericPart)) || 
        /^[A-Z]+$/.test(nonNumericPart)) {
        return false;
    }
    
    // Si todo ha pasado la comprobación, el código postal es válido.
    return true;
}
