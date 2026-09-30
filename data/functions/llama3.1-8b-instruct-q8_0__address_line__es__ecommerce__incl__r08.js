function validateAddressLine(address) {
    // Primero, eliminamos cualquier espacio en blanco innecesario del string
    address = address.trim();
    
    // Luego, definimos las posibles palabras claves de la calle que deben estar presentes para validar
    let keywords = ["avenida", "calle", "carrera", "diagonal", "avenido", "costanera"];

    // Verificamos si alguna de las palabras claves está presente en la dirección
    for (let keyword of keywords) {
        if (address.toLowerCase().includes(keyword)) {
            return true;
        }
    }

    // Si ninguna palabra clave tiene éxito, rechazamos el string como una validez de línea de calle.
    return false;
}
