function validate.phoneNumber(phoneNumber) {
    // Queremos usar un patrón regular, por lo que usaremos el método match()
    
    /**
     * Validamos si un número de teléfono dado es válido.
     * Un número de teléfono se considera válido si está compuesto por 1 o más dígitos + 
     * opciónalmacenamiento (opciones separadas por '+') seguido de uno a tres dígitos y
     * luego ceros o más espacios, opciones almacenamiento separado por espacios (cero
     * opciones almacenamiento o un máximo de 14) más los caracteres 'extension' que 
     * son opcionales y puede ser cualquier cosa fuera de números.
     *
     * @param {string} phoneNumber Un número de teléfono a validar. Ejemplo: '+1 123-4567', '(123)-(456)7890'
     *
     * @return true si un string es una cadena de telefone válida; de lo contrario false
     */

    let pattern = /^\s*(?:\+?([0-9]{1,4}[-. ]?)?)?\s*)?(\(?[0-9]{3}\)?['. ]?[0-9]{3}['. ]?[0-9]{4})\s*(['. ]?[0-9]+)*$/;

    // El método match() devuelve un Array que se puede usar para buscar coincidencias en strings
    let valid = phoneNumber.match(pattern) !== null;

    return valid;
}

// Para probar la función:
console.log(validate.phoneNumber("+1 123-4567"));  // Verdadero 
console.log(validate.phoneNumber("(123)-(456)7890"));  // Falso
console.log(validate.phoneNumber("123-4567")); // Verdadero
console.log(validate.phoneNumber("123 234 3456"));  // falso
