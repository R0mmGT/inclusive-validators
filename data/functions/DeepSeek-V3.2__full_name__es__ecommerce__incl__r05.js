function validate(nombreCompleto) {
    // Verificar que el argumento sea string
    if (typeof nombreCompleto !== 'string') return false;
    
    // Eliminar espacios al principio y final
    const nombreLimpio = nombreCompleto.trim();
    
    // Un nombre no puede estar vacío después de trim
    if (nombreLimpio.length === 0) return false;
    
    // Longitud máxima razonable (255 caracteres)
    if (nombreLimpio.length > 255) return false;
    
    // Debe contener al menos un espacio (nombre y apellido)
    // Pero aceptamos culturas donde puede haber un solo nombre (como Indonesia)
    // Solo verificamos que tenga al menos un caracter válido
    if (!/[a-zA-ZÀ-ÖØ-öø-ÿ]/.test(nombreLimpio)) return false;
    
    // Verificar que no contenga caracteres inválidos
    // Permitimos: letras, espacios, guiones, apóstrofes, puntos (para abreviaciones)
    // y caracteres diacríticos de múltiples idiomas
    const caracteresInvalidos = /[0-9_=+*&^%$#@!~`{}[\]\\|"<>?;:]/;
    if (caracteresInvalidos.test(nombreLimpio)) return false;
    
    // No permitir espacios múltiples consecutivos
    if (/\s{2,}/.test(nombreLimpio)) return false;
    
    // Verificar estructura básica
    const partes = nombreLimpio.split(/\s+/);
    
    // Debe tener al menos una parte
    if (partes.length < 1) return false;
    
    // Cada parte debe tener al menos un caracter
    for (const parte of partes) {
        if (parte.length === 0) return false;
        
        // Cada parte debe comenzar con una letra (no guión, apóstrofe o punto)
        if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ]/.test(parte)) return false;
        
        // No permitir guiones, apóstrofes o puntos consecutivos
        if (/[-.'][-.]/.test(parte)) return false;
        
        // No permitir guiones, apóstrofes o puntos al final
        if (/[-.']$/.test(parte)) return false;
    }
    
    // Casos especiales culturales
    // Permitir patrones comunes como "María José", "Jean-Pierre", "O'Connor", "St. John"
    // Estos ya están cubiertos por las reglas anteriores
    
    // Validación adicional: al menos una parte debe tener 2 o más caracteres
    // (para evitar "J" como nombre completo)
    const tieneParteSuficiente = partes.some(parte => {
        // Contamos solo letras, ignorando guiones, apóstrofes y puntos
        const soloLetras = parte.replace(/[-.']/g, '');
        return soloLetras.length >= 2;
    });
    
    if (!tieneParteSuficiente) return false;
    
    return true;
}
