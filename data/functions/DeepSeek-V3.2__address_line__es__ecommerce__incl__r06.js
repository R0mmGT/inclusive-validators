function validate(direccion) {
    // Verificar que la entrada sea un string y no esté vacía
    if (typeof direccion !== 'string' || direccion.trim() === '') {
        return false;
    }
    
    const dir = direccion.trim();
    
    // Verificar longitud mínima y máxima razonable
    if (dir.length < 3 || dir.length > 200) {
        return false;
    }
    
    // Patrones que no deberían aparecer en una dirección postal válida
    const patronesInvalidos = [
        // Patrones de solo números o solo letras repetidas
        /^[0-9\s\-\.\,]+$/,  // Solo números y símbolos
        /^[a-zA-Z\s\-\.\,]+$/, // Solo letras y símbolos
        /^(.)\1+$/, // Todos los caracteres iguales
        
        // Patrones de código malicioso común
        /<script|javascript:|onload=|onerror=|onclick=|eval\(|alert\(/i,
        
        // Patrones de email o URL (no son direcciones postales)
        /@.*\.|\.[a-z]{2,3}$|https?:\/\/|www\./i,
        
        // Patrones de secuencias repetitivas
        /123456|abcdef|aaaaaa|000000/i,
        
        // Patrones de caracteres especiales excesivos
        /[!@#$%^&*()_+=]{3,}/,
        
        // Patrones de espacios múltiples excesivos
        /\s{5,}/,
    ];
    
    for (const patron of patronesInvalidos) {
        if (patron.test(dir)) {
            return false;
        }
    }
    
    // Verificar que tenga al menos un número y algún texto (para direcciones internacionales)
    // Esto es flexible para acomodar diferentes formatos culturales
    const tieneNumero = /\d/.test(dir);
    const tieneTexto = /[a-zA-ZÀ-ÿ\u00f1\u00d1]/.test(dir);
    
    // Algunas direcciones válidas pueden tener solo números (en algunos países)
    // y algunas pueden tener solo texto (nombres de lugares conocidos)
    // Así que no forzamos la combinación de ambos
    
    // Verificar que no tenga caracteres prohibidos (solo caracteres imprimibles permitidos)
    const caracteresPermitidos = /^[\p{L}\p{N}\s\-\.,#'\/\\ºª&()áéíóúÁÉÍÓÚàèìòùÀÈÌÒÙäëïöüÄËÏÖÜñÑçÇßØøÅåÆæ]*$/u;
    if (!caracteresPermitidos.test(dir)) {
        return false;
    }
    
    // Verificar que tenga una estructura básica razonable
    // Al menos dos "palabras" separadas por espacio (considerando números como palabras)
    const palabras = dir.split(/\s+/).filter(p => p.length > 0);
    if (palabras.length < 2) {
        return false;
    }
    
    // Verificar que al menos una palabra tenga longitud mínima
    const palabrasValidas = palabras.filter(p => p.length >= 2);
    if (palabrasValidas.length === 0) {
        return false;
    }
    
    return true;
}
