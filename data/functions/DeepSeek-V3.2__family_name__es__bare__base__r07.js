function validate(apellido) {
    // Verificar que el argumento sea un string
    if (typeof apellido !== 'string') return false;
    
    // Verificar que no esté vacío
    if (apellido.trim().length === 0) return false;
    
    // Eliminar espacios en blanco al inicio y final
    const limpio = apellido.trim();
    
    // Verificar longitud mínima (generalmente al menos 2 caracteres para apellidos)
    if (limpio.length < 2) return false;
    
    // Verificar longitud máxima razonable (ej. 50 caracteres)
    if (limpio.length > 50) return false;
    
    // Patrón: letras, espacios, guiones, apóstrofes y acentos comunes
    // Permite apellidos compuestos como "García López", "O'Connor", "Sánchez-Villar"
    const patron = /^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÄËÏÖÜäëïöüÑñÇç\s'-]+$/;
    
    // Verificar que cumpla con el patrón
    if (!patron.test(limpio)) return false;
    
    // Verificar que no comience ni termine con caracteres no alfabéticos
    if (/^[\s'-]/.test(limpio) || /[\s'-]$/.test(limpio)) return false;
    
    // Verificar que no tenga secuencias inválidas (como dos guiones seguidos)
    if (/--|''|\s\s/.test(limpio)) return false;
    
    // Verificar que tenga al menos una letra (no solo espacios/puntuación)
    if (!/[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÄËÏÖÜäëïöüÑñÇç]/.test(limpio)) return false;
    
    return true;
}
