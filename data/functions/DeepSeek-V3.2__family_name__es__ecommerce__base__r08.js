function validate(apellido) {
    // Verificar que el argumento sea un string
    if (typeof apellido !== 'string') return false;
    
    // Eliminar espacios en blanco al inicio y final
    apellido = apellido.trim();
    
    // Verificar longitud mínima (al menos 2 caracteres) y máxima (50 caracteres)
    if (apellido.length < 2 || apellido.length > 50) return false;
    
    // Verificar que no contenga solo espacios
    if (!apellido.trim()) return false;
    
    // Patrón base: letras, espacios, guiones, apóstrofes y puntos
    // Incluye letras acentuadas y letras de alfabetos latinos extendidos
    const patronBase = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\u0100-\u017F\u0180-\u024F\s'.-]+$/;
    
    // Patrón para validar estructura:
    // 1. Debe comenzar con una letra
    // 2. Puede contener letras, espacios, guiones, apóstrofes y puntos
    // 3. No puede tener dos caracteres especiales consecutivos
    // 4. No puede terminar con un carácter especial (excepto letra acentuada)
    const patronEstructura = /^[a-zA-ZÀ-ÿ\u00f1\u00d1](?:[a-zA-ZÀ-ÿ\u00f1\u00d1]*(?:[-\s.'][a-zA-ZÀ-ÿ\u00f1\u00d1]+)*)?$/;
    
    // Patrón para caracteres no permitidos
    const patronNoPermitidos = /[0-9!"#$%&()*+,/:;<=>?@[\\\]^_`{|}~]/;
    
    // Verificar patrones
    if (!patronBase.test(apellido)) return false;
    if (!patronEstructura.test(apellido)) return false;
    if (patronNoPermitidos.test(apellido)) return false;
    
    // Verificar que no tenga espacios múltiples consecutivos
    if (/\s{2,}/.test(apellido)) return false;
    
    // Verificar que no comience ni termine con carácter especial
    if (/^[-\s.'.]|[-\s.']$/.test(apellido)) return false;
    
    // Verificar que los caracteres especiales estén usados correctamente
    // No dos caracteres especiales consecutivos
    if (/[-\s.']{2,}/.test(apellido)) return false;
    
    // Verificar que después de un punto siga una letra (si hay punto)
    if (/\./g.test(apellido)) {
        const partes = apellido.split('.');
        for (let i = 0; i < partes.length - 1; i++) {
            if (partes[i].length === 0 || !/[a-zA-ZÀ-ÿ\u00f1\u00d1]$/.test(partes[i])) {
                return false;
            }
        }
    }
    
    // Verificar que no contenga palabras prohibidas o inapropiadas
    const palabrasProhibidas = ['admin', 'root', 'system', 'null', 'undefined', 'test'];
    const apellidoLower = apellido.toLowerCase();
    for (const palabra of palabrasProhibidas) {
        if (apellidoLower.includes(palabra)) return false;
    }
    
    // Verificar que al menos el 60% sean letras (no espacios o caracteres especiales)
    const letras = apellido.replace(/[^a-zA-ZÀ-ÿ\u00f1\u00d1]/g, '');
    if (letras.length / apellido.length < 0.6) return false;
    
    return true;
}
