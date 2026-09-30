function validate(nombreCompleto) {
    // Validación básica: no vacío, no solo espacios, longitud razonable
    if (typeof nombreCompleto !== 'string') return false;
    
    const trimmed = nombreCompleto.trim();
    if (trimmed.length === 0) return false;
    if (trimmed.length > 150) return false; // Límite razonable para nombres
    
    // No debe contener caracteres no permitidos
    // Permitimos letras, espacios, guiones, apóstrofes, puntos y acentos comunes
    const caracteresPermitidos = /^[\p{L}\s'.-]+$/u;
    if (!caracteresPermitidos.test(trimmed)) return false;
    
    // Validación de estructura básica
    const partes = trimmed.split(/\s+/).filter(part => part.length > 0);
    
    // Debe tener al menos dos partes (nombre y apellido) o aceptar nombres de una sola palabra en culturas que lo permiten
    if (partes.length < 1) return false;
    
    // Cada parte debe comenzar con una letra (no con símbolo)
    for (const parte of partes) {
        if (!/^\p{L}/u.test(parte)) return false;
        
        // No debe tener símbolos consecutivos
        if (/[.'-]{2,}/.test(parte)) return false;
        
        // No debe terminar con símbolo (excepto punto en abreviaciones)
        if (/[.'-]$/.test(parte) && !/^[A-Z]\.?$/i.test(parte)) return false;
        
        // Longitud mínima de cada parte (excepto iniciales con punto)
        if (!/^[A-Z]\.?$/i.test(parte) && parte.length < 2) return false;
    }
    
    // Verificar que no sea solo iniciales (a menos que sea válido como "J. R. R. Tolkien")
    const soloIniciales = partes.every(parte => /^[A-Z]\.?$/i.test(parte));
    if (soloIniciales && partes.length < 2) return false;
    
    // Verificar que haya al menos una parte con longitud > 1 (nombre o apellido completo)
    const partesCompletas = partes.filter(parte => parte.length > 2 || !/^[A-Z]\.?$/i.test(parte));
    if (partesCompletas.length === 0) return false;
    
    // Validaciones adicionales de sentido común
    // No debe contener números
    if (/\d/.test(trimmed)) return false;
    
    // No debe contener palabras ofensivas comunes (lista básica)
    const palabrasOfensivas = ['test', 'admin', 'usuario', 'user', 'nombre', 'apellido'];
    const lower = trimmed.toLowerCase();
    for (const palabra of palabrasOfensivas) {
        if (lower.includes(palabra)) return false;
    }
    
    // No demasiados espacios consecutivos (ya filtrado por split)
    // No demasiadas partes (máximo 6 partes: ej. "Dr. Juan Carlos de la Torre Sánchez")
    if (partes.length > 6) return false;
    
    return true;
}
