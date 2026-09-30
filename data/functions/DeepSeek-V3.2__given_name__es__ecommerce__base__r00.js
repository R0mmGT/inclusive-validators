function validate(nombre) {
    // Verificar que el argumento sea un string
    if (typeof nombre !== 'string') {
        return false;
    }

    // Eliminar espacios en blanco al inicio y final
    const nombreTrimmed = nombre.trim();
    
    // Verificar que no esté vacío después del trim
    if (nombreTrimmed.length === 0) {
        return false;
    }

    // Verificar longitud mínima y máxima (por ejemplo, entre 2 y 50 caracteres)
    if (nombreTrimmed.length < 2 || nombreTrimmed.length > 50) {
        return false;
    }

    // Verificar que solo contenga letras, espacios, guiones o apóstrofes (comunes en nombres)
    // Permitir letras con acentos y caracteres especiales de diferentes idiomas
    const nombreRegex = /^[\p{L}\s'-]+$/u;
    if (!nombreRegex.test(nombreTrimmed)) {
        return false;
    }

    // Verificar que no empiece ni termine con espacio, guión o apóstrofe
    if (/^[\s'-]|[\s'-]$/.test(nombreTrimmed)) {
        return false;
    }

    // Verificar que no tenga secuencias inválidas (como dos guiones seguidos)
    if (/--|''|\s\s/.test(nombreTrimmed)) {
        return false;
    }

    // Verificar que tenga al menos una letra (no solo espacios o símbolos)
    const tieneLetras = /\p{L}/u.test(nombreTrimmed);
    if (!tieneLetras) {
        return false;
    }

    // Verificar que no sea una palabra comúnmente prohibida (ejemplo básico)
    const palabrasProhibidas = ['admin', 'administrador', 'root', 'system', 'null', 'undefined', 'test'];
    const nombreLower = nombreTrimmed.toLowerCase();
    if (palabrasProhibidas.includes(nombreLower)) {
        return false;
    }

    // Verificar que tenga la primera letra en mayúscula (opcional pero común en nombres)
    // Esto es opcional dependiendo de los requisitos
    const primeraLetra = nombreTrimmed.charAt(0);
    if (primeraLetra !== primeraLetra.toUpperCase()) {
        // Podría ser demasiado restrictivo, dependiendo del caso de uso
        // Por ahora lo omitiremos para no rechazar nombres en minúscula
    }

    // Si pasa todas las validaciones, es un nombre válido
    return true;
}
