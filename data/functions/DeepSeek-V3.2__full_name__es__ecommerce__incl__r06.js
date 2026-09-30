function validate(nombre) {
    // Validar que el argumento sea un string
    if (typeof nombre !== 'string') return false;
    
    // Eliminar espacios al inicio y final
    const nombreTrimmed = nombre.trim();
    
    // Validar longitud mínima y máxima razonable (2-100 caracteres)
    if (nombreTrimmed.length < 2 || nombreTrimmed.length > 100) return false;
    
    // Validar que no contenga solo números o símbolos
    if (!/[a-zA-ZÀ-ÖØ-öø-ÿ]/.test(nombreTrimmed)) return false;
    
    // Validar que no contenga caracteres no permitidos
    // Permitir letras, espacios, guiones, apóstrofos, puntos y caracteres especiales de varias culturas
    const caracteresInvalidos = /[0-9@#$%^&*()_+=[\]{}|\\:;"<>?/~`]/;
    if (caracteresInvalidos.test(nombreTrimmed)) return false;
    
    // Validar estructura básica del nombre
    // Debe contener al menos un espacio (nombre y apellido) o un guion/apóstrofo para nombres compuestos
    const tieneEspacio = /\s/.test(nombreTrimmed);
    const tieneGuion = /-/.test(nombreTrimmed);
    const tieneApostrofo = /'/.test(nombreTrimmed);
    const tienePunto = /\./.test(nombreTrimmed);
    
    if (!tieneEspacio && !tieneGuion && !tieneApostrofo && !tienePunto) {
        // Podría ser un nombre monónimo válido (como algunos nombres de una sola palabra)
        // Pero debemos asegurarnos de que tenga al menos 2 letras
        return /^[a-zA-ZÀ-ÖØ-öø-ÿ]{2,}$/.test(nombreTrimmed);
    }
    
    // Validar que no haya múltiples espacios consecutivos
    if (/\s{2,}/.test(nombreTrimmed)) return false;
    
    // Validar que cada parte del nombre tenga al menos 2 caracteres
    const partes = nombreTrimmed.split(/[\s\-'\.]+/);
    
    for (let parte of partes) {
        if (parte.length < 1) return false; // No permitir partes vacías
        
        // Validar que cada parte empiece con mayúscula (para la mayoría de culturas)
        // Esto es flexible para incluir nombres que empiezan con minúscula en algunas culturas
        // Pero al menos debe contener letras
        if (!/[a-zA-ZÀ-ÖØ-öø-ÿ]/.test(parte)) return false;
        
        // Validar que no haya partes con solo un carácter (excepto iniciales con punto)
        if (parte.length === 1 && !parte.includes('.')) return false;
    }
    
    // Validaciones específicas para iniciales con punto (como "J. R. R. Tolkien")
    if (tienePunto) {
        // Si hay punto, validar que sea una inicial válida
        const iniciales = nombreTrimmed.match(/\b[A-ZÀ-ÖØ-Þ]\./g);
        if (iniciales) {
            for (let inicial of iniciales) {
                // Validar que la inicial tenga exactamente 2 caracteres (letra + punto)
                if (inicial.length !== 2) return false;
            }
        }
    }
    
    // Validar que no haya guiones/apóstrofos al inicio o final del nombre completo
    if (nombreTrimmed.startsWith('-') || nombreTrimmed.endsWith('-') ||
        nombreTrimmed.startsWith("'") || nombreTrimmed.endsWith("'") ||
        nombreTrimmed.startsWith('.') || nombreTrimmed.endsWith('.')) {
        return false;
    }
    
    // Validar que no haya guiones/apóstrofos consecutivos
    if (/--|''|''|\.\./.test(nombreTrimmed)) return false;
    
    // Validar combinaciones específicas de caracteres
    // Por ejemplo, no permitir " -" o "- " (guión con espacio en un solo lado)
    if (/\s-\s/.test(nombreTrimmed)) {
        // Esto es válido para nombres como "María - José"
    } else if (/\s-|-\s/.test(nombreTrimmed)) {
        // Podría ser sospechoso, pero lo dejamos pasar para flexibilidad
    }
    
    // Casos extremos específicos
    // No permitir solo iniciales (como "A. B.")
    if (/^([A-ZÀ-ÖØ-Þ]\.\s*)+$/.test(nombreTrimmed)) {
        return partes.some(parte => parte.length > 2);
    }
    
    return true;
}
