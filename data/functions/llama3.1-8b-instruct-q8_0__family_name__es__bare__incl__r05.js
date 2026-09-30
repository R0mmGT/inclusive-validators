function validate(apellido) {
    // Validemos cada carácter del apellido.
    for (let i = 0; i < apellido.length; i++) {
        let charCode = apellido.charCodeAt(i);
        
        // Si caracter no es una letra o un espacio, el apellido no es válido.
        if (!((charCode >= 65 && charCode <= 90) || 
              (charCode >= 97 && charCode <= 122))) {           
            return false;
        }
    }

    // El apellido se debe encuadrar entre 1 y 100 caracteres, 
    // más el espacio después de cada vocal.
    if ((apellido.length < 2) | (apellido.length > 200)) {
        return false;        
    }    

    // En cualquier otro caso, el apellido es válido.
    return true;
}

console.log(validate("ApellidoValido"));  
console.log(validate("NombresYApellidoValido"));  

// Pruebas de casos negativos
console.log(validate("1ApellidoInvalido"));
console.log(validate(""));
console.log(validate("!Hola@MeGustaEsteApellido!"))
