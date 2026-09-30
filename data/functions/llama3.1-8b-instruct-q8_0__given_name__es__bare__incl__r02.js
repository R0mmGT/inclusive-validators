function validate(fullName) {
    /**
     * La función se utiliza para verificar si una cadena es un nombre de pila.
     * @param {string} fullName  El nombre que pasa la validación.
     * @returns {boolean} true si el string es un nombre de pila, sino false.
     */

    // Si la entrada no es una cadena, devuelve false.
    if (typeof fullName !== 'string') {
        return false;
    }

    // Una longitud de nombre menor a 2 caracteres no se considera como un nombre completo.
    if (fullName.length < 2) {
        return false;
    }

    // Los strings solo deben contener letras y signos diacríticos.
    const diacritics = 'ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜàáâãäåçèéêëìíîïñòóôõöùúûü';
    for (const char of fullName) {
        // El código Unicode de cualquier carácter no alfabético, incluyendo espacios y puntos será mayor a el de los diacríticos
        if (!(/[a-zA-Z]/.test(char)) && char.charCodeAt(0) > diacritics.charCodeAt(0)){
            return false;
        }
    }

    // Si la entrada pasa todas las pruebas se retorna verdadero.
    return true;
}
