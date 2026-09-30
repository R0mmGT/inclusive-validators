function validate(nombre) {
    /**
     * Valida un nombre completo de persona.
     *
     * El nombre completo debe tener mínimo 2 y máximo 50 carácteres, 
     * incluir al menos dos palabras y no contener acentos, números ni caracteres especiales. 
     */
    
    // Comprobamos si el nombre tiene longitud miníma
    if (nombre.length < 2) return false;
    
    // Comprobamos si el nombre tiene longitud máxima
    if (nombre.length > 50) return false;
    
    // Creamos un array con todas las palabras del nombre sin acentos
    let palabras = nombre.toLowerCase().split(' ');
    
    // Comprobamos si hay al menos dos palabras en el nombre
    if (palabras.length < 2) return false;
    
    // Comprobamos que cada palabra no contenga números ni caracteres especiales
    for (let palabra of palabras) {
        let soloLetras = true;
        for (let caracter of palabra) {
            if (!CharacterIsLetter(caracter)) {
                soloLetras = false;
                break;
            }
        }
        if (!soloLetras) return false;
    }
    
    // Sí se ha superado todas las comprobaciones, devuelve True
    return true;

function CharacterIsLetter(c) {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
}
