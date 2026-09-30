function validate(nombreCompleto) {
    // Verificar que el argumento sea un string
    if (typeof nombreCompleto !== 'string') {
        return false;
    }
    
    // Eliminar espacios al inicio y final
    const nombreTrimmed = nombreCompleto.trim();
    
    // Un nombre completo debe tener al menos un carácter
    if (nombreTrimmed.length === 0) {
        return false;
    }
    
    // Verificar que no contenga solo espacios
    if (nombreTrimmed.replace(/\s/g, '').length === 0) {
        return false;
    }
    
    // Verificar longitud máxima razonable (255 caracteres)
    if (nombreTrimmed.length > 255) {
        return false;
    }
    
    // Dividir en palabras
    const palabras = nombreTrimmed.split(/\s+/);
    
    // Debe tener al menos dos palabras (nombre y apellido)
    if (palabras.length < 2) {
        return false;
    }
    
    // Verificar cada palabra individualmente
    for (let i = 0; i < palabras.length; i++) {
        const palabra = palabras[i];
        
        // Cada palabra debe tener al menos 2 caracteres (excepto iniciales o partículas)
        if (palabra.length < 1) {
            return false;
        }
        
        // Verificar caracteres válidos para nombres en múltiples culturas:
        // - Letras Unicode de cualquier idioma (incluye acentos, diacríticos)
        // - Guiones, apóstrofes, puntos (para iniciales o nombres compuestos)
        // - Números (algunas culturas los usan en nombres, como "María II")
        const regexValidaPalabra = /^[\p{L}\p{M}\p{Nd}'\-\.]+$/u;
        
        if (!regexValidaPalabra.test(palabra)) {
            return false;
        }
        
        // Verificar que no empiece ni termine con caracteres no alfabéticos (excepto partículas)
        const primerCaracter = palabra.charAt(0);
        const ultimoCaracter = palabra.charAt(palabra.length - 1);
        
        // Caracteres que pueden aparecer al inicio (solo letras o números)
        const regexInicioValido = /[\p{L}\p{Nd}]/u;
        if (!regexInicioValido.test(primerCaracter)) {
            return false;
        }
        
        // Caracteres que pueden aparecer al final (solo letras o números)
        if (!regexInicioValido.test(ultimoCaracter)) {
            return false;
        }
        
        // Verificar que no tenga múltiples caracteres especiales consecutivos
        const regexMultiplesEspeciales = /['\-\.]{2,}/;
        if (regexMultiplesEspeciales.test(palabra)) {
            return false;
        }
    }
    
    // Verificaciones adicionales para culturas específicas
    
    // Para nombres japoneses/chinos: pueden tener solo 2-4 caracteres por palabra
    // pero ya está cubierto por la validación de caracteres Unicode
    
    // Para nombres árabes: pueden contener "al-" o "el-" como prefijos
    // Para nombres europeos: pueden contener "de", "van", "von", etc.
    // Estas partículas están permitidas por nuestro regex
    
    // Verificar que no sea un patrón obviamente inválido (ej: solo iniciales)
    const soloIniciales = palabras.every(palabra => palabra.length === 1 && /[A-Za-z]/.test(palabra));
    if (soloIniciales && palabras.length < 3) {
        return false;
    }
    
    return true;
}
