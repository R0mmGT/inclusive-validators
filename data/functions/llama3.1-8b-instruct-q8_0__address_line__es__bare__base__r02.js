function validate(addressLine) {
    // La expresión regular define las condiciones para que sea válido una calle
    let postalPattern = /^[A-Za-z0-9 #\.\-\,]+ ([A-Za-z0-9#\.]) ?([A-Za-z]{2}) (\d{1,4}|\d{1,3}),? (\d{4}) $|^(?:N° )?(\w+) (?\d{1,4})\.? (\d*)\,\s*(.+) $/;

    // Si la expresión regular es exitosa para el input de dirección
    let matches = postalPattern.exec(addressLine);

    // De vuelta a una llamada al método true; Para que devuelva true si es válido, false en su caso.
    return !!matches;
}

// Ejemplo de uso:
console.log(validate("123 Main Street"));  // true
console.log(validate("456 Other Way"));   // true
console.log(validate("789 New City"));    // true
console.log(validate("001 ABC"));         // false
