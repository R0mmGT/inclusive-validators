function validate(address) {
    // Verificar que sea string y no esté vacío
    if (typeof address !== 'string' || address.trim() === '') {
        return false;
    }
    
    const trimmedAddress = address.trim();
    
    // Longitud mínima y máxima razonable
    if (trimmedAddress.length < 5 || trimmedAddress.length > 100) {
        return false;
    }
    
    // No debe contener solo números
    if (/^\d+$/.test(trimmedAddress)) {
        return false;
    }
    
    // Debe contener al menos una letra (incluyendo ñ y acentos)
    if (!/[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(trimmedAddress)) {
        return false;
    }
    
    // Patrones inválidos comunes
    const invalidPatterns = [
        /^[^a-zA-Z0-9]*$/, // Solo caracteres especiales
        /^(test|prueba|ejemplo|aaaa|xxxx)/i, // Palabras de prueba
        /(\.\.+|--+|__+)/, // Caracteres repetidos
        /[<>{}[\]]/, // Caracteres HTML/script peligrosos
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmedAddress)) {
            return false;
        }
    }
    
    // Formato básico de dirección: debe tener número (opcional) y texto
    // Permitir formatos como "Calle Principal 123", "Av. Libertador 456", "Calle 45 # 67-89"
    const addressRegex = /^([a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.#\-]+)\s+([a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\.#\-\/]+)$/;
    if (!addressRegex.test(trimmedAddress)) {
        return false;
    }
    
    // Verificar que no sean solo palabras repetidas o sin sentido
    const words = trimmedAddress.split(/\s+/);
    if (words.length < 2) {
        return false;
    }
    
    // Verificar que haya al menos un número (no requerido pero recomendado)
    const hasNumber = /\d/.test(trimmedAddress);
    
    // La dirección es válida si pasa todas las validaciones
    return true;
}
