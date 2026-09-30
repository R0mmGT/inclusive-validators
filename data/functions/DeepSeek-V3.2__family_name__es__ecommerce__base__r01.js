function validate(apellido) {
    // Validar que el argumento sea un string
    if (typeof apellido !== 'string') {
        return false;
    }

    // Validar longitud mínima y máxima
    if (apellido.length < 2 || apellido.length > 50) {
        return false;
    }

    // Validar que no esté vacío o solo tenga espacios
    if (apellido.trim().length === 0) {
        return false;
    }

    // Patrón: letras (incluyendo acentos y ñ), espacios, guiones y apóstrofes
    // Permitir caracteres internacionales comunes en apellidos
    const patronApellido = /^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÄËÏÖÜäëïöüÑñÇç'\- ]+$/;

    if (!patronApellido.test(apellido)) {
        return false;
    }

    // Validar que no tenga espacios consecutivos
    if (/\s{2,}/.test(apellido)) {
        return false;
    }

    // Validar que no empiece ni termine con espacio, guión o apóstrofe
    if (/^[\s\-']|[\s\-']$/.test(apellido)) {
        return false;
    }

    // Validar que no tenga guiones o apóstrofes consecutivos
    if (/[\-']{2,}/.test(apellido)) {
        return false;
    }

    return true;
}
