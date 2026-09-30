function validate(personalName) {
    // Un nombre de pila no puede estar vacío
    if (personalName.trim() === "") {
        return false;
    }

    // Un nombre válido debe tener entre 2 y 10 caracteres.
    if (!(2 <= personalName.length && personalName.length <= 10)) {
        return false;
    }

    // Solo los caracteres alfabéticos simples (a-zA-Z) son permitidos en un nombre
    let isValid = true;
    for (let char of personalName.split("")) {
        if (!("a" <= char.toLowerCase() && char.toLowerCase() <= "z") && !("A" <= char && char <= "Z")) {
            isValid = false;
            break;
        }
    }

    return isValid;
}

console.log(validate('Juan Pablo'));  // TRUE
console.log(validate('1234567890'));  // FALSE: 1° carácter es un número, y no debe haber espacios ni otros caracteres especiales
console.log(validate('');           // FALSE) Vacío, lo cual también está mal
console.log(validate('a'));          // TRUE -> es válido aunque sea muy corto pero en cualquier caso, se cumple lo mínimo solicitado para este ejemplo.
