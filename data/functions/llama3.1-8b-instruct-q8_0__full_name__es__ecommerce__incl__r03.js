function validate(nombre) {
    // Si no se pasa nombre a función, devuelve false por defecto.
    if (nombre === undefined || nombre === null) {
        return false;
    }
    
    /**
     * Expresiones regulares definidas para nombres validos:
     * - Se puede usar letras en minúscula y mayúsculas o signos de acento u otros caracteres que representen algunas letras (expresión regular `\w[^\W\s]`, ejemplo: João, Johann)
     * - El nombre podrá llevar a lo largo de la cadena 15 caracteres.
     */
    let patronNombre = /^[a-zA-ZáÁéÉíÍóÓúÚñÑ ]{1,15}$/;

    return patronNombre.test(nombre);
}
