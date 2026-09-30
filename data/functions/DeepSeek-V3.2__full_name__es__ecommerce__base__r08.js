function validate(nombreCompleto) {
    // Verificar que el argumento sea un string
    if (typeof nombreCompleto !== 'string') {
        return false;
    }
    
    // Eliminar espacios en blanco al principio y al final
    const nombreLimpio = nombreCompleto.trim();
    
    // Verificar que no esté vacío después de trim
    if (nombreLimpio.length === 0) {
        return false;
    }
    
    // Verificar longitud mínima y máxima razonable
    if (nombreLimpio.length < 2 || nombreLimpio.length > 100) {
        return false;
    }
    
    // Dividir en palabras
    const palabras = nombreLimpio.split(/\s+/);
    
    // Debe tener al menos nombre y apellido (2 palabras)
    if (palabras.length < 2) {
        return false;
    }
    
    // Verificar cada palabra
    for (let i = 0; i < palabras.length; i++) {
        const palabra = palabras[i];
        
        // Longitud mínima por palabra
        if (palabra.length < 2) {
            return false;
        }
        
        // Verificar que comience con mayúscula
        const primeraLetra = palabra.charAt(0);
        if (!/^[A-ZÁÉÍÓÚÑ]/.test(primeraLetra)) {
            return false;
        }
        
        // Verificar que el resto sean letras, espacios internos o guiones
        // Permitir letras, acentos, guiones simples y apóstrofes
        if (!/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ'\-]*$/.test(palabra)) {
            return false;
        }
        
        // Verificar que no haya guiones o apóstrofes consecutivos o al final
        if (/['\-]$/.test(palabra) || /['\-]{2,}/.test(palabra)) {
            return false;
        }
    }
    
    // Verificar que no haya palabras duplicadas consecutivas (posible error de tipeo)
    for (let i = 0; i < palabras.length - 1; i++) {
        if (palabras[i].toLowerCase() === palabras[i + 1].toLowerCase()) {
            return false;
        }
    }
    
    return true;
}
