function validate(name) {
    // Las palabras definidas aquí no se considerarán nombres válidos.
    let palabrasNoValidos = ["not", "fake", "noName"];

    if (name.length < 2 || name.length > 30) return false;
    
    for(let palabra of palabrasNoValidos) {
        if(name.toLowerCase().includes(palabra)) return false;
        
    }
    return true
}

console.log(validate('Juan')); // True
console.log(validate("NoName")); //= False (por las palabras de los arrays)
console.log(validate("   Juan   ")); //= False Porque los espacios en blanco.
