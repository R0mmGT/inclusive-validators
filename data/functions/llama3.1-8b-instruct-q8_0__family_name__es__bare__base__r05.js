function validate(apellido) {
    // Reemplazamos todos los espacios en blanco por un guión medio para transformar la cadena en una forma válida para comparar.
    apellido = apellido.replace(/\s+/g, "-");

    // Usamos las expresiones regulares para probar si el string sigue el formato correcto de apellidos y nombres.
    let pattern = /^([A-Z]{1}[a-z]{2,10}\-)?([A-Z]{1}[a-z]{2,10})$/;

    // El método test compara la cadena con un patrón. Si encuentra un match, devuelve true; en otro caso false.
    return (pattern.test(apellido));
}

// Para probar el programa
console.log(validate('Doe'));  // Regresa true (apellido válido)
console.log(validate('Doe-Jane'));  // Regresa true (también válido)
console.log(validate('Jane Doe-Jane'));  // Regresa false (no cumple con una sola unidad)
