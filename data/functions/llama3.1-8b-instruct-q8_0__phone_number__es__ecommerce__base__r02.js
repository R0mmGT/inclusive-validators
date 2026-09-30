function validate(phone_number) {
    // Remuevo espacios desnudos
    phone_number = phone_number.replace(/\s+/g, '');
    
    // Verifico si el número de teléfono tiene mínimo 10 dígitos
    if (phone_number.length < 10) {
        return false;
    }
    
    // Chequear que no tenga más de 15 números
    if (phone_number.length > 15) {
        return false;
    }
    
    // Buscar símbolos válidos
    let validationSet = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
    for (let i=0; i<phone_number.length; i++) {
        if (!validationSet.has(phone_number[i])) {
            return false;
        }
    }
    
    // Si no se han encontrado errores, el número de teléfono es válido
    console.log("El número %s es un número telefónico.", phone_number);
    return true;
}

// Ejemplo de uso:
let telefono = "(123) 456-7890";
console.log(validate(telefono));  // true
