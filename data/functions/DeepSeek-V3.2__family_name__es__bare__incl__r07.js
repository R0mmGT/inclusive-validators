/**
 * Valida si una cadena de texto es un apellido válido considerando diversas culturas.
 * 
 * @param {string} apellido - La cadena a validar como apellido.
 * @returns {boolean} - `true` si es un apellido válido, `false` en caso contrario.
 */
function validate(apellido) {
    // Validación básica: no vacío, no solo espacios, no nulo/undefined
    if (typeof apellido !== 'string' || !apellido.trim()) {
        return false;
    }
    
    const nombreLimpio = apellido.trim();
    
    // Longitud razonable para un apellido (mínimo 1 carácter, máximo 70)
    if (nombreLimpio.length < 1 || nombreLimpio.length > 70) {
        return false;
    }
    
    // Validación de caracteres: permite letras, espacios, guiones, apóstrofes y caracteres diacríticos
    // Esta expresión regular cubre:
    // - Letras básicas (a-z, A-Z) y letras con diacríticos comunes (á, é, ñ, ü, ç, etc.)
    // - Espacios (para apellidos compuestos como "De la Cruz")
    // - Guiones (para apellidos como "Smith-Jones")
    // - Apóstrofes (para apellidos como "O'Connor" o "D'Angelo")
    // - Puntos (para abreviaciones como "St. John", aunque menos común en apellidos)
    const patronBasico = /^[\p{L}\s'-.]*$/u;
    
    if (!patronBasico.test(nombreLimpio)) {
        return false;
    }
    
    // Validaciones específicas para evitar casos problemáticos
    
    // 1. No debe contener solo espacios, guiones, apóstrofes o puntos
    const soloCaracteresEspeciales = /^[\s'-.]*$/;
    if (soloCaracteresEspeciales.test(nombreLimpio)) {
        return false;
    }
    
    // 2. No debe comenzar ni terminar con caracteres especiales (excepto espacios que ya fueron trimmeados)
    if (nombreLimpio.startsWith('-') || nombreLimpio.startsWith('\'') || nombreLimpio.startsWith('.')) {
        return false;
    }
    if (nombreLimpio.endsWith('-') || nombreLimpio.endsWith('\'') || nombreLimpio.endsWith('.')) {
        return false;
    }
    
    // 3. No debe contener secuencias inválidas de caracteres especiales
    //    (como dos guiones seguidos, dos apóstrofes seguidos, etc.)
    const secuenciasInvalidas = /--|''|\.\.|  |'-|-'|\.-|-\\.|'\.|\.'/;
    if (secuenciasInvalidas.test(nombreLimpio)) {
        return false;
    }
    
    // 4. Debe contener al menos una letra (considerando Unicode)
    const alMenosUnaLetra = /\p{L}/u;
    if (!alMenosUnaLetra.test(nombreLimpio)) {
        return false;
    }
    
    // 5. Validación específica para patrones comunes de apellidos en diferentes culturas
    
    // Apellidos con prefijos (Van, De, Von, etc.) seguidos de espacio y más texto
    const prefijosComunes = /^(van|de|von|del|de la|di|da|dos|das|do|el|al|bin|ibn|mac|mc|fitz|o')[ -]/i;
    
    // Si comienza con un prefijo común, verificar que haya texto después
    if (prefijosComunes.test(nombreLimpio.toLowerCase())) {
        // Extraer la parte después del prefijo
        const partes = nombreLimpio.split(/[ -]/, 2);
        if (partes.length < 2 || partes[1].length < 1) {
            return false;
        }
    }
    
    // Apellidos con sufijos (Jr., Sr., III, etc.) - menos común pero posible
    const sufijosComunes = / (jr|sr|i{1,3}|iv|v|vi{0,3}|ix|x)\.?$/i;
    const nombreSinSufijo = nombreLimpio.replace(sufijosComunes, '');
    
    // Si había un sufijo, verificar que lo anterior sea válido
    if (nombreSinSufijo !== nombreLimpio) {
        if (!patronBasico.test(nombreSinSufijo) || nombreSinSufijo.length < 1) {
            return false;
        }
    }
    
    // 6. Validación de mayúsculas/minúsculas (opcional pero útil)
    // Algunas culturas usan apellidos completamente en mayúsculas
    // Permitimos cualquier combinación, pero verificamos casos extremos
    
    // Casos extremos: todas mayúsculas o todas minúsculas son válidos
    // (algunos sistemas normalizan a mayúsculas, otros preservan el caso)
    
    return true;
}
