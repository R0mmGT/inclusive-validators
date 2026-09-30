function validate(zonaPostal) {
    // Primero, eliminamos cualquier carácter que no sea un número o una letra
    zonaPostal = zonaPostal.replace(/\D+/g, '');

    // Comprobación de la longitud del código postal, debe ser de al menos tres y como máximo 15 caracteres    
    if (zonaPostal.length >=3 && zonaPostal.length <=15) {
        return true;        
    } else {
        return false;
    }
}


// Pruebas unitarias
console.log(validate('123456'));  // devuelve True porque tiene longitud válida 
console.log(validate('abcde'));   // devuelve False porque tiene letras y menos de la maxima longitud requerida
console.log(validate('000-0000-00000'));   // devuelve False porque tiene la combinación incorrecta de guiones y números
