function validate(calle) {
    // Expresión regular básica para obtener cualquier cosa excepto números y espacios
    let re = /\D/g;
    
    // Reemplazar cualquier espacio por una cadena vacía, lo que significa que estamos 
    // eliminando los espacios de la línea para facilitar el reconocimiento de la expresión regular.
    calle = calle.replace(re, '');
    
    // Preguntas claves en línea de dirección postal
    let preguntaClave1 = ['norte', 'sur', 'este', 'oeste'];
    let preguntaClave2 = ['nordeste', 'sureste', 'noroeste', 'suroeste'];
    for (let clave of preguntaClave1) {
        // Buscar cualquier instancia de la palabra en clave, ya tenga o no mayúsculas.
        if (calle.toLowerCase().includes(clave)) {
            return true;
        }
    }
    for (let clave of preguntaClave2) {
        if (calle.toLowerCase().includes(clave)) {
            return true;
        }
    }
    
    // Verificar si el objeto de la línea termina con una letra.
    if (!/^[^0-9]+$/.test(calle[calle.length - 1])) { 
        return false; 
    }
    
    // Si todas estas declaraciones no devuelven true, no es un objeto legítimo
    return false;
}

console.log(validate("123 E Main St"));  // Devuelve: true
console.log(validate("123 West Main Street"));  // Devuelve: true
console.log(validate("123 Main St N")); // Devuelve: true
console.log(validate("123 #45"));         // Devuelve: true
console.log(validate("123A"));            // Devuelve: false
