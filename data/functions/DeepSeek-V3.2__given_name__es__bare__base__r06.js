function validate(nombre) {
    // Validar que sea string y no esté vacío
    if (typeof nombre !== 'string' || nombre.trim() === '') {
        return false;
    }
    
    // Eliminar espacios al inicio y final
    const nombreLimpio = nombre.trim();
    
    // Validar longitud mínima (al menos 2 caracteres)
    if (nombreLimpio.length < 2) {
        return false;
    }
    
    // Validar que solo contenga letras, espacios, guiones, apóstrofos y puntos (permitiendo nombres compuestos)
    // No debe contener números ni caracteres especiales no permitidos
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s\-'.]+$/.test(nombreLimpio)) {
        return false;
    }
    
    // Validar que no comience ni termine con caracteres no alfabéticos (excepto apóstrofe inicial en algunos casos como 'Abdul)
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü']/.test(nombreLimpio)) {
        return false;
    }
    
    // Validar que no termine con espacio, guion, punto o apóstrofe
    if (/[\s\-\'.]$/.test(nombreLimpio)) {
        return false;
    }
    
    // Validar que no tenga secuencias inválidas como dos guiones seguidos, dos puntos seguidos, etc.
    if (/\-\-|\.\.|\'\'/.test(nombreLimpio)) {
        return false;
    }
    
    // Validar que después de un guion, espacio, punto o apóstrofe haya una letra
    if (/[\-\s\.'](?![A-Za-zÁÉÍÓÚáéíóúÑñÜü])/.test(nombreLimpio)) {
        return false;
    }
    
    // Validar formato básico: debe empezar con mayúscula (excepto algunos nombres con apóstrofe inicial)
    const primeraLetra = nombreLimpio.match(/[A-Za-zÁÉÍÓÚáéíóúÑñÜü]/)[0];
    if (primeraLetra !== primeraLetra.toUpperCase()) {
        return false;
    }
    
    // Validar que no tenga solo mayúsculas o solo minúsculas en todo el nombre
    // (debe tener alguna variación, aunque los nombres compuestos pueden tener mayúsculas internas)
    const sinCaracteresEspeciales = nombreLimpio.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñÜü]/g, '');
    if (sinCaracteresEspeciales === sinCaracteresEspeciales.toUpperCase() || 
        sinCaracteresEspeciales === sinCaracteresEspeciales.toLowerCase()) {
        // Permitir nombres muy cortos (2-3 letras) en mayúsculas/minúsculas
        if (sinCaracteresEspeciales.length > 3) {
            return false;
        }
    }
    
    return true;
}
