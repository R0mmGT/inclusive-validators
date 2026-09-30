function validate(phoneString) {
    // Verificar que sea un string y no esté vacío
    if (typeof phoneString !== 'string' || phoneString.trim() === '') {
        return false;
    }
    
    const phone = phoneString.trim();
    
    // Patrones de teléfonos comunes en diferentes países
    const patterns = [
        // Internacional con + y 1-15 dígitos después del código de país
        /^\+\d{1,3}[-\s]?\d{4,15}$/,
        
        // Internacional con 00 y 1-15 dígitos después del código de país
        /^00\d{1,3}[-\s]?\d{4,15}$/,
        
        // Números norteamericanos (USA, Canadá) con o sin código de área
        /^(\+1|1)?[-\s]?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/,
        
        // Números europeos (ej: España, Francia, Alemania) - varios formatos
        /^(\+34|34)?[-\s]?[6-9]\d{2}[-\s]?\d{3}[-\s]?\d{3}$/, // España
        /^(\+33|33)?[-\s]?[1-9]\d{0,2}[-\s]?\d{2}[-\s]?\d{2}[-\s]?\d{2}$/, // Francia
        /^(\+49|49)?[-\s]?[1-9]\d{1,4}[-\s]?\d{3,9}$/, // Alemania
        
        // Números del Reino Unido
        /^(\+44|44)?[-\s]?[1-9]\d{1,3}[-\s]?\d{3}[-\s]?\d{4}$/,
        
        // Números de México
        /^(\+52|52)?[-\s]?[1-9]\d{1,2}[-\s]?\d{4}[-\s]?\d{4}$/,
        
        // Números de Argentina
        /^(\+54|54)?[-\s]?[1-9]\d{0,3}[-\s]?\d{4}[-\s]?\d{3,4}$/,
        
        // Números de Brasil
        /^(\+55|55)?[-\s]?[1-9]\d{1,2}[-\s]?\d{4}[-\s]?\d{4}$/,
        
        // Números con sólo dígitos (entre 7 y 15 dígitos, límite ITU-T E.164)
        /^\d{7,15}$/,
        
        // Números con paréntesis, espacios, guiones o puntos como separadores
        /^[\+\d]{1,4}?[-.\s]?\(?\d{1,5}\)?[-.\s]?\d{1,5}[-.\s]?\d{1,9}$/
    ];
    
    // Verificar si coincide con alguno de los patrones
    for (const pattern of patterns) {
        if (pattern.test(phone)) {
            // Verificación adicional: eliminar todos los caracteres no numéricos
            // y verificar que la longitud total esté entre 7 y 15 dígitos (ITU-T E.164)
            const numericOnly = phone.replace(/[^\d]/g, '');
            return numericOnly.length >= 7 && numericOnly.length <= 15;
        }
    }
    
    return false;
}
