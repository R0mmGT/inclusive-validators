function validate(nombreCompleto) {
    // Validación básica: debe ser string no vacío sin solo espacios
    if (typeof nombreCompleto !== 'string' || nombreCompleto.trim().length === 0) {
        return false;
    }
    
    const nombre = nombreCompleto.trim();
    
    // No debe contener dígitos
    if (/\d/.test(nombre)) {
        return false;
    }
    
    // No debe contener caracteres especiales típicamente no usados en nombres
    // Permitimos letras, espacios, guiones, apóstrofes, puntos y diacríticos
    // Pero excluímos símbolos matemáticos, comerciales, etc.
    if (/[\[\]{}()@#$%^&*_+=|<>\\\/~`]/.test(nombre)) {
        return false;
    }
    
    // Validar longitud mínima y máxima razonable (2 a 100 caracteres)
    if (nombre.length < 2 || nombre.length > 100) {
        return false;
    }
    
    // Debe tener al menos un espacio (nombre y apellido)
    // pero permitimos excepciones culturales como nombres monónimos
    // Validamos que al menos tenga 2 caracteres alfabéticos consecutivos
    if (!/(?:\p{L}\s+\p{L}|\p{L}{2,})/u.test(nombre)) {
        return false;
    }
    
    // Validación de estructura básica:
    // - No puede empezar ni terminar con espacios, guiones o apóstrofes
    // - No puede tener secuencias inválidas de caracteres
    if (/^[\s\-'.]|[\s\-'.]$/.test(nombre) || 
        /[\s\-'.]{2,}/.test(nombre) || 
        /['\-.]\s|\s['\-.]/.test(nombre)) {
        return false;
    }
    
    // No debe ser solo espacios repetidos
    if (!/\p{L}/u.test(nombre)) {
        return false;
    }
    
    return true;
}
