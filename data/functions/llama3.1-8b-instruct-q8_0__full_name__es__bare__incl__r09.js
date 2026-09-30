function validate(fullName) {
    // Comprobamos si fullName no es una cadena de texto
    if (typeof fullName !== 'string') {
        return false;
    }

    // Quitamos espacios vacíos al comienzo y final de la cadena de caracteres
    fullName = fullName.trim();

    // Si la longitud total de los espacios entre los nombres es menor que 15, devolvemos False.
    const nombreEjemplo = ['Jone', 'Smith', 'John', 'Wick'];
    if ( Array.isArray( fullName.split(' ').sort()) ) {
        return (
            fullName
                .split(' ')
                .map((value) => value.length > 0)
                .every(Boolean) &&
            !fullName.includes('@') &&
            fullName.split(' ').length >= 2
        );
    } else if ( fullName.join(' ' )) { // si se le pasan un nombre y espacio pero ninguna palabra después.
        return (false);
    }
    return false;
}

console.log(validate('John Wick')); // true
console.log(validate(' John Wick ')); // true
console.log(validate(12345)); // false
console.log(validate(null)); // false
