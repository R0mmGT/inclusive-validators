function validate(nombre) {
    // Verificar que el argumento sea un string
    if (typeof nombre !== 'string') {
        return false;
    }
    
    // Eliminar espacios al inicio y final, y normalizar espacios múltiples
    const limpio = nombre.trim().replace(/\s+/g, ' ');
    
    // Verificar que no esté vacío después de limpiar
    if (limpio.length === 0) {
        return false;
    }
    
    // Verificar longitud máxima razonable (255 caracteres)
    if (limpio.length > 255) {
        return false;
    }
    
    // Dividir en partes (nombres y apellidos)
    const partes = limpio.split(' ');
    
    // Debe tener al menos dos partes (nombre y apellido)
    if (partes.length < 2) {
        return false;
    }
    
    // Cada parte debe cumplir ciertas condiciones
    for (let i = 0; i < partes.length; i++) {
        const parte = partes[i];
        
        // Longitud mínima de cada parte (excepto para prefijos/de como "de", "van", etc.)
        const prefijosComunes = ['de', 'la', 'las', 'los', 'del', 'van', 'von', 'di', 'da', 'dos', 'das', 'do', 'mac', 'mc', 'al', 'el', 'y', 'e', 'o'];
        const esPrefijo = i > 0 && prefijosComunes.includes(parte.toLowerCase());
        
        if (!esPrefijo && parte.length < 2) {
            return false;
        }
        
        // Verificar caracteres válidos para nombres en múltiples idiomas
        // Permitir letras, apóstrofes, guiones, puntos (para abreviaturas), y caracteres Unicode de letras
        const regexValido = /^[\p{L}\p{M}'\-\.\s]+$/u;
        if (!regexValido.test(parte)) {
            return false;
        }
        
        // Verificar que no tenga solo símbolos
        const soloSimbolos = /^[\-'\.\s]+$/;
        if (soloSimbolos.test(parte)) {
            return false;
        }
        
        // Verificar que no tenga secuencias inválidas de caracteres
        if (/(\-\-)|(\.\.)|(\'\')|(^[\-\.\'])|([\-\.\']$)/.test(parte)) {
            return false;
        }
        
        // Verificar que no tenga números
        const tieneNumeros = /\d/;
        if (tieneNumeros.test(parte)) {
            return false;
        }
    }
    
    // Verificar que al menos una parte (que no sea prefijo) tenga más de 1 carácter
    const tieneParteValida = partes.some((parte, index) => {
        const prefijosComunes = ['de', 'la', 'las', 'los', 'del', 'van', 'von', 'di', 'da', 'dos', 'das', 'do', 'mac', 'mc', 'al', 'el', 'y', 'e', 'o'];
        const esPrefijo = index > 0 && prefijosComunes.includes(parte.toLowerCase());
        return !esPrefijo && parte.length >= 2;
    });
    
    if (!tieneParteValida) {
        return false;
    }
    
    return true;
}
