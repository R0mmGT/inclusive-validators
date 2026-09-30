function validate(nombre) {
    // Se comprueba si existe al menos una letra mayúscula, que tenga al menos un carácter de longitud (es decir no vacío)
    if ((/^[A-Z][a-z]* [A-Z][a-z]+$/.test(nombre))) {    // Se ha utilizado expReg como en python
        return true;
    }
    return false;
}

// Puebas
console.log(validate("Juan López"));   // Devuelve: True
console.log(validate("juanlopez"));   // Devuelve: False (el nombre no tiene ninguna letra mayúscula)
console.log(validate("AABBBCCC"));   // Devuelve: False (no es un nombre de pila válido, ni sigue el formato que requiere al menos una palabra con las palabras separadas por espacios en blanco)
