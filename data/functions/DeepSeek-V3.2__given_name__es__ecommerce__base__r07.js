function validate(nombre) {
    // Verificar que el argumento sea un string
    if (typeof nombre !== 'string') {
        return false;
    }

    // Eliminar espacios al inicio y final
    const nombreTrimmed = nombre.trim();
    
    // Verificar que no esté vacío después del trim
    if (nombreTrimmed.length === 0) {
        return false;
    }

    // Verificar longitud razonable para un nombre (entre 1 y 50 caracteres)
    if (nombreTrimmed.length > 50) {
        return false;
    }

    // Verificar que contenga solo letras, espacios, guiones, apóstrofes y puntos
    // (permitiendo nombres como "Jean-Pierre", "O'Connor", "St. John")
    const nombreRegex = /^[A-Za-zÀ-ÿ\s\-'.]+$/;
    if (!nombreRegex.test(nombreTrimmed)) {
        return false;
    }

    // Verificar que no empiece o termine con caracteres no alfabéticos
    const nombreSinEspacios = nombreTrimmed.trim();
    if (!/^[A-Za-zÀ-ÿ]/.test(nombreSinEspacios) || !/[A-Za-zÀ-ÿ]$/.test(nombreSinEspacios)) {
        return false;
    }

    // Verificar que no tenga secuencias inválidas de caracteres especiales
    if (/\s{2,}/.test(nombreTrimmed) || /[-'.]{2,}/.test(nombreTrimmed)) {
        return false;
    }

    // Verificar que tenga al menos una letra (no solo caracteres especiales)
    const letrasRegex = /[A-Za-zÀ-ÿ]/;
    if (!letrasRegex.test(nombreTrimmed)) {
        return false;
    }

    // Verificar que comience con mayúscula (opcional pero buena práctica para nombres)
    // Comentado porque podría ser muy restrictivo
    // if (!/^[A-ZÀ-ÿ]/.test(nombreTrimmed)) {
    //     return false;
    // }

    return true;
}
