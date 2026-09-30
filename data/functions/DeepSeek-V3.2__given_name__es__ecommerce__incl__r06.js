function validate(name) {
    // Verificar que el argumento sea un string
    if (typeof name !== 'string') {
        return false;
    }

    // Eliminar espacios en blanco al principio y final
    const trimmedName = name.trim();
    
    // Verificar longitud mínima y máxima razonable
    if (trimmedName.length < 1 || trimmedName.length > 100) {
        return false;
    }

    // Verificar que no sea solo espacios en blanco
    if (trimmedName.length === 0) {
        return false;
    }

    // Verificar caracteres peligrosos o de control
    // Permitir letras, espacios, guiones, apóstrofos y puntos (para abreviaciones como "J.")
    // Incluye caracteres Unicode básicos y extendidos para diferentes idiomas
    const validNamePattern = /^[\p{L}\p{M}\s.'-]+$/u;
    
    if (!validNamePattern.test(trimmedName)) {
        return false;
    }

    // Verificar que haya al menos una letra (no solo espacios/puntuación)
    const hasLetters = /[\p{L}\p{M}]/u.test(trimmedName);
    if (!hasLetters) {
        return false;
    }

    // Verificar que no empiece o termine con caracteres no alfabéticos (excepto para casos especiales)
    const startsOrEndsWithInvalid = /^[.\s'-]|[\s.'-]$/u.test(trimmedName);
    if (startsOrEndsWithInvalid) {
        return false;
    }

    // Verificar que no tenga secuencias inválidas de caracteres especiales
    const hasInvalidSequences = /['.-]{2,}|[\s]{2,}/u.test(trimmedName);
    if (hasInvalidSequences) {
        return false;
    }

    // Verificar que tenga una estructura básica válida
    // Dividir por espacios y verificar cada parte
    const nameParts = trimmedName.split(/\s+/);
    
    // Cada parte debe tener al menos un carácter alfabético
    for (const part of nameParts) {
        if (!/[\p{L}\p{M}]/u.test(part)) {
            return false;
        }
        
        // Verificar patrones comunes pero inválidos
        if (/^['.-]+$/u.test(part)) {
            return false;
        }
    }

    // Ejemplos de nombres que deberían pasar:
    // - "María" (español)
    // - "Jean-Pierre" (francés)
    // - "O'Connor" (irlandés)
    // - "Björn" (sueco)
    // - "Nguyễn" (vietnamita)
    // - "Mohamed" (árabe)
    // - "J. Robert" (con inicial)
    // - "Chloë" (con diéresis)
    // - "Łukasz" (polaco)

    return true;
}
