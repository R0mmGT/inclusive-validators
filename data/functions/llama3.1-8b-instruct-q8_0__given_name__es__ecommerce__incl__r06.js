function validate(name) {
    // Convierte la cadena a minúsculas para evitar comparaciones case-sensitive
    name = name.toLowerCase();

    // Revisa si la cadena tiene entre 2 y 40 caracteres (longitud válida de un nombre)
    if (name.length < 2 || name.length > 40) {
        return false;
    }

    // Revisa si la cadena contiene solo letras, espacios en blanco o carácteres especiales comunes
    for (let char of name) {
        if (!(/^[a-z ]+$|[^a-zA-Z\s]/.test(char))) {
            return false;
        }
    }

    // Si no hay errores hasta ahora, el nombre es válido
    return true;
}

console.log(validate("Juan Pedro"));  // True
console.log(validate("Pepe López"));   // False (más de 40 caracteres)
console.log(validate("ABC123"))      // False (son carácteres especiales o números)
