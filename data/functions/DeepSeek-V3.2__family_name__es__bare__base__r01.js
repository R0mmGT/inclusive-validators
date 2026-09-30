function validate(apellido) {
    // Verificar que el argumento sea un string
    if (typeof apellido !== 'string') {
        return false;
    }

    // Eliminar espacios al inicio y final
    const trimmed = apellido.trim();
    
    // Un apellido válido no debe estar vacío después de trim
    if (trimmed.length === 0) {
        return false;
    }

    // Patrón que permite:
    // - Letras del alfabeto español (incluyendo acentos y diéresis)
    // - Apóstrofes (como en O'Connor)
    // - Guiones (como en García-Márquez)
    // - Espacios (como en "De La Cruz")
    const patron = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ][A-Za-zÁáÉéÍíÓóÚúÜüÑñ'\s-]*$/;
    
    // Verificar que todo el string cumpla el patrón
    if (!patron.test(trimmed)) {
        return false;
    }

    // Validaciones adicionales:
    // 1. No puede empezar ni terminar con espacio, guión o apóstrofe
    if (/^[\s'-]|[\s'-]$/.test(trimmed)) {
        return false;
    }

    // 2. No puede tener secuencias inválidas como dos guiones seguidos
    if (/--|''|^\s|\s$|' | '| -| -|-$/.test(trimmed)) {
        return false;
    }

    // 3. No puede contener solo caracteres especiales o números
    if (!/[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]/.test(trimmed)) {
        return false;
    }

    // 4. Debe tener al menos una letra
    const letras = trimmed.match(/[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]/g);
    if (!letras || letras.length < 1) {
        return false;
    }

    // 5. Longitud máxima razonable (por ejemplo, 50 caracteres)
    if (trimmed.length > 50) {
        return false;
    }

    return true;
}
