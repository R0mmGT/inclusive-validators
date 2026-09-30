function validate(codigoPostal) {
    // Verificar que el argumento sea un string
    if (typeof codigoPostal !== 'string') {
        return false;
    }
    
    const codigo = codigoPostal.trim();
    
    // Un código postal vacío no es válido
    if (codigo.length === 0) {
        return false;
    }
    
    // Patrones comunes de códigos postales en diferentes países
    const patrones = [
        // Estados Unidos: 5 dígitos, opcionalmente seguidos de guion y 4 dígitos
        /^\d{5}(-\d{4})?$/,
        
        // Canadá: A1A 1A1 (alternancia letra-dígito-letra espacio dígito-letra-dígito)
        /^[A-Z]\d[A-Z] \d[A-Z]\d$/i,
        
        // México: 5 dígitos
        /^\d{5}$/,
        
        // Reino Unido: Formato complejo como AA9A 9AA, A9A 9AA, etc.
        /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/i,
        
        // España: 5 dígitos
        /^\d{5}$/,
        
        // Francia: 5 dígitos
        /^\d{5}$/,
        
        // Alemania: 5 dígitos
        /^\d{5}$/,
        
        // Italia: 5 dígitos
        /^\d{5}$/,
        
        // Australia: 4 dígitos
        /^\d{4}$/,
        
        // Brasil: 5 dígitos, opcionalmente guion y 3 dígitos
        /^\d{5}(-\d{3})?$/,
        
        // Argentina: 4 dígitos, a veces letra opcional
        /^\d{4}[A-Z]?$/i,
        
        // India: 6 dígitos
        /^\d{6}$/,
        
        // China: 6 dígitos
        /^\d{6}$/,
        
        // Japón: 3 dígitos, guion, 4 dígitos
        /^\d{3}-\d{4}$/,
        
        // Corea del Sur: 5 dígitos, o 3 dígitos-guion-3 dígitos
        /^(\d{5}|\d{3}-\d{3})$/,
        
        // Países Bajos: 4 dígitos, dos letras opcionales
        /^\d{4}[A-Z]{0,2}$/i,
        
        // Suecia: 3 dígitos, espacio, 2 dígitos
        /^\d{3} \d{2}$/,
        
        // Noruega: 4 dígitos
        /^\d{4}$/,
        
        // Dinamarca: 4 dígitos
        /^\d{4}$/,
        
        // Finlandia: 5 dígitos
        /^\d{5}$/,
        
        // Portugal: 4 dígitos, guion, 3 dígitos
        /^\d{4}-\d{3}$/,
        
        // Chile: 7 dígitos
        /^\d{7}$/,
        
        // Colombia: 6 dígitos
        /^\d{6}$/,
        
        // Perú: 5 dígitos
        /^\d{5}$/,
        
        // Venezuela: 4 dígitos
        /^\d{4}$/,
        
        // Uruguay: 5 dígitos
        /^\d{5}$/,
        
        // Paraguay: 4 dígitos
        /^\d{4}$/,
        
        // Bolivia: 4 dígitos
        /^\d{4}$/,
        
        // Ecuador: 6 dígitos
        /^\d{6}$/,
        
        // Costa Rica: 5 dígitos
        /^\d{5}$/,
        
        // Panamá: 4 dígitos, guion, 4 dígitos (formato postal nuevo)
        /^\d{4}-\d{4}$/,
        
        // Formato genérico 1: Secuencia de dígitos entre 3 y 10 caracteres
        /^\d{3,10}$/,
        
        // Formato genérico 2: Secuencia alfanumérica con espacios o guiones
        /^[A-Z0-9][A-Z0-9\s\-]{2,14}[A-Z0-9]$/i
    ];
    
    // Comprobar si coincide con al menos un patrón
    for (const patron of patrones) {
        if (patron.test(codigo)) {
            return true;
        }
    }
    
    // Si no coincide con ningún patrón, considerar otros casos especiales
    // Algunos países usan códigos postales con solo letras
    if (/^[A-Z\s\-]+$/i.test(codigo) && codigo.length >= 3 && codigo.length <= 10) {
        return true;
    }
    
    // Verificar códigos postales con formato mixto pero que no coincidieron
    // con patrones específicos (ejemplo: "SW1A 1AA" para Reino Unido)
    if (/^[A-Z0-9]+(\s|\-)?[A-Z0-9]+$/i.test(codigo) && codigo.length >= 4 && codigo.length <= 10) {
        // Verificar que tenga al menos un dígito o al menos una letra
        if (/\d/.test(codigo) || /[A-Z]/i.test(codigo)) {
            return true;
        }
    }
    
    return false;
}
