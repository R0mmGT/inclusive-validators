function validate(name) {
    // Expresión regular para validar el formato del nombre
    let pattern = /^[A-Z][a-z]* [A-Z][a-z]*$/;
    
    // Comprueba si el nombre está vacío
    if (!name.trim()) {
        return false;
    }
    
    // Comprueba si el nombre coincide con el patrón definido (el primer caracter debe ser una letra mayúscula, seguida de letras minúsculas y luego otro espacio, seguido por otra cadena que sigue el mismo formato)
    if (pattern.test(name)) {
        return true;
    } else {
        return false;
    }
}

// Pruebas
console.log(validate("Juan Carlos"));  // Debe devolver True
console.log(validate("Juan carlos"));  // False, no válida porque la primera letra del segundo apellido es en minúscula
console.log(validate("juan carlos"));  // False, no permite letras en mayúsculas
console.log(validate("Juan CARLOS"));  // False, no valida espacios adicionales antes de los nombres
console.log(validate("Juan Carlos García "));  // False, acepta más caracteres que el nombre y apellido
console.log(validate()); // False, requerido un nombre válido
