function validate(nombreCompleto) {
    // Verificar que el argumento sea un string y no esté vacío
    if (typeof nombreCompleto !== 'string' || nombreCompleto.trim() === '') {
        return false;
    }
    
    const nombre = nombreCompleto.trim();
    
    // Longitud máxima razonable para un nombre completo
    if (nombre.length > 100) {
        return false;
    }
    
    // Dividir por espacios
    const partes = nombre.split(/\s+/);
    
    // Debe tener al menos nombre y apellido (2 partes)
    if (partes.length < 2) {
        return false;
    }
    
    // Patrón para caracteres válidos: letras, espacios, apóstrofes, guiones y puntos (para iniciales)
    // Incluye caracteres acentuados y la Ñ/ñ
    const patronValido = /^[A-Za-zÁÉÍÓÚáéíóúÑñÀÈÌÒÙàèìòùÄËÏÖÜäëïöüÇç'\-\.\s]+$/;
    
    if (!patronValido.test(nombre)) {
        return false;
    }
    
    // Validar cada parte individualmente
    for (let parte of partes) {
        // Cada parte debe tener al menos 2 caracteres (excepto iniciales con punto como "J.")
        if (parte.length < 2 && !/^[A-Za-zÁÉÍÓÚáéíóúÑñ]\.$/.test(parte)) {
            return false;
        }
        
        // No puede empezar ni terminar con guión, apóstrofe o punto (excepto iniciales)
        if (/^[-'.]|[-'.]$/.test(parte) && !/^[A-Za-zÁÉÍÓÚáéíóúÑñ]\.$/.test(parte)) {
            return false;
        }
        
        // No puede tener dos caracteres especiales consecutivos
        if (/[-'.]{2,}/.test(parte)) {
            return false;
        }
        
        // Debe contener al menos una letra
        if (!/[A-Za-zÁÉÍÓÚáéíóúÑñ]/.test(parte)) {
            return false;
        }
    }
    
    // Verificar que no haya demasiados espacios consecutivos (ya normalizados con split/join)
    // Verificar formato general: debe empezar y terminar con letra
    const nombreLimpio = nombre.replace(/\s+/g, ' ');
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ]/.test(nombreLimpio) || 
        !/[A-Za-zÁÉÍÓÚáéíóúÑñ]$/.test(nombreLimpio)) {
        return false;
    }
    
    return true;
}
