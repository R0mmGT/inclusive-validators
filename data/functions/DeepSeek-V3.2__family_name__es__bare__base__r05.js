function validate(apellido) {
    // Validaciones básicas
    if (typeof apellido !== 'string') return false;
    if (apellido.trim() === '') return false;
    
    const apellidoTrimmed = apellido.trim();
    
    // Longitud razonable para apellidos (entre 1 y 50 caracteres)
    if (apellidoTrimmed.length < 1 || apellidoTrimmed.length > 50) return false;
    
    // Verificar que no tenga solo espacios
    if (!apellidoTrimmed.replace(/\s/g, '').length) return false;
    
    // Patrón básico para apellidos: letras, espacios, guiones, apóstrofes
    // Permitimos caracteres acentuados y letras de diferentes alfabetos
    const patronApellido = /^[\p{L}\s\-']+$/u;
    
    // Verificar patrón
    if (!patronApellido.test(apellidoTrimmed)) return false;
    
    // Validaciones adicionales
    // No puede empezar o terminar con espacio, guión o apóstrofe
    if (/^[\s\-']|[\s\-']$/.test(apellidoTrimmed)) return false;
    
    // No puede tener secuencias inválidas como "--" o "''"
    if (/(--|\-\'|\'\-\|\'\'|\s\s)/.test(apellidoTrimmed)) return false;
    
    // Debe contener al menos una letra
    const tieneLetras = /[\p{L}]/u.test(apellidoTrimmed);
    if (!tieneLetras) return false;
    
    // Capitalización opcional pero permitida
    // Ejemplos válidos: García, García López, De la Torre, O'Brien, Pérez-Gómez
    return true;
}
