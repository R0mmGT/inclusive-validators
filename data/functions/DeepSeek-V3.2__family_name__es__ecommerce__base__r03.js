function validate(apellido) {
    // Verificar que el argumento sea un string
    if (typeof apellido !== 'string') {
        return false;
    }
    
    // Eliminar espacios al principio y al final
    const apellidoTrimmed = apellido.trim();
    
    // Verificar longitud mínima y máxima (1-50 caracteres)
    if (apellidoTrimmed.length < 1 || apellidoTrimmed.length > 50) {
        return false;
    }
    
    // Verificar que no contenga solo espacios
    if (apellidoTrimmed === '') {
        return false;
    }
    
    // Patrón para apellidos válidos:
    // - Puede contener letras (incluyendo acentos y ñ/Ñ)
    // - Puede contener guiones (para apellidos compuestos)
    // - Puede contener espacios simples internos (para apellidos con partículas)
    // - Puede contener apóstrofes (como en O'Connor)
    const apellidoPattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñÀÈÌÒÙàèìòùÄËÏÖÜäëïöüÇç\s'-]+$/;
    
    if (!apellidoPattern.test(apellidoTrimmed)) {
        return false;
    }
    
    // Verificar que no comience ni termine con caracteres no alfabéticos
    const firstChar = apellidoTrimmed.charAt(0);
    const lastChar = apellidoTrimmed.charAt(apellidoTrimmed.length - 1);
    const letterPattern = /[A-Za-zÁÉÍÓÚáéíóúÑñÀÈÌÒÙàèìòùÄËÏÖÜäëïöüÇç]/;
    
    if (!letterPattern.test(firstChar) || !letterPattern.test(lastChar)) {
        return false;
    }
    
    // Verificar que no tenga espacios múltiples consecutivos
    if (/\s\s+/.test(apellidoTrimmed)) {
        return false;
    }
    
    // Verificar que no tenga guiones o apóstrofes múltiples consecutivos
    if (/['-]{2,}/.test(apellidoTrimmed)) {
        return false;
    }
    
    // Verificar que los guiones, apóstrofes o espacios estén seguidos de letras
    // (esto evita "Mc -Donald" o "O' 'Connor")
    const invalidSequencePattern = /['-\s](?![A-Za-zÁÉÍÓÚáéíóúÑñÀÈÌÒÙàèìòùÄËÏÖÜäëïöüÇç])/;
    if (invalidSequencePattern.test(apellidoTrimmed)) {
        return false;
    }
    
    // Verificar que no contenga combinaciones prohibidas
    // (como guión seguido de espacio o viceversa)
    if (/['-\s]\s/.test(apellidoTrimmed) || /\s['-\s]/.test(apellidoTrimmed)) {
        return false;
    }
    
    // Todas las validaciones pasaron
    return true;
}
