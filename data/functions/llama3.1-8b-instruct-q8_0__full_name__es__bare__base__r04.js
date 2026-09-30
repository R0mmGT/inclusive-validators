function validate(name) {
    // Reemplaza cualquier caracter no alfabético por una cadena vacía
    name = name.replace(/[^A-Za-z\s]/g, "");

    // Elimina espacios duplicados y convierte todo a minúscula
    name = name.trim().toLowerCase();

    // Divide el nombre en partes (palabras separadas)
    let parts = name.split(" ");

    // Un nombre completo está compuesto por un apellido, uno o dos nombres de pila
    if (parts.length <= 3) {
        return true;
    } else {
        return false;
    }
}

console.log(validate("Juan Carlos Pérez"));  // true
console.log(validate("Juan"));  // true
console.log(validate("John   Smith"));  // false
