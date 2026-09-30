function validate(apellido) {
    // Validar entrada: debe ser un string no vacío
    if (typeof apellido !== 'string' || apellido.trim() === '') {
        return false;
    }
    
    const nombreLimpio = apellido.trim();
    
    // Longitud máxima razonable (puede ajustarse)
    if (nombreLimpio.length > 100) {
        return false;
    }
    
    // Patrón principal: letras, espacios, guiones, apóstrofes
    // Incluye caracteres latinos básicos, diacríticos y algunos caracteres comunes
    const patronBasico = /^[\p{L}\s\-'.]+$/u;
    
    if (!patronBasico.test(nombreLimpio)) {
        return false;
    }
    
    // Validaciones específicas
    // 1. No debe contener solo espacios, guiones o apóstrofes
    const soloCaracteresEspeciales = /^[\s\-'.]+$/;
    if (soloCaracteresEspeciales.test(nombreLimpio)) {
        return false;
    }
    
    // 2. No debe empezar ni terminar con caracteres especiales (excepto apóstrofe inicial en algunos casos)
    const comienzaConEspecial = /^[\s\-'.]/;
    const terminaConEspecial = /[\s\-'.]$/;
    
    // Permitir apóstrofe inicial (ej: O'Connor)
    if ((comienzaConEspecial.test(nombreLimpio) && !nombreLimpio.startsWith("'")) || 
        terminaConEspecial.test(nombreLimpio)) {
        return false;
    }
    
    // 3. No debe tener caracteres especiales consecutivos
    const consecutivosEspeciales = /[\s\-'.]{2,}/;
    if (consecutivosEspeciales.test(nombreLimpio)) {
        return false;
    }
    
    // 4. Debe contener al menos una letra
    const tieneLetras = /\p{L}/u;
    if (!tieneLetras.test(nombreLimpio)) {
        return false;
    }
    
    // 5. Validar casos específicos comunes
    // a) No permitir solo números (aunque están excluidos por el patrón básico)
    const soloNumeros = /^\d+$/;
    if (soloNumeros.test(nombreLimpio)) {
        return false;
    }
    
    // b) Validar uso de guiones (solo entre letras)
    if (nombreLimpio.includes('-')) {
        const partes = nombreLimpio.split('-');
        for (let parte of partes) {
            if (parte === '' || !/\p{L}/u.test(parte)) {
                return false;
            }
        }
    }
    
    // Casos especiales culturales (ejemplos)
    // Permitir apóstrofes internos (O'Connor)
    if (nombreLimpio.includes("'") && nombreLimpio.indexOf("'") > 0) {
        const partesApostrofe = nombreLimpio.split("'");
        if (partesApostrofe.length > 2) {
            return false; // Solo un apóstrofe permitido
        }
        if (partesApostrofe[1] === '') {
            return false; // No puede terminar con apóstrofe
        }
    }
    
    // Longitud mínima después de limpiar caracteres especiales
    const soloLetras = nombreLimpio.replace(/[^\\p{L}]/gu, '');
    if (soloLetras.length < 1) {
        return false;
    }
    
    return true;
}
