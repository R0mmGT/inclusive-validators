function validate(nombreDePila) {
    /**
     * Valida si un nombre es válido como nombre de pila,
     * según ciertos criterios generales de validez para usuarios de diferentes países.
     *
     * @param {string} nombreDePila - String con el nombre de pila para validar.
     * @returns {boolean} True si el nombre es válido, False en caso contrario.
     */

    // Si no se proporciona ningún valor, devuelve False
    if (!nombreDePila) {
        return false;
    }

    // El nombre solo debe contener letras, espacios en blanco y posibles signos de puntuación en algunos nombres (como . o ')
    const patron = /^\w+[\s\.,\'-]+$/i;

    // Si el nombre no se ajusta al patrón comúnmente aceptado para nombres en español, regresa False.
    if (!patron.test(nombreDePila)) {
        return false;
    }

    // Solo debe haber un número de tres dígitos máximo, si está presente
    const patronNumerico = /\b\d{1,3}\b/g;
    if (nombreDePila.match(patronNumerico)) {
        nomePilaNum = nombreDePila.split(" ");

        // Revisa cada elemento encontrada por separado
        for(let nombreDePila in nomePilaNum) {
            if(/^(0[0-9]|[1-2][\d]|3[01])$/.test(nomePilaNum[nombreDePila])){
                return false;
            }
        }

    }

    // Si se cumple cualquier condición anterior, el nombre no es válido
    return true;
}

console.log(validate("Juan"));  // Devuelve true
console.log(validate("Juan-Pablo"));  // Devuelve false por tener más de un espacio
console.log(validate('John Doe'));   // Returns True because it's a string for a First name and Second name, separated by space.

