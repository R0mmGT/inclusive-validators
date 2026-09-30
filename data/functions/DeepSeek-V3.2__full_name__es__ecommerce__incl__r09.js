function validate(nombre) {
    // Verificar que el argumento sea un string
    if (typeof nombre !== 'string') {
        return false;
    }

    // Eliminar espacios en blanco al inicio y final
    const trimmed = nombre.trim();
    
    // Verificar que no esté vacío después de trim
    if (trimmed.length === 0) {
        return false;
    }

    // Verificar longitud máxima razonable (255 caracteres)
    if (trimmed.length > 255) {
        return false;
    }

    // Verificar que contenga al menos un espacio (para nombre y apellido)
    // Nota: Esto no aplica a todas las culturas, pero es común
    if (!trimmed.includes(' ')) {
        return false;
    }

    // Verificar que no contenga caracteres inválidos
    // Permitir letras, espacios, guiones, apóstrofes, puntos y letras con diacríticos
    const invalidChars = /[0-9_@#$%^&*()+=<>?/\|{}[\]:;"~`]/;
    if (invalidChars.test(trimmed)) {
        return false;
    }

    // Verificar que no tenga múltiples espacios consecutivos
    if (/\s{2,}/.test(trimmed)) {
        return false;
    }

    // Verificar que no comience o termine con caracteres no alfabéticos
    if (/^[-\s.'"]|[-\s.'"]$/.test(trimmed)) {
        return false;
    }

    // Verificar que tenga al menos dos partes con longitud mínima
    const partes = trimmed.split(/\s+/).filter(part => part.length > 0);
    if (partes.length < 2) {
        return false;
    }

    // Verificar que cada parte tenga al menos 2 caracteres
    for (const parte of partes) {
        // Contar solo letras (incluyendo diacríticos) para la longitud mínima
        const letras = parte.replace(/[^a-zA-ZáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙäëïöüÄËÏÖÜâêîôûÂÊÎÔÛãñõÃÑÕçÇøØåÅæÆœŒß]/g, '');
        if (letras.length < 2) {
            return false;
        }
    }

    // Verificar formato: primera letra de cada parte debe ser mayúscula
    // (esto es culturalmente específico, pero común)
    for (const parte of partes) {
        const primeraLetra = parte.charAt(0);
        if (!/[A-ZÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÂÊÎÔÛÃÑÕÇØÅÆŒ]/.test(primeraLetra)) {
            return false;
        }
    }

    return true;
}
