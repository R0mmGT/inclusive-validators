function validate(nombre) {
    // Validar que el argumento sea un string
    if (typeof nombre !== 'string') {
        return false;
    }

    // Eliminar espacios al principio y final
    const nombreTrimmed = nombre.trim();

    // Validar longitud mínima (1 carácter) y máxima (50 caracteres)
    if (nombreTrimmed.length < 1 || nombreTrimmed.length > 50) {
        return false;
    }

    // Validar que solo contenga letras, espacios, guiones o apóstrofos comunes en nombres
    if (!/^[A-Za-zÀ-ÿ\s\-']+$/.test(nombreTrimmed)) {
        return false;
    }

    // Validar que empiece con una letra (no con espacio, guión o apóstrofo)
    if (!/^[A-Za-zÀ-ÿ]/.test(nombreTrimmed)) {
        return false;
    }

    // Validar que no termine con espacio, guión o apóstrofo
    if (/[\s\-']$/.test(nombreTrimmed)) {
        return false;
    }

    // Validar que no tenga caracteres especiales repetidos de forma inválida
    // No puede tener dos espacios, guiones o apóstrofos seguidos
    if (/[\s\-']{2,}/.test(nombreTrimmed)) {
        return false;
    }

    // Validar que no contenga solo espacios o caracteres especiales
    if (!/[A-Za-zÀ-ÿ]/.test(nombreTrimmed)) {
        return false;
    }

    return true;
}
