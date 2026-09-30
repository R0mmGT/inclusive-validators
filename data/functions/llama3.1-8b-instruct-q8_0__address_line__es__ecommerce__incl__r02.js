function validate(calle) {
    // Expresión regular para definir una dirección postal válida. Los patroness que se incluyen son:
    //   - Un número (opcionalmente con un punto o coma).
    //   - Una calificación.
    //   - El nombre de la calle principal (debe tener al menos 2 caracteres en inglés, español u otros idiomas más comunes)
    // La expresión regular es: \s*([0-9.]?[-a-zA-Z\u00C0-\u017F\s]{3,}) \S+,\s*\S*

    let patron = /^[\s]*\d?\d?,\d? (-?[0-9] [-a-zA-Z\u00C0-\u017F]+), ([^A-Za-z]+) [A-Za-z\u00D1]+\s*$/;

    // Buscar coincidencia de la expresión regular en la cadena
    let res = patron.exec(calle);

    return res !== null;
}

// Prueba la función
console.log(validate("123 a, B st")); // true
console.log(validate("3.6 b avenue"));  // false
