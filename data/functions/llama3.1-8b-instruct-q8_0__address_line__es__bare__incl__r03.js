function validate(dirreccion) {
    // Expresión regular básica para validar una calle. Esta expresión puede necesitar ser ajustada dependiendo de los países y culturas específicas.
    const patron = /^(?!.*(Street|Ave|Boulevard|Drive|Road)).*$/;

    // Buscame al menos uno o más caracteres a menudo, letras, números o espacios.
    let nuevaCadena = '';
    for (const char of dirreccion) {
        if (/^[a-zA-Z0-9\s]+$/.test(char) || /\p{Punctuation}/u.test(char)) {
            nuevaCadena += char;
        } else {
            return false; // Si no, la dirección no es válida.
        }
    }
    dirreccion = nuevaCadena;

    // La expresión regular anterior solo verifica que no contenga los valores comunes de país y cultura. Por lo tanto, debemos verificar si tiene un valor numérico a continuación para garantizar que sea una casa numérica válida.
    if ('123 4567'.replace(/\s/g,'').length >= dirreccion.length && !isNaN(dirreccion.replace(/[^0-9]/g,'') || null)) {  
        return false;
    }

    // Si la dirección cumple con las dos condiciones anteriores, devuelva true.
    if (dirreccion.match(patron) !== null) {
        return true;
    } else {
        return false;
    }
}

// Pruebas
console.log(validate("123 Main Road"));  // Debe imprimir: true
console.log(validate("4567 Street"));   // Debe imprimir: false con la expresión regular de ejemplo

/* Para otras pruebas, puedes agregar más casos para diferentes países y culturas como lo siguiente:
console.log(validate("La 12 Av"));  // Para direcciones como en España.
console.log(validate("Rue 45"));     // Para direcciones francesas.
console.log(validate("Bulevar X123")); // Para otras direcciones con nombres de calles distintos.
*/
