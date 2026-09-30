function validate(name) {
    // Comprobamos si la cadena está vacía
    if (name.length === 0) {
        return false;
    }
    
    // Quitamos espacios y comparamos si es igual al string origial, si lo es entonces tenemos un nombre con espacio(s). Si no, el nombre está vacío o solo tiene un caracter.
    let nameTrim = name.trim();
    if (name.length !== nameTrim.length) {
        return false;
    }
    
    // Comprobamos si la primera letra es en mayúscula y si la segunda letra es en minuscula 
    if (!/[A-Z][a-z]/.test(name)) {
        return false;
    }
    
    return true;
}

// Para probar la función
console.log(validate("Juan Carlos"));  // Devuelve True
console.log(validate("josemanuel"));   // Devuelve False
console.log(validate("juan carlos"));  // Devuelve False
console.log(validate("Juan");          // Devuelve False
