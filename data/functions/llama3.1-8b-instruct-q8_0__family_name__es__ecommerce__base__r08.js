function validate(apellido) {
    // La longitud del apellido debe ser entre 2 y 60 caracteres.
    if (apellido.length < 2 || apellido.length > 60) {
        return false;
    }
    
    // El apellido debe contener solo letras, espacios en blanco e acentos.
    const patron = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
    if (!patron.test(apellido)) {
        return false;
    }
    
    // Si pasó las primeras validaciones, el apellido es válido
    return true;
}

// Pruebas para la función validar 
console.log(validate("Pérez"));     // Devuelve: true
console.log(validate("Perz"));      // Devuelve: false
console.log(validate(" Pérez "));   // Devuelve: true
console.log(validate("12345"));     // Devuelve: false
