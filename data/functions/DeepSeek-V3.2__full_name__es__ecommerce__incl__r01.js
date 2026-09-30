function validate(nombreCompleto) {
    // Validación básica: no vacío y longitud razonable
    if (typeof nombreCompleto !== 'string') return false;
    
    const nombreTrimmed = nombreCompleto.trim();
    if (nombreTrimmed.length === 0 || nombreTrimmed.length > 150) return false;
    
    // Verificar que solo contenga caracteres válidos para nombres en múltiples escrituras
    // Permite letras (incluyendo acentuadas y diacríticos), espacios, guiones, apóstrofes, puntos
    // y algunos caracteres específicos de ciertos alfabetos
    const caracteresValidos = /^[\p{L}\s'-.]+$/u;
    if (!caracteresValidos.test(nombreTrimmed)) return false;
    
    // Dividir en partes y validar estructura básica
    const partes = nombreTrimmed.split(/\s+/).filter(part => part.length > 0);
    
    // Debe tener al menos dos partes (nombre y apellido)
    if (partes.length < 2) return false;
    
    // Cada parte debe comenzar con una letra (no espacio, guión, etc.)
    const comienzaConLetra = /^\p{L}/u;
    for (const parte of partes) {
        if (!comienzaConLetra.test(parte)) return false;
        
        // Validar longitud mínima y máxima de cada parte
        if (parte.length < 2 || parte.length > 50) return false;
        
        // No permitir caracteres repetidos excesivamente (ej: "Aaaaaaaa")
        const caracteresRepetidos = /(.)\1{4,}/;
        if (caracteresRepetidos.test(parte)) return false;
        
        // Validar uso correcto de guiones y apóstrofes
        const guionesApóstrofesValidos = /^[\p{L}]+(?:[-'][\p{L}]+)*$/u;
        if (!guionesApóstrofesValidos.test(parte)) return false;
    }
    
    // Validar estructura de nombre completo
    // No permitir solo iniciales (a menos que sean múltiples con puntos, como "J. R. R. Tolkien")
    const soloIniciales = /^[A-Za-z]\.?$/;
    const todasPartesSonIniciales = partes.every(part => soloIniciales.test(part));
    if (todasPartesSonIniciales && partes.length < 3) return false;
    
    // Verificar proporción de mayúsculas/minúsculas (no todo mayúsculas ni todo minúsculas)
    const todoMayusculas = /^[A-Z\s'-.]+$/;
    const todoMinusculas = /^[a-z\s'-.]+$/;
    if (todoMayusculas.test(nombreTrimmed) || todoMinusculas.test(nombreTrimmed)) {
        return false;
    }
    
    // Validar que haya al menos una letra mayúscula después de cada espacio o guión
    const palabras = nombreTrimmed.split(/[\s-]+/);
    for (const palabra of palabras) {
        if (palabra.length > 0) {
            const primeraLetra = palabra.charAt(0);
            if (!/[A-ZÀ-ÖØ-Þ]/.test(primeraLetra)) return false;
        }
    }
    
    // Validar secuencias inválidas
    const secuenciasInvalidas = [
        /\.{2,}/,  // Múltiples puntos consecutivos
        /'{2,}/,   // Múltiples apóstrofes consecutivos
        /-{2,}/,   // Múltiples guiones consecutivos
        /\s{2,}/,  // Múltiples espacios consecutivos
        /^[.\s'-]+/, // Comienza con caracter especial
        /[.\s'-]+$/, // Termina con caracter especial
        /[\s'-]{2,}/ // Múltiples separadores consecutivos
    ];
    
    for (const regex of secuenciasInvalidas) {
        if (regex.test(nombreTrimmed)) return false;
    }
    
    // Casos especiales culturales
    // Permitir nombres con partículas como "de", "van", "bin", etc., pero validar estructura
    const particulasComunes = /\b(von|van|de|da|di|del|della|dos|das|do|de la|de los|al|el|bin|binti|ibn|bat|ben|mac|mc|fitz|ap|ab|zu|af|av|y|e|of|the)\b/i;
    
    // Si hay partículas, verificar que no estén solas o en posición incorrecta
    const palabrasNombre = nombreTrimmed.split(/\s+/);
    for (let i = 0; i < palabrasNombre.length; i++) {
        if (particulasComunes.test(palabrasNombre[i].toLowerCase())) {
            // La partícula no debe ser la última palabra
            if (i === palabrasNombre.length - 1) return false;
            
            // La partícula no debe ser la primera palabra (a menos que sea culturalmente apropiado)
            if (i === 0) {
                // Algunas culturas aceptan partículas al inicio
                const partículasInicioPermitidas = /^(van|de|di|del|al|el|bin|ibn|mac|mc|fitz|ap|ab)$/i;
                if (!partículasInicioPermitidas.test(palabrasNombre[i])) return false;
            }
        }
    }
    
    return true;
}
