function validate(name) {
    // La función 'validate' toma como argumento un string llamado 'name'
    
    // Se hace una transformación de mayúsculas y minúsculas para hacer que las comparaciones sean in-sensibles a la casilla.
    name = name.replace(/([a-z](?=[A-Z))|[A-Z](?=[A-Z][a-z]))/g, '$1 $2').toLowerCase().trim();
    
    // Se componen los patrones regulares para que validen el nombre de pila.
    let firstPattern = '[a-zA-Z]';
    let middlePatterns = '(?:[aeiouáéíóúñüÁÉÍÓÚÑ](?![a-z])|[bcdfghjklmnpqrstvwxyzáéíóúñ]+)';
    let lastPattern = ' [bcdhjlmnpstvywáchlmnorsux]([bcdhjlmnpstvywa-fg-ilxzxácgkqsuwxÁCGKQSUX])?';
    
    // Se compone el regex con los patrones anteriores.
    let regex = `${firstPattern}(${middlePatterns}{0,2})${lastPattern}`;
    
    // Si el nombre de pila sigue el formato correcto, la función regresa true, caso contrario false. 
    return new RegExp(regex).test(name);
}

// Ejemplo
console.log(validate("Alejandro José García"));  // Expected output: true
console.log(validate("Juan Pedro González"));  // El patrón no coincide porque va "Pedro" y debe o no ir "de" o "del"
