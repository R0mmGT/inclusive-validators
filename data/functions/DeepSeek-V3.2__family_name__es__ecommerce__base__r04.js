function validate(apellido) {
    // Validar que sea string y no esté vacío
    if (typeof apellido !== 'string' || apellido.trim() === '') {
        return false;
    }
    
    const apellidoTrim = apellido.trim();
    
    // Validar longitud razonable para un apellido (1-50 caracteres)
    if (apellidoTrim.length < 1 || apellidoTrim.length > 50) {
        return false;
    }
    
    // Patrón: letras (incluyendo acentos, diéresis, ñ, ç) y espacios
    // También permite guiones simples (para apellidos compuestos)
    const patronApellido = /^[a-zA-ZáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙäëïöüÄËÏÖÜâêîôûÂÊÎÔÛñÑçÇ\s'-]+$/;
    
    // Verificar que el apellido cumpla con el patrón
    if (!patronApellido.test(apellidoTrim)) {
        return false;
    }
    
    // Validar que no comience o termine con espacio, guion o apóstrofo
    if (/^[\s'-]|[\s'-]$/.test(apellidoTrim)) {
        return false;
    }
    
    // Validar que no tenga caracteres especiales repetidos de forma sospechosa
    // Por ejemplo: "--", "''", "  "
    if (/(\s{2,}|-{2,}|'{2,})/.test(apellidoTrim)) {
        return false;
    }
    
    // Validar que no sea solo caracteres especiales
    if (/^[\s'-]+$/.test(apellidoTrim)) {
        return false;
    }
    
    // Validar que tenga al menos una letra
    if (!/[a-zA-ZáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙäëïöüÄËÏÖÜâêîôûÂÊÎÔÛñÑçÇ]/.test(apellidoTrim)) {
        return false;
    }
    
    // Casos de apellidos compuestos comunes (ej: "De la Torre")
    // Permitir múltiples palabras separadas por espacios
    const palabras = apellidoTrim.split(/\s+/);
    
    // Validar que cada palabra cumpla con las reglas básicas
    for (let palabra of palabras) {
        // Cada palabra debe tener al menos una letra
        if (!/[a-zA-ZáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙäëïöüÄËÏÖÜâêîôûÂÊÎÔÛñÑçÇ]/.test(palabra)) {
            return false;
        }
        
        // Validar longitud mínima de cada palabra (1 carácter)
        if (palabra.length < 1) {
            return false;
        }
    }
    
    return true;
}
