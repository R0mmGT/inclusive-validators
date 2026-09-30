function validate(name) {
    // Verifica si la cadena está vacía.
    if (name.length === 0) return false;

    // Verifica si todos los caracteres están entre las letras del alfabeto mayúsculas y minúsculas, o un espacio blanco.
    let pattern = /^[a-zA-Z\s]+$/;
    return name === name.toUpperCase() ||
        pattern.test(name);
}

console.log(validate(""));  // False
console.log(validate("JOHN"));  // True
console.log(validate("John"));  // False
console.log(validate("john smith"));  // False
console.log(validate("John Smith"));  // True
