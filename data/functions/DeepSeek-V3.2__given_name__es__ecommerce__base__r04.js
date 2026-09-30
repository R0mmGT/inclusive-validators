function validate(nombre) {
    // Verificar que el argumento sea un string
    if (typeof nombre !== 'string') {
        return false;
    }

    // Eliminar espacios al principio y final
    const nombreTrim = nombre.trim();
    
    // Verificar longitud mínima y máxima (por ejemplo, entre 2 y 50 caracteres)
    if (nombreTrim.length < 2 || nombreTrim.length > 50) {
        return false;
    }

    // Verificar que solo contenga letras, espacios, guiones y apóstrofes (comunes en nombres)
    // Permitir también letras con acentos y caracteres especiales de diferentes idiomas
    const nombrePattern = /^[\p{L}' -]+$/u;
    if (!nombrePattern.test(nombreTrim)) {
        return false;
    }

    // Verificar que no empiece ni termine con espacios, guiones o apóstrofes
    if (/^[ '-]|[ '-]$/.test(nombreTrim)) {
        return false;
    }

    // Verificar que no haya caracteres especiales repetidos consecutivamente
    if (/[' -]{2,}/.test(nombreTrim)) {
        return false;
    }

    // Verificar que tenga al menos una letra (no solo caracteres especiales)
    if (!/\p{L}/u.test(nombreTrim)) {
        return false;
    }

    // Verificar que la primera letra de cada palabra (separadas por espacios, guiones) sea mayúscula
    // Esto es opcional según requisitos, pero común en nombres propios
    const palabras = nombreTrim.split(/[ -]+/);
    for (const palabra of palabras) {
        if (palabra.length > 0) {
            // Permitir nombres como "de la Cruz", "van der Meer", etc. donde algunas preposiciones van en minúscula
            const palabrasMinusculas = ['de', 'del', 'la', 'las', 'los', 'van', 'der', 'den', 'von', 'y', 'e', 'i'];
            
            if (!palabrasMinusculas.includes(palabra.toLowerCase())) {
                const primeraLetra = palabra.charAt(0);
                if (primeraLetra !== primeraLetra.toUpperCase()) {
                    return false;
                }
            }
        }
    }

    // Si pasó todas las validaciones
    return true;
}
