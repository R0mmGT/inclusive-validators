function validate(apellido) {
    // Verificar que el argumento sea un string
    if (typeof apellido !== 'string') {
        return false;
    }

    // Eliminar espacios al inicio y final
    apellido = apellido.trim();
    
    // Verificar que no esté vacío después de trim
    if (apellido.length === 0) {
        return false;
    }

    // Longitud máxima razonable para un apellido (considerando apellidos compuestos)
    if (apellido.length > 100) {
        return false;
    }

    // Patrón básico que permite:
    // - Letras de cualquier alfabeto (incluye acentos, diacríticos, letras internacionales)
    // - Espacios (para apellidos compuestos como "De la Torre")
    // - Guiones (para apellidos como "Smith-Jones")
    // - Apóstrofos (para apellidos como "O'Reilly")
    // - Puntos (para abreviaciones, aunque menos común)
    const patronBasico = /^[\p{L}\p{M}\s'.-]+$/u;
    
    if (!patronBasico.test(apellido)) {
        return false;
    }

    // Verificar que no comience o termine con caracteres no alfabéticos
    // (excepto apóstrofos/guiones que pueden ser parte válida como "O'Reilly")
    const primerChar = apellido.charAt(0);
    const ultimoChar = apellido.charAt(apellido.length - 1);
    
    // No debe comenzar o terminar con espacio, guion, punto o coma
    if (/[\s.,-]/.test(primerChar) || /[\s.,-]/.test(ultimoChar)) {
        return false;
    }

    // Verificar que no haya secuencias inválidas
    // No más de un guion, apóstrofo o punto consecutivo
    if (/['.-]{2,}/.test(apellido)) {
        return false;
    }

    // No debe contener solo espacios, guiones o puntos
    if (/^[\s.-]+$/.test(apellido)) {
        return false;
    }

    // Debe contener al menos una letra
    if (!/\p{L}/u.test(apellido)) {
        return false;
    }

    // Validaciones específicas para patrones extraños
    // No permitir solo números
    if (/^\d+$/.test(apellido)) {
        return false;
    }

    // No permitir caracteres de control
    if (/[\x00-\x1F\x7F]/.test(apellido)) {
        return false;
    }

    // Verificar que tenga una estructura básicamente válida
    // Al menos dos caracteres (para casos como "Li", "Ng", etc.)
    if (apellido.replace(/[^a-zA-ZáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙäëïöüÄËÏÖÜñÑçÇßØøÅåÆæÞþÐð]/, '').length < 2) {
        // Esta verificación es más estricta con letras básicas + comunes internacionales
        // pero no elimina todas las letras Unicode para no ser demasiado restrictiva
        return false;
    }

    return true;
}
