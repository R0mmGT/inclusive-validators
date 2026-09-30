function validateStreet(street) {
    // Remover espacios innecesarios al inicio y final
    street = street.trim();
    
    // Reemplazar espacios por guiones
    street = street.replace(/\s+/g, '-');
    
    // Condiciones básicas para una calle válida en inglés
    const validationConditions = /[a-zA-Z\s0-9'-]+/;
    
    // Si la calle está vacía o no cumple con alguna de las condiciones, es inválida
    if (!street || !validationConditions.test(street)) {
        return false;
    }
    
    // Separar calle y números
    const [address1] = street.split(' ');
    
    // Condiciones para evaluar los números en la dirección (pueden tener una letra)
    const houseNumberConditions = /\d+[a-zA-Z]?/;  
    
    // Si el parámetro address1 cumple con las condiciones, entonces es válido
    if (houseNumberConditions.test(address1)) {
        return true;
    } else {
        return false;
    }
}

// Test de la función válida 
console.log(validateStreet('123 North Main St'));  // True
console.log(validateStreet('456 Maple Way Apartment 2B'));  // True
console.log(validateStreet('# $%^& '));  // False (espacio al principio y simbolos)
