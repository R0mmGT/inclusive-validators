function validate(nombreCompleto) {
    // Verificar que el argumento sea un string
    if (typeof nombreCompleto !== 'string') {
        return false;
    }

    // Eliminar espacios extra al principio y final
    const nombreLimpio = nombreCompleto.trim();
    
    // Verificar longitud mínima y máxima razonable
    if (nombreLimpio.length < 2 || nombreLimpio.length > 100) {
        return false;
    }

    // Verificar que no sea solo espacios
    if (nombreLimpio.length === 0) {
        return false;
    }

    // Patrón básico que permite:
    // - Letras de múltiples alfabetos (incluyendo acentos, diacríticos)
    // - Guiones, apóstrofes, puntos (para iniciales, nombres compuestos)
    // - Espacios entre nombres
    // - No permite números ni caracteres especiales no comunes en nombres
    const patronBasico = /^[\p{L}\s.'’-]+$/u;
    
    if (!patronBasico.test(nombreLimpio)) {
        return false;
    }

    // Verificar que no empiece o termine con caracteres no alfabéticos
    const primerCaracter = nombreLimpio.charAt(0);
    const ultimoCaracter = nombreLimpio.charAt(nombreLimpio.length - 1);
    
    if (!/\p{L}/u.test(primerCaracter)) {
        return false;
    }
    
    if (!/\p{L}/u.test(ultimoCaracter)) {
        return false;
    }

    // Verificar que no haya secuencias inválidas de caracteres
    // - No más de un espacio consecutivo
    // - No más de un guion/apóstrofe consecutivo
    // - No espacios antes o después de guiones/apóstrofes (opcional, depende del nombre)
    if (/\s{2,}/.test(nombreLimpio)) {
        return false;
    }

    // Verificar que haya al menos un espacio (nombre y apellido)
    // Esto es flexible porque algunos nombres pueden no tener apellido
    // o usar otros formatos culturales
    if (!/\s/.test(nombreLimpio)) {
        // Si no hay espacio, verificar que sea un nombre válido de una sola palabra
        // con longitud adecuada y solo letras
        const nombreUnico = /^\p{L}+(?:[.'’-]\p{L}+)*$/u;
        return nombreUnico.test(nombreLimpio);
    }

    // Verificar que cada parte del nombre sea válida
    const partes = nombreLimpio.split(/\s+/);
    
    // Debe tener al menos 2 partes (nombre y apellido)
    // pero permitimos hasta 5 partes para nombres largos
    if (partes.length < 2 || partes.length > 5) {
        return false;
    }

    // Verificar cada parte individual
    for (let parte of partes) {
        // Cada parte debe comenzar con una letra
        if (!/\p{L}/u.test(parte.charAt(0))) {
            return false;
        }
        
        // Cada parte debe terminar con una letra o punto (para iniciales)
        const ultimoCaracterParte = parte.charAt(parte.length - 1);
        if (!/\p{L}/u.test(ultimoCaracterParte) && ultimoCaracterParte !== '.') {
            return false;
        }
        
        // Longitud mínima de cada parte (1 para iniciales con punto, 2 para nombres completos)
        if (parte.length === 1 && parte !== '.') {
            return false;
        }
        
        // Para partes con punto (iniciales), verificar formato
        if (parte.includes('.')) {
            if (!/^[A-Za-zÀ-ÿ]\.$/u.test(parte) && !/^[A-Za-zÀ-ÿ]\.{2,}$/u.test(parte)) {
                return false;
            }
        }
    }

    return true;
}
