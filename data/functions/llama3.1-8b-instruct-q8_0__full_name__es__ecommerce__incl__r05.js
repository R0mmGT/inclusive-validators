functionvalidateNombreCompleto(nombre) {
    // Si no se ingresa ningún nombre, el registro es invalido
    if (nombre.trim() === '') {
        return false;
    }
    
    // El nombre debe contener minimo 3 caracteres para ser válido
    if (nombre.length < 3) {
        return false;
    }
    
    // Sólo pueden estar permitidos caracteres de leta, espacio e hífen
    for (let caracter of nombre.replace(' ', '').toLowerCase()) {
        
        // Permite letras minusculas y mayusculas
        if (!((caracter >= 'a' && caracter <= 'z') || (caracter >= 'A' && caracter <= 'Z'))){
            return false;
        }
        
        // permite el guión
        if (!(caracter == '-')){
            return false;
        }
    }
    
    return true;
}

console.log(validateNombreCompleto('John Lee'));  // Regresa True
console.log(validateNombreCompleto('Jhonas'));   // Regresa False debido a la longitud
console.log(validateNombreCompleto(' '));      // Regresa Flase
console.log(validateNombreCompleto('12345'));  // Returna False, no tiene letras
