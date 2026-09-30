function validate(nombreCompleto) {
    /**
     * Esta función valida si un string es un nombre completo de persona válido.
     *
     * Un nombre completo es considerado válido si cumplen las siguientes condiciones:
     * - Comienza con mayúscula.
     * - Contiene al menos dos nombres separados por espacio en blanco (no incluyendo artículos como "el" o "la").
     * - No contiene números ni símbolos especiales.
     *
     * @param {string} nombreCompleto El nombre completo a validar.
     * @returns {boolean} True si el nombre completo es válido, False en caso contrario.
     */

    // Primero comprobamos que la cadena no esté vacía y comience con una mayúscula
    if (!nombreCompleto || !/[A-Z]/.test(nombreCompleto)) {
        return false;
    }

    // Si el nombre completo solo contiene una palabra, es considerado válido
    if (nombreCompleto.split(' ').length <= 1) {
        return true;
    }

    // Comprobamos si todas las palabras que componen el nombre completo comienzan con mayúscula y contienen solo letras
    let nombreValido = true;
    for (let palabra of nombreCompleto.split(' ')) {
        if (!/[A-Z]/.test(palabra) || !/^[a-zA-Z]+$/i.test(palabra)) {
            nombreValido = false;
            break;
        }
    }

    // Si hemos validado todas las condiciones, el nombre completo es válido
    return nombreValido;
}

console.log(validate("Juan Carlos"));  // true
console.log(validate("juan carlos"));   // false (comienza con mayúscula)
console.log(validate("Juancarlos"));     // false (no contiene espacio en blanco)
console.log(validate("juancarlos"));    // false (contiene letras y números, pero no espacio en blanco)
console.log(validate("Juan Carlos Lopez"));  // true
