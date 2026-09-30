function validate(apellido) {
    // Verificar que el argumento sea un string
    if (typeof apellido !== 'string') return false;
    
    // Eliminar espacios en blanco al inicio y final
    apellido = apellido.trim();
    
    // Verificar que no esté vacío después de trim
    if (apellido.length === 0) return false;
    
    // Longitud máxima razonable para un apellido (incluye espacios para apellidos compuestos)
    if (apellido.length > 100) return false;
    
    // Caracteres permitidos: letras, espacios, guiones, apóstrofes, puntos
    // y caracteres diacríticos para diferentes idiomas
    const caracteresPermitidos = /^[\p{L}\s'\-.]*$/u;
    if (!caracteresPermitidos.test(apellido)) return false;
    
    // Verificar que no empiece ni termine con caracteres no alfabéticos (excepto apóstrofe inicial para algunos casos como O'Connor)
    const patronInicioFin = /^[\p{L}'][\p{L}\s'\-.]*[\p{L}.']?$/u;
    if (!patronInicioFin.test(apellido)) return false;
    
    // Verificar que no haya múltiples espacios consecutivos
    if (/\s{2,}/.test(apellido)) return false;
    
    // Verificar que no haya secuencias inválidas de caracteres especiales
    if (/['\-.]{2,}/.test(apellido)) return false; // No permite --, '', .., etc.
    
    // Verificar que los caracteres especiales no estén aislados sin letras alrededor
    // (excepto apóstrofe inicial y punto final para abreviaciones)
    const partes = apellido.split(/[\s\-]+/);
    for (let parte of partes) {
        if (parte.length === 0) continue;
        
        // Verificar que cada parte contenga al menos una letra
        const contieneLetra = /[\p{L}]/u.test(parte);
        if (!contieneLetra) return false;
        
        // Verificar que los apóstrofes internos tengan letras antes y después
        if (parte.includes("'") && parte.length > 1) {
            const indiceApostrofe = parte.indexOf("'");
            if (indiceApostrofe === 0) {
                // Apóstrofe inicial permitido (ej: O'Connor)
                if (parte.length < 3) return false;
            } else if (indiceApostrofe === parte.length - 1) {
                // Apóstrofe final generalmente no permitido en apellidos
                return false;
            }
        }
        
        // Verificar que los guiones internos tengan letras antes y después
        if (parte.includes("-") && parte.length > 1) {
            const indiceGuion = parte.indexOf("-");
            if (indiceGuion === 0 || indiceGuion === parte.length - 1) {
                return false;
            }
        }
        
        // Verificar que los puntos tengan contexto válido
        if (parte.includes(".")) {
            // Solo permitir puntos al final (para abreviaciones como "St.")
            if (!parte.endsWith(".")) return false;
            // Verificar que haya al menos una letra antes del punto
            if (parte.length < 2) return false;
        }
    }
    
    // Verificar que haya al menos una letra en todo el apellido
    const tieneLetras = /[\p{L}]/u.test(apellido);
    if (!tieneLetras) return false;
    
    return true;
}
