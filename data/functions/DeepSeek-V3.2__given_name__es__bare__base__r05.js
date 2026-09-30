function validate(nombre) {
    // Validar que el argumento sea un string
    if (typeof nombre !== 'string') {
        return false;
    }
    
    // Eliminar espacios en blanco al inicio y final
    const nombreLimpio = nombre.trim();
    
    // Validaciones básicas
    // 1. No puede estar vacío
    if (nombreLimpio.length === 0) {
        return false;
    }
    
    // 2. Longitud mínima y máxima razonable para nombres
    if (nombreLimpio.length < 2 || nombreLimpio.length > 50) {
        return false;
    }
    
    // 3. Solo puede contener letras, espacios, guiones y apóstrofes (para nombres compuestos)
    //    como "María José", "Jean-Pierre", "O'Connor"
    const patronValido = /^[A-Za-zÀ-ÿ\u00C0-\u017F\s'-]+$/;
    if (!patronValido.test(nombreLimpio)) {
        return false;
    }
    
    // 4. No puede comenzar ni terminar con espacio, guión o apóstrofe
    if (/^[\s'-]/.test(nombreLimpio) || /[\s'-]$/.test(nombreLimpio)) {
        return false;
    }
    
    // 5. No puede tener dos caracteres especiales seguidos (como "--", "''", etc.)
    if (/['-]{2,}/.test(nombreLimpio) || /\s{2,}/.test(nombreLimpio)) {
        return false;
    }
    
    // 6. El nombre debe empezar con mayúscula
    const primeraLetra = nombreLimpio.charAt(0);
    if (primeraLetra !== primeraLetra.toUpperCase() || primeraLetra.toUpperCase() === primeraLetra.toLowerCase()) {
        return false;
    }
    
    // 7. Después de un espacio, guión o apóstrofe debe haber una letra (no otro carácter especial)
    if (/\s['-]|['-]\s|--|''/.test(nombreLimpio)) {
        return false;
    }
    
    // 8. Validar que al menos contenga una letra (no solo espacios, guiones, etc.)
    const letras = nombreLimpio.replace(/[^A-Za-zÀ-ÿ\u00C0-\u017F]/g, '');
    if (letras.length === 0) {
        return false;
    }
    
    // 9. Validar que después de un espacio, guión o apóstrofe la primera letra sea mayúscula
    const partes = nombreLimpio.split(/[\s'-]+/);
    for (let parte of partes) {
        if (parte.length > 0) {
            const primeraLetraParte = parte.charAt(0);
            if (primeraLetraParte !== primeraLetraParte.toUpperCase() || 
                primeraLetraParte.toUpperCase() === primeraLetraParte.toLowerCase()) {
                return false;
            }
        }
    }
    
    return true;
}
