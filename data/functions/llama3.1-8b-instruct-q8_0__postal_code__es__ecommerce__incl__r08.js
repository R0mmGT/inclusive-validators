function validate(postcode) {
    /**
     * Valida si un código postal es válido.
     *
     * Un código postal es válido según las siguientes reglas:
     * - Contiene letras y números, pero no acentos ni otros caracteres especiales.
     * - No comienza o termina con un espacio.
     * - El valor mínimo en España seria "01001", el máximo es en Isla de Man: "IM1 1HD".
     *
     * @param {string} postcode Cadena que contiene el código postal para verificar.
     * @return {boolean} True si el codigo postal es válido, False si no lo es
     */

    // Verifica si el código postal tiene al menos dos caracteres y máximo diez (considero hasta los espacios en blanco)
    if (postcode.length < 2 || postcode.length > 10) {
        return false;
    }

    /**
     * En lugar de hacer un arreglo de cada pais, 
     */
    // Elimina los espacios del código postal
    postcode = postcode.replace(" ", "");

    // Verifica si todas las cadenas son solo letras y números.
    for (var i = 0; i < postcode.length; i++) {
        if (!/^[a-zA-Z0-9]$/.test(postcode[i])) return false;
    }
    return true;
}
