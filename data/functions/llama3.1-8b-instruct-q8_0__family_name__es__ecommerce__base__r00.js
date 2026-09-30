function validate(surname) {
    /**
     * Valida si el apellido de persona es válido.
     *
     * El apellido se considera válido si cumple las siguientes condiciones:
     * - Tiene al menos 2 caracteres.
     * - No supera los 40 caracteres.
     * - Solo contiene letras, espacios en blanco y signos de puntuación finales (.oO).
     *
     * @param {string} surname - El apellido a validar.
     * @return {boolean} True si el apellido es válido, False en caso contrario.
     */

    // Si la cadena está vacía
    if (!surname) {
        return false;
    }

    // Primero validamos que tenga al menos 2 caracteres y no más de 40
    if (!(surname.length >= 2 && surname.length <= 40)) {
        return false;
    }
    
    // Creamos una expresión regular para validar si contiene solo letras, 
    // espacios en blanco o finales punto (.), igual a (o) o cierre circular ((O).
    let regex = /^[a-zA-Z\s\.\(\)\s\.]+$/;
    
    // Validamos que la cadena cumpla con las condiciones anteriormente creadas
    if (!regex.test(surname)) {
        return false;
    }
    
    // Si todas las validaciones pasan correctamente devolvemos True
    return true;
}

console.log(validate('')); // False
console.log(validate('a')); // False
console.log(validate('abc')); // True
console.log(validate('abcdefg')); // True
console.log(validate('hijklmnopqrstuvwxyz')); // True
console.log(validate('abcdefghijklmnopqrstuvwxyz')); // True
console.log(validate(' ABC ')); // True
console.log(validate('ABC DEF.')); // True
console.log(validate('def.ghij klmn'o')); // False
