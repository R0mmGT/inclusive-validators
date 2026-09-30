function validateName(name) {
    /**
     * Valida si la entrada del usuario es un nombre completo válido.
     *
     * Un nombre completo válido debe tener al menos dos palabras con letras (mayúsculas o minúsculas),
     * donde cada letra sea una palabra, sin símbolos ni números.
     */
    // Si el nombre está vacío o tiene menos de 2 caracteres, lo declaramos inválido
    if (!name || name.length < 2) {
        return false;
    }

    let words = name.split(' ');

    // Buscamos cada palabra en el arreglo y confirmamos que sea una letra y tenga al menos un caracter.
    for (let i in words) {
        words[i] = words[i].trim();
        if (!/[a-zA-Z]/.test(words[i])) return false;
    }

    // Si todas las condiciones anteriores se cumplieron, el nombre es válido
    return true;
}
