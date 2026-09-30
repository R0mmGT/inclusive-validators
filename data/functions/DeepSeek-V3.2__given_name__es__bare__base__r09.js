function validate(nombre) {
    // Validar que el argumento sea un string
    if (typeof nombre !== 'string') return false;
    
    // Validar longitud mínima y máxima típica de nombres
    if (nombre.length < 2 || nombre.length > 50) return false;
    
    // Validar que solo contenga letras, espacios, guiones o apóstrofes comunes en nombres
    // Permitimos caracteres acentuados y letras internacionales
    const nombrePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\u00C0-\u017F\s\-'.]+$/;
    if (!nombrePattern.test(nombre)) return false;
    
    // Validar que no comience ni termine con espacios, guiones o apóstrofes
    if (/^[\s\-'.]|[\s\-'.]$/.test(nombre)) return false;
    
    // Validar que no tenga secuencias inválidas de caracteres especiales
    if (/[\-'.]{2,}/.test(nombre)) return false; // No dos o más especiales consecutivos
    
    // Validar que tenga al menos una letra (no solo caracteres especiales)
    if (!/[A-Za-zÀ-ÖØ-öø-ÿ\u00C0-\u017F]/.test(nombre)) return false;
    
    // Validar que la primera letra de cada parte (si hay múltiples palabras) sea mayúscula
    // Esto es opcional dependiendo de los requisitos, pero común en nombres
    const partes = nombre.split(/[\s\-']/).filter(part => part.length > 0);
    
    // Verificar que cada parte comience con letra mayúscula
    // Permitimos nombres con iniciales como "J.R.R. Tolkien" o "Mary-Ann"
    for (let parte of partes) {
        // Para partes que son iniciales (una letra seguida opcionalmente de punto)
        if (parte.match(/^[A-ZÀ-ÖØ-ß]\.?$/)) {
            // Inicial válida - continuar
            continue;
        }
        
        // Para partes más largas, verificar que comiencen con mayúscula
        if (parte.length > 1) {
            const primeraLetra = parte.charAt(0);
            if (!primeraLetra.match(/[A-ZÀ-ÖØ-ß]/)) {
                // Podría ser un nombre como "de la Cruz" - no siempre mayúscula
                // Para ser estrictos, requerimos mayúscula solo en la primera palabra
                if (partes.indexOf(parte) === 0) return false; // La primera debe ser mayúscula
            }
        }
    }
    
    return true;
}
