function validate(apellido) {
    // Verificar que el argumento sea un string
    if (typeof apellido !== 'string') {
        return false;
    }
    
    // Eliminar espacios en blanco al inicio y final
    const trimmed = apellido.trim();
    
    // Un apellido no puede estar vacío después de trim
    if (trimmed.length === 0) {
        return false;
    }
    
    // Longitud mínima y máxima razonable (ajustable según necesidades)
    if (trimmed.length < 1 || trimmed.length > 100) {
        return false;
    }
    
    // Patrón base: permite letras de cualquier idioma, espacios, guiones, apóstrofes
    // Incluye letras con diacríticos, letras de alfabetos no latinos, y algunos caracteres especiales comunes
    const basePattern = /^[\p{L}\s\-'.]+$/u;
    
    // Verificar que no tenga caracteres inválidos
    if (!basePattern.test(trimmed)) {
        return false;
    }
    
    // Validaciones adicionales de sentido común
    
    // No puede comenzar o terminar con ciertos caracteres especiales
    if (/^[\s\-'.]|[\s\-'.]$/.test(trimmed)) {
        return false;
    }
    
    // No puede tener secuencias inválidas de caracteres especiales
    if (/[\s\-'.]{2,}/.test(trimmed)) {
        return false;
    }
    
    // No puede contener solo espacios, guiones o apóstrofes
    if (!/\p{L}/u.test(trimmed)) {
        return false;
    }
    
    // No puede contener números
    if (/\d/.test(trimmed)) {
        return false;
    }
    
    // No puede contener caracteres especiales adicionales
    const invalidPattern = /[!@#$%^&*()_+=[\]{}|\\:;"<>,?/~`]/;
    if (invalidPattern.test(trimmed)) {
        return false;
    }
    
    // Validación específica para ciertos casos especiales
    
    // Apellidos compuestos comunes en español, francés, etc.
    // Ejemplos válidos: "De la Cruz", "Van der Berg", "O'Connor", "D'Angelo"
    
    // Caracteres específicos permitidos en apellidos de diferentes culturas:
    // - \p{L}: cualquier letra de cualquier idioma (incluye acentos, caracteres cirílicos, griegos, árabes, etc.)
    // - \s: espacios (para apellidos compuestos)
    // - -: guiones (para apellidos con guión)
    // - ': apóstrofe (apellidos como O'Connor)
    // - .: punto (para abreviaciones, aunque menos común en apellidos)
    
    return true;
}
