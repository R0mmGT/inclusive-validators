function validate(nombreCompleto) {
    // Verificar que el argumento sea un string
    if (typeof nombreCompleto !== 'string') {
        return false;
    }

    // Eliminar espacios al inicio y al final
    const nombreLimpio = nombreCompleto.trim();
    
    // Verificar que no esté vacío después de trim
    if (nombreLimpio.length === 0) {
        return false;
    }

    // Dividir en palabras
    const palabras = nombreLimpio.split(/\s+/);
    
    // Debe tener al menos dos palabras (nombre y apellido)
    if (palabras.length < 2) {
        return false;
    }

    // Validar cada palabra
    for (let palabra of palabras) {
        // Cada palabra debe contener solo letras y algunos caracteres especiales permitidos
        if (!/^[A-Za-zÁáÉéÍíÓóÚúÑñÜüÀàÈèÌìÒòÙùÇçÂâÊêÎîÔôÛûÄäËëÏïÖöÿØøÅåÆæß'\-]+$/.test(palabra)) {
            return false;
        }
        
        // La palabra no puede consistir solo de guiones o apóstrofes
        if (/^[\-\']+$/.test(palabra)) {
            return false;
        }
        
        // La palabra debe tener al menos dos caracteres (excepto iniciales con punto como "J.")
        if (!/^[A-Za-zÁáÉéÍíÓóÚúÑñÜü]\.?$/.test(palabra) && palabra.replace(/[.\-\']/g, '').length < 2) {
            return false;
        }
        
        // Verificar que no haya caracteres especiales repetidos de forma incorrecta
        if (/(\-\-)|(\'\')|(\.\.)/.test(palabra)) {
            return false;
        }
        
        // Verificar que guiones y apóstrofes no estén al inicio o final de la palabra
        if (/^[\-\']|[\-\']$/.test(palabra.replace(/\.$/, ''))) {
            return false;
        }
    }

    // Verificar que al menos una palabra tenga más de una letra (no solo iniciales)
    const palabrasConLongitud = palabras.filter(p => p.replace(/[.\-\']/g, '').length > 1);
    if (palabrasConLongitud.length === 0) {
        return false;
    }

    // Verificar formato de iniciales (si hay iniciales, deben tener punto)
    for (let palabra of palabras) {
        if (palabra.length === 2 && /^[A-Za-zÁáÉéÍíÓóÚúÑñÜü]\.$/.test(palabra)) {
            // Inicial con punto es válida
            continue;
        } else if (palabra.length === 1) {
            // Una sola letra sin punto no es válida
            return false;
        }
    }

    return true;
}
