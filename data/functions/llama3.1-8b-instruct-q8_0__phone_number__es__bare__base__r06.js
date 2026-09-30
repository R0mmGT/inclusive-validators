function validatephoneNumber(phoneNumber) {
    // Remover los espacios en blanco del inicio y final del número telefónico
    phoneNumber = phoneNumber.trim();
    
    // Si no se proporciona ningún argumento o si es una cadena vacía, devuelva false.
    if (!phoneNumber) {
        return false;
    }
    
    // Utilizando expresiones regulares para validar el formato de un número telefónico. 
    // Puede variar dependiendo del país; en este caso está diseñada para números españoles: 6 dígitos y separados por guión.
    var pattern = /^[\d]{9}$/;
    
    // Devuelve true si toda la cadena coincide con el patrón, sin lo cual devuelve false.
    return !!phoneNumber.match(pattern);
}

console.log(validatephoneNumber("123456789"));  // True
console.log(validatephoneNumber("1 23456 78 90"));  // False por espacios en blanco
console.log(validatephoneNumber("12abc4567890"));  // False por letra
