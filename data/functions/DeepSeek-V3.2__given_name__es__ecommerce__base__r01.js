function validate(nombre) {
    // Validación básica de tipo y longitud
    if (typeof nombre !== 'string' || nombre.trim().length === 0) {
        return false;
    }
    
    // Eliminar espacios en blanco al inicio y final
    const nombreTrimmed = nombre.trim();
    
    // Validar longitud (generalmente entre 2 y 50 caracteres)
    if (nombreTrimmed.length < 2 || nombreTrimmed.length > 50) {
        return false;
    }
    
    // Validar que contenga solo letras (incluyendo acentos y caracteres especiales comunes)
    // Permite letras del alfabeto latino básico, acentos, diéresis, ç, ñ y guiones/apóstrofos para nombres compuestos
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿÇçÑñ]+([ '-][A-Za-zÀ-ÖØ-öø-ÿÇçÑñ]+)*$/;
    
    if (!regex.test(nombreTrimmed)) {
        return false;
    }
    
    // Validar que no empiece ni termine con guión o apóstrofo
    if (nombreTrimmed.startsWith('-') || nombreTrimmed.endsWith('-') ||
        nombreTrimmed.startsWith("'") || nombreTrimmed.endsWith("'") ||
        nombreTrimmed.startsWith(' ') || nombreTrimmed.endsWith(' ')) {
        return false;
    }
    
    // Validar que no tenga guiones o apóstrofos consecutivos
    if (nombreTrimmed.includes("--") || nombreTrimmed.includes("''") || 
        nombreTrimmed.includes("-'") || nombreTrimmed.includes("'-")) {
        return false;
    }
    
    // Validar que tenga al menos una letra mayúscula al inicio de cada parte del nombre
    const partes = nombreTrimmed.split(/[ -]/);
    for (const parte of partes) {
        // Verificar que cada parte empiece con mayúscula
        const primeraLetra = parte.charAt(0);
        if (!primeraLetra.match(/[A-ZÀ-ÖÇÑ]/)) {
            return false;
        }
        
        // Verificar que el resto de letras sean minúsculas (permite excepciones como "McDonald")
        const resto = parte.slice(1);
        if (resto.match(/[A-Z]/) && !resto.match(/^[a-zà-öø-ÿçñ]*[A-Z][a-zà-öø-ÿçñ]*$/)) {
            return false;
        }
    }
    
    return true;
}
