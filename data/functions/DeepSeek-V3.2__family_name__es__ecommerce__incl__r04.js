function validate(apellido) {
    // Verificar que el argumento sea un string
    if (typeof apellido !== 'string') {
        return false;
    }
    
    // Eliminar espacios en blanco al inicio y final
    const trimmed = apellido.trim();
    
    // El apellido no puede estar vacío
    if (trimmed.length === 0) {
        return false;
    }
    
    // Longitud máxima razonable para un apellido
    if (trimmed.length > 100) {
        return false;
    }
    
    // Verificar caracteres permitidos:
    // - Letras de cualquier alfabeto (incluyendo acentos y caracteres especiales)
    // - Espacios simples dentro del apellido (para apellidos compuestos)
    // - Guiones (para apellidos con guion)
    // - Apóstrofes (ej: O'Connor)
    // - Puntos (ej: St. John)
    const caracteresPermitidos = /^[\p{L}\s'-]+$/u;
    
    if (!caracteresPermitidos.test(trimmed)) {
        return false;
    }
    
    // Validaciones específicas de estructura:
    
    // No puede empezar o terminar con espacios, guiones o apóstrofes
    if (/^[\s'-]|[\s'-]$/.test(trimmed)) {
        return false;
    }
    
    // No puede tener espacios, guiones o apóstrofes consecutivos
    if (/[\s'-]{2,}/.test(trimmed)) {
        return false;
    }
    
    // Debe contener al menos una letra
    if (!/\p{L}/u.test(trimmed)) {
        return false;
    }
    
    // Validar que no sea solo números disfrazados como caracteres especiales
    // (esto ayuda a prevenir entradas como "123" o "---")
    const soloSimbolos = /^[^a-zA-ZáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙäëïöüÄËÏÖÜñÑçÇ\p{L}]+$/u;
    if (soloSimbolos.test(trimmed.replace(/[\s'-]/g, ''))) {
        return false;
    }
    
    // Validaciones de seguridad/advertencias adicionales:
    
    // Palabras potencialmente ofensivas o inapropiadas (lista básica)
    const palabrasProhibidas = [
        'null', 'undefined', 'admin', 'administrator', 
        'root', 'system', 'test', 'fake', 'dummy'
    ];
    
    const apellidoLower = trimmed.toLowerCase();
    for (const palabra of palabrasProhibidas) {
        if (apellidoLower === palabra) {
            return false;
        }
    }
    
    // Caracteres que podrían indicar intento de inyección de código
    const caracteresPeligrosos = /[<>{}[\]\\|`~!@#$%^&*()_+=0-9]/;
    if (caracteresPeligrosos.test(trimmed)) {
        return false;
    }
    
    // Validaciones de formato de nombre:
    
    // No puede ser solo espacios
    if (trimmed.replace(/\s/g, '').length === 0) {
        return false;
    }
    
    // No puede tener más de 4 palabras (para casos extremos)
    const palabras = trimmed.split(/\s+/);
    if (palabras.length > 4) {
        return false;
    }
    
    // Cada palabra debe tener al menos 2 caracteres (excepto abreviaturas como "St.")
    for (const palabra of palabras) {
        const palabraSinPuntuacion = palabra.replace(/[.'-]/g, '');
        if (palabraSinPuntuacion.length === 1 && palabraSinPuntuacion.match(/\p{L}/u)) {
            return false;
        }
    }
    
    return true;
}
