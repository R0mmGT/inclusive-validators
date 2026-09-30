function validate(fullName) {
    // Verificar que el argumento sea un string
    if (typeof fullName !== 'string') {
        return false;
    }
    
    // Eliminar espacios en blanco al principio y al final
    const trimmedName = fullName.trim();
    
    // Verificar que no esté vacío después de trim
    if (trimmedName.length === 0) {
        return false;
    }
    
    // Verificar longitud máxima razonable (100 caracteres)
    if (trimmedName.length > 100) {
        return false;
    }
    
    // Dividir el nombre en partes (nombres y apellidos)
    const nameParts = trimmedName.split(/\s+/);
    
    // Debe tener al menos 2 partes (nombre y apellido)
    if (nameParts.length < 2) {
        return false;
    }
    
    // Verificar cada parte del nombre
    for (let part of nameParts) {
        // Cada parte debe tener al menos 2 caracteres
        if (part.length < 2) {
            return false;
        }
        
        // Cada parte debe comenzar con mayúscula y seguir con minúsculas
        // Permitimos nombres compuestos con guión (ej: María-José)
        const validPartPattern = /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+(-[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+)*$/;
        
        if (!validPartPattern.test(part)) {
            return false;
        }
    }
    
    // Verificar que no haya números o caracteres especiales no permitidos
    const invalidCharPattern = /[0-9@#$%^&*()_+=[\]{}|\\:;"'<>,.?/!`~]/;
    if (invalidCharPattern.test(trimmedName)) {
        return false;
    }
    
    return true;
}
