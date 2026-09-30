function validate(name) {
    // Revisa si el nombre está vacío o contiene solo espacios
    if (!name.trim()) return false;

    // Revisa si el nombre contiene todos caracteres válidos (alfanuméricos, guiones)
    for (let i = 0; i < name.length; i++) {
        let charCode = name.charCodeAt(i);
        
        // Comprueba si es un espacio o uno de los símbolos permitidos
        if (!((charCode >= 97 && charCode <= 122) || 
              (charCode >= 65 && charCode <= 90) ||  
              (charCode === 32))) {
            return false;
        }
    }

    // Si el nombre pasa por todas las pruebas anteriores, es válido
    return true;
}

// Por ejemplo:
console.log(validate("Smith"));      // Imprime "true"
console.log(validate("Pérez Gómez")); // Imprime "true"
console.log(validate("   "));        // Imprime "false" (nada)
console.log(validate("Hola Mundo"));  // Imprime "false" (espacios no válidos)
