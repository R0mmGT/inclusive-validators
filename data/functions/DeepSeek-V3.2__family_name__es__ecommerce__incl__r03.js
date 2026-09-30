function validate(apellido) {
    // Verificar que el argumento sea un string
    if (typeof apellido !== 'string') {
        return false;
    }
    
    // Eliminar espacios en blanco al principio y al final
    apellido = apellido.trim();
    
    // Verificar longitud mínima y máxima razonable
    if (apellido.length < 1 || apellido.length > 100) {
        return false;
    }
    
    // Verificar que no sea solo espacios
    if (apellido === '') {
        return false;
    }
    
    // Patrón base que permite letras (incluyendo acentuadas y diacríticos), espacios, guiones y apóstrofes
    // También permite algunos caracteres específicos de diferentes culturas
    const patronBase = /^[\p{L}\s'\-]+$/u;
    
    // Patrones adicionales para casos específicos
    const patronChinoJapones = /^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}ー・]+$/u;
    const patronCoreano = /^[\p{Script=Hangul}]+$/u;
    const patronCirilico = /^[\p{Script=Cyrillic}\s'\-]+$/u;
    const patronGriego = /^[\p{Script=Greek}\s'\-]+$/u;
    const patronArabe = /^[\p{Script=Arabic}\s'\-]+$/u;
    const patronHebreo = /^[\p{Script=Hebrew}\s'\-]+$/u;
    
    // Verificar contra el patrón base primero
    if (patronBase.test(apellido)) {
        // Verificar que no sea solo espacios, guiones o apóstrofes
        const sinEspaciosGuiones = apellido.replace(/[\s'\-]/g, '');
        if (sinEspaciosGuiones.length === 0) {
            return false;
        }
        
        // Verificar que no tenga secuencias inválidas de caracteres especiales
        if (/(\s{2,})|('-)|('')|(--)|(^-)|(-$)|(^')|('$)/.test(apellido)) {
            return false;
        }
        
        return true;
    }
    
    // Verificar otros patrones específicos de escritura
    if (patronChinoJapones.test(apellido) || 
        patronCoreano.test(apellido) || 
        patronCirilico.test(apellido) ||
        patronGriego.test(apellido) ||
        patronArabe.test(apellido) ||
        patronHebreo.test(apellido)) {
        
        // Verificar longitud mínima para estos scripts
        if (apellido.replace(/[\s\-・]/g, '').length < 1) {
            return false;
        }
        
        return true;
    }
    
    // Verificar nombres compuestos con paréntesis (ej: "García (López)")
    if (/^[\p{L}\s'\-]+\(\s*[\p{L}\s'\-]+\s*\)$/u.test(apellido)) {
        return true;
    }
    
    // Verificar nombres con partículas (ej: "de la Cruz", "van der Berg")
    if (/^(de|del|la|las|los|van|der|von|van der|von der|di|da|dos|das|do|du|el|al|bin|ibn|ap|ab|ben|mac|mc|o'\s*)[\s'\-]*[\p{L}\s'\-]+$/iu.test(apellido)) {
        // Verificar que haya al menos un carácter de letra además de las partículas
        const sinParticulas = apellido.replace(/^(de|del|la|las|los|van|der|von|van der|von der|di|da|dos|das|do|du|el|al|bin|ibn|ap|ab|ben|mac|mc|o'\s*)[\s'\-]*/iu, '');
        if (sinParticulas.replace(/[\s'\-]/g, '').length > 0) {
            return true;
        }
    }
    
    return false;
}
