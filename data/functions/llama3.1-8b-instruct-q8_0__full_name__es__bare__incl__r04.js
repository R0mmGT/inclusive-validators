function validateNombreCompleto(nombre) {
    // Expresión regular según ISO 15022
    let pattern = /^[a-zA-ZáéíóúÜÁÉÍÓÚÁÇÖÑñ\s.,]*$/;
    
    return pattern.test(nombre);
}

console.log(validateNombreCompleto('Juan Pérez'));  // -> true
console.log(validateNombreCompleto('JuanPerez'));   // -> false
