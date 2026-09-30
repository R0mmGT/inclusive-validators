function validate(fullName) {
    // Validaciones básicas
    if (typeof fullName !== 'string') return false;
    
    const trimmedName = fullName.trim();
    
    // El nombre no debe estar vacío después de quitar espacios
    if (trimmedName.length === 0) return false;
    
    // Longitud máxima razonable (evitar inyección de datos)
    if (trimmedName.length > 200) return false;
    
    // Caracteres permitidos:
    // - Letras (incluyendo caracteres internacionales con acentos y diacríticos)
    // - Espacios (incluyendo espacios finos, espacios de no separación)
    // - Apóstrofes, guiones (para nombres compuestos como O'Brien, Jean-Pierre)
    // - Puntos (para abreviaciones como Jr., Sr., Ph.D.)
    // - Caracteres especiales específicos de ciertas culturas
    
    // Esta expresión regular permite:
    // \p{L}: cualquier letra de cualquier idioma (Unicode)
    // \s: cualquier tipo de espacio en blanco
    // '-.: caracteres comunes en nombres
    // También incluye el apóstrofo curvado ’ y el apóstrofo recto '
    const allowedCharacters = /^[\p{L}\s'’\-.]+$/u;
    
    if (!allowedCharacters.test(trimmedName)) return false;
    
    // Verificar que haya al menos un carácter que sea letra
    const hasAtLeastOneLetter = /[\p{L}]/u.test(trimmedName);
    if (!hasAtLeastOneLetter) return false;
    
    // Verificar que no haya secuencias inválidas de caracteres
    const invalidSequences = [
        /^\s+$/,                       // Solo espacios
        /'\s/, /\s'/,                  // Apóstrofo seguido o precedido de espacio
        /-\s/, /\s-/,                  // Guión seguido o precedido de espacio
        /\.\s*\./,                     // Múltiples puntos consecutivos
        /^[\-\.']/, /[\-\.']$/,        // Comienza o termina con puntuación
        /\s{2,}/,                      // Múltiples espacios consecutivos
        /'\w*'\w*'/u,                  // Múltiples apóstrofes en palabras simples
    ];
    
    if (invalidSequences.some(pattern => pattern.test(trimmedName))) return false;
    
    // Dividir el nombre en partes
    const nameParts = trimmedName.split(/\s+/);
    
    // Debe tener al menos 2 partes (nombre y apellido) para ser nombre completo
    if (nameParts.length < 2) return false;
    
    // Verificar cada parte individualmente
    for (const part of nameParts) {
        // Cada parte debe tener al menos un carácter que sea letra
        if (!/[\p{L}]/u.test(part)) return false;
        
        // Longitud mínima de cada parte (excepto para abreviaciones con punto)
        if (!part.includes('.')) {
            if (part.replace(/['\-]/g, '').length < 1) return false;
        }
        
        // Si contiene punto, debe estar en una posición válida
        if (part.includes('.')) {
            // El punto debe estar al final (para abreviaciones)
            if (!part.endsWith('.')) return false;
            // La parte antes del punto debe tener al menos un carácter
            if (part.split('.')[0].length === 0) return false;
        }
    }
    
    // Verificar que haya al menos una parte sin punto (nombre real, no solo títulos)
    const hasNonAbbreviatedPart = nameParts.some(part => !part.includes('.'));
    if (!hasNonAbbreviatedPart) return false;
    
    // Verificar formato de mayúsculas/minúsculas (permitir cualquier combinación)
    // No se valida ya que en algunas culturas los nombres se escriben en minúsculas
    // o pueden tener combinaciones específicas (van Gogh, McDonald)
    
    return true;
}
