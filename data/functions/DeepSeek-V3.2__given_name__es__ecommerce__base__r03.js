function validate(nombre) {
    // Verificar que el argumento sea un string
    if (typeof nombre !== 'string') {
        return false;
    }
    
    // Eliminar espacios al principio y final
    const nombreLimpio = nombre.trim();
    
    // Verificar longitud mínima y máxima (1-50 caracteres)
    if (nombreLimpio.length < 1 || nombreLimpio.length > 50) {
        return false;
    }
    
    // Verificar que solo contenga letras, espacios, guiones o apóstrofes (comunes en nombres)
    // y que no tenga caracteres especiales no permitidos
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s\-']+$/;
    if (!regexNombre.test(nombreLimpio)) {
        return false;
    }
    
    // Verificar que no empiece ni termine con espacios, guiones o apóstrofes
    if (/^[\s\-']|[\s\-']$/.test(nombreLimpio)) {
        return false;
    }
    
    // Verificar que no tenga guiones o apóstrofes consecutivos
    if (/[\-']{2,}/.test(nombreLimpio)) {
        return false;
    }
    
    // Verificar que tenga al menos una letra (no solo espacios/símbolos)
    if (!/[A-Za-zÁÉÍÓÚáéíóúÑñÜü]/.test(nombreLimpio)) {
        return false;
    }
    
    // Verificar que la primera letra de cada palabra sea mayúscula
    // (esto es opcional según el caso de uso, aquí lo hago flexible)
    const palabras = nombreLimpio.split(/\s+/);
    
    // Verificar que cada palabra tenga al menos una letra
    for (const palabra of palabras) {
        if (palabra.length > 0 && !/[A-Za-zÁÉÍÓÚáéíóúÑñÜü]/.test(palabra)) {
            return false;
        }
    }
    
    // Verificar que no sea un patrón repetitivo (ej: "aaaa", "a a a")
    const caracteresUnicos = new Set(nombreLimpio.toLowerCase().replace(/[^a-záéíóúñü]/g, ''));
    if (caracteresUnicos.size === 1 && nombreLimpio.length > 2) {
        return false;
    }
    
    return true;
}
