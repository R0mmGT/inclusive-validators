function validate(zipCode) {
    // Si no es string, devolvemos false
    if (typeof zipCode !== 'string') {
        return false;
    }
    
    // Eliminamos todos los espacios.
    zipCode = zipCode.replace(/\s+/g, '');
    
    let longitud = zipCode.length
    
    //Verificamos si la longitud del código postal es 5 o mayor, sino no es válido
    if (longitud < 5) {  
        return false;
    } 

    // Recorremos cada carácter
    for (let i = 0; i < zipCode.length; i++) {
        
        //Si encontramos un caracter que no sea alfanumérico, devolvemos falso.
        if (!zipCode[i].match(/^[a-zA-Z\d]$/)) {  
            return false;
        }
        
    }

    
    return true;
}

console.log(validate('12345'));  //Devuelve: true
console.log(validate('    12345 '));  //Devuelve: true
console.log(validate('125435'));   //Devuelve: false
console.log(validate('abc45'));    //Devuelve:false
