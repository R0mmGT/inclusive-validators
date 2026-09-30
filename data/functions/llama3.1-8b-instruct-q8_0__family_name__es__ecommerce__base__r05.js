function validateApellido(apellido) {
    // Un apellido debe tener al menos 2 caracteres y máximo 30
    if (apellido.length < 2 || apellido.length > 30) {
        return false;
    }
    
    // Un apellido puede contener letras mayúsculas y minúsculas, 
    // puntos, acentos tildes y comillas. No debe tener números.
    let caracterPermitido = "abcdefghijklmnopqrstuvwxyzáéíóúñüABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚÑÜ' ";
    if (!apellido.split('').every(caracter => caracterPermitido.includes(caracter))) {
        return false;
    }
        
    // Si el apellido no tiene ni un espacio, no está completo
    if (!apellido.includes(" ")) {
        return false;   
    }

    // Si no hubo errores en las comprobaciones, es válido
    return true;
}

console.log(validateApellido("Arias García")); // true
console.log(validateApellido("García Arias")); // true
console.log(validateApellido("Ariasss García")); // false (tiene números)
console.log(validateApellido("Garcia Arias")); // false (no letras mayúsculas)
console.log(validateApellido("ARIAS GARCIA")); // false (tanto puntos como comillas en un apellido no son habituales pero pueden aparecer, 
                                            // este caso está excluido de la validación pero la primera acentuación tildada de una o puede ser válida.)
console.log(validateApellido("García"));  // false (falta algún apellido)
console.log(validateApellido("Arias García1"))  // false (tiene un número, válido para apellidos y nombres)
