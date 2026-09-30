function validate(nombre) {
    // Verificar que el argumento sea un string
    if (typeof nombre !== 'string') return false;
    
    // Eliminar espacios al principio y final
    const nombreTrimmed = nombre.trim();
    
    // Un nombre válido debe tener al menos un carácter
    if (nombreTrimmed.length === 0) return false;
    
    // Patrones comunes que NO son nombres válidos:
    // 1. Solo números
    if (/^\d+$/.test(nombreTrimmed)) return false;
    
    // 2. Combinaciones de números y letras sin sentido (como códigos)
    if (/^[A-Za-z]+\d+$/.test(nombreTrimmed) && nombreTrimmed.length <= 5) return false;
    
    // 3. Contiene caracteres que normalmente no están en nombres (excepto guiones y apóstrofes)
    if (/[<>@#$%^&*_+=|\\\[\]{};:"`~]/.test(nombreTrimmed)) return false;
    
    // 4. Múltiples puntos consecutivos o puntos al principio/final
    if (/^\.|\.$|\.\./.test(nombreTrimmed)) return false;
    
    // 5. Múltiples guiones consecutivos o guiones al principio/final
    if (/^-|-$|--/.test(nombreTrimmed)) return false;
    
    // 6. Múltiples apóstrofes consecutivos o apóstrofes al principio/final
    if (/^'|'$|''/.test(nombreTrimmed)) return false;
    
    // Características que SÍ debe tener un nombre válido:
    // 1. Debe contener al menos una letra (considerando todas las escrituras)
    if (!/\p{L}/u.test(nombreTrimmed)) return false;
    
    // 2. Longitud mínima y máxima razonable (1-70 caracteres)
    if (nombreTrimmed.length > 70) return false;
    
    // 3. Puede contener letras, espacios, guiones, apóstrofes y puntos
    // (para nombres como "Jean-Pierre", "O'Connor", "M.K." etc.)
    // Patrón inclusivo que acepta caracteres de múltiples escrituras
    const nombrePattern = /^[\p{L}\s.'-]+$/u;
    if (!nombrePattern.test(nombreTrimmed)) return false;
    
    // 4. No debe ser solo espacios (ya verificado) ni solo caracteres especiales
    // Verificar que haya al menos dos letras seguidas (considerando escrituras no latinas)
    const letrasSeguidas = nombreTrimmed.match(/\p{L}{2,}/u);
    if (!letrasSeguidas && nombreTrimmed.length > 2) return false;
    
    // 5. No más de 3 partes separadas por espacios/guiones/apóstrofes
    const partes = nombreTrimmed.split(/[\s.-]+/).filter(part => part.length > 0);
    if (partes.length > 4) return false;
    
    // 6. Cada parte debe contener al menos una letra
    for (const parte of partes) {
        if (!/\p{L}/u.test(parte)) return false;
    }
    
    return true;
}
