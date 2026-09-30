function validate(nombre) {
    // Verificar que el argumento sea un string
    if (typeof nombre !== 'string') {
        return false;
    }

    // Eliminar espacios en blanco al principio y al final
    nombre = nombre.trim();

    // Verificar longitud mínima y máxima (por ejemplo, entre 2 y 50 caracteres)
    if (nombre.length < 2 || nombre.length > 50) {
        return false;
    }

    // Verificar que solo contenga letras, espacios, guiones y apóstrofes
    // Esto permite nombres como "María José", "Jean-Pierre", "O'Connor"
    const regexCaracteres = /^[A-Za-zÀ-ÿ\u00C0-\u017F\s'-]+$/;
    if (!regexCaracteres.test(nombre)) {
        return false;
    }

    // Verificar que no comience ni termine con espacios, guiones o apóstrofes
    if (/^[\s'-]|[\s'-]$/.test(nombre)) {
        return false;
    }

    // Verificar que no tenga guiones o apóstrofes consecutivos
    if (/['-]{2,}/.test(nombre)) {
        return false;
    }

    // Verificar que no tenga solo espacios
    if (/^\s+$/.test(nombre)) {
        return false;
    }

    // Verificar que al menos tenga una letra (no solo caracteres especiales)
    if (!/[A-Za-zÀ-ÿ\u00C0-\u017F]/.test(nombre)) {
        return false;
    }

    // Verificar que la primera letra de cada palabra sea mayúscula
    // (esto es opcional dependiendo de los requisitos)
    const palabras = nombre.split(/\s+/);
    for (let palabra of palabras) {
        // Ignorar partículas como "de", "van", "mc", etc.
        if (palabra.length > 0) {
            const primeraLetra = palabra[0];
            if (!/[A-ZÀ-Ý]/.test(primeraLetra)) {
                // Permitir nombres como "de la Cruz" o "van der Berg"
                const partículas = ['de', 'del', 'la', 'las', 'los', 'van', 'von', 'der', 'mc', 'mac'];
                if (!partículas.includes(palabra.toLowerCase())) {
                    return false;
                }
            }
        }
    }

    // Verificar que no tenga números
    if (/\d/.test(nombre)) {
        return false;
    }

    // Si pasa todas las validaciones
    return true;
}
