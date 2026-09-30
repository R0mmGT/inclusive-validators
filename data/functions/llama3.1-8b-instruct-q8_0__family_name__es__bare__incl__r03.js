function validate(apellido) {
    // Elimina espacios en blanco al principio y al final del apellido
    apellido = apellido.trim();

    // Comprueba si tiene entre 1 y 50 caracteres (un rango común para apellidos de personas)
    if (!apellido || apellido.length > 50) {
        return false;
    }

    // Revisa si todas las letras son minúsculas o mayúsculas
    for (let i = 0; i < apellido.length; i++) {
        let c = apellido[i];
        // Comprueba que los caracteres sean letras, dígrafos, puntitos, tildes y cedillas. Si no fueran estos, devuelve false.
        if (!((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') ||
            ((c >= 'á' && c <= 'ü') || c === "ä" || c === "Ä" || c === "ö" || c === "Ö") ||
            ((c >= 'À' && c <= 'Ý') || c === "Ç" || c === "Œ"))) {
                return false;
        }
    }

    // Si todo pasa, devuelve true
    return true;
}
