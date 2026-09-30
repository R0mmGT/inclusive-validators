function validate(postalCode) {
    // Verificar que el argumento sea un string
    if (typeof postalCode !== 'string') {
        return false;
    }
    
    // Expresiones regulares para diferentes formatos postales en el mundo
    const patterns = [
        // Estados Unidos: 5 dígitos (o 5+4 con guión)
        /^\d{5}(-\d{4})?$/,
        
        // Canadá: A1A 1A1 (alterna letra-número con espacio opcional)
        /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,
        
        // Reino Unido: Formato complejo con varias variantes
        /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i,
        
        // Australia: 4 dígitos
        /^\d{4}$/,
        
        // Alemania, Austria: 5 dígitos
        /^\d{5}$/,
        
        // Francia: 5 dígitos
        /^\d{5}$/,
        
        // Italia: 5 dígitos
        /^\d{5}$/,
        
        // España: 5 dígitos
        /^\d{5}$/,
        
        // Países Bajos: 4 dígitos + 2 letras (1111 AB)
        /^\d{4}\s*[A-Z]{2}$/i,
        
        // Brasil: 5 dígitos + guión + 3 dígitos
        /^\d{5}-\d{3}$/,
        
        // Argentina: Una letra + 4 dígitos + 3 letras
        /^[A-Z]\d{4}[A-Z]{3}$/i,
        
        // México: 5 dígitos
        /^\d{5}$/,
        
        // India: 6 dígitos
        /^\d{6}$/,
        
        // China: 6 dígitos
        /^\d{6}$/,
        
        // Japón: 3 dígitos + guión + 4 dígitos
        /^\d{3}-\d{4}$/,
        
        // Corea del Sur: 5 dígitos (o 3+3)
        /^\d{5}$/,
        /^\d{3}-\d{3}$/,
        
        // Rusia: 6 dígitos
        /^\d{6}$/,
        
        // Suecia: 3 dígitos + espacio + 2 dígitos
        /^\d{3}\s\d{2}$/,
        
        // Suiza: 4 dígitos
        /^\d{4}$/,
        
        // Dinamarca, Noruega: 4 dígitos
        /^\d{4}$/,
        
        // Finlandia: 5 dígitos
        /^\d{5}$/,
        
        // Portugal: 4 dígitos + guión + 3 dígitos
        /^\d{4}-\d{3}$/,
        
        // Irlanda: Formato complejo (podría ser similar al UK)
        /^[A-Z]\d{1,2}\s\d[A-Z]{2}$/i,
        
        // Nueva Zelanda: 4 dígitos
        /^\d{4}$/,
        
        // Israel: 5 o 7 dígitos
        /^\d{5}$/,
        /^\d{7}$/,
        
        // Turquía: 5 dígitos
        /^\d{5}$/,
        
        // Polonia: 2 dígitos + guión + 3 dígitos
        /^\d{2}-\d{3}$/,
        
        // República Checa, Eslovaquia: 3 dígitos + espacio + 2 dígitos
        /^\d{3}\s\d{2}$/,
        
        // Hungría: 4 dígitos
        /^\d{4}$/,
        
        // Grecia: 3 dígitos + espacio + 2 dígitos
        /^\d{3}\s\d{2}$/,
        
        // Sudáfrica: 4 dígitos
        /^\d{4}$/,
        
        // Chile: 7 dígitos
        /^\d{7}$/,
        
        // Colombia: 6 dígitos
        /^\d{6}$/,
        
        // Perú: 5 dígitos
        /^\d{5}$/,
        
        // Venezuela: 4 dígitos
        /^\d{4}$/,
        
        // Ecuador: 6 dígitos
        /^\d{6}$/,
        
        // Uruguay: 5 dígitos
        /^\d{5}$/,
        
        // Paraguay: 4 dígitos
        /^\d{4}$/,
        
        // Bolivia: 4 dígitos
        /^\d{4}$/,
        
        // Costa Rica: 5 dígitos
        /^\d{5}$/,
        
        // Panamá: Formato variado (4 dígitos o 6 con guión)
        /^\d{4}$/,
        /^\d{6}$/,
        /^\d{4}-\d{3}$/,
        
        // República Dominicana: 5 dígitos
        /^\d{5}$/,
        
        // Guatemala: 5 dígitos
        /^\d{5}$/,
        
        // El Salvador: 4 dígitos
        /^\d{4}$/,
        
        // Honduras: 5 dígitos
        /^\d{5}$/,
        
        // Nicaragua: 5 dígitos
        /^\d{5}$/,
        
        // Cuba: 5 dígitos
        /^\d{5}$/,
        
        // Puerto Rico: 5 dígitos (mismo formato US)
        /^\d{5}(-\d{4})?$/
    ];
    
    // Normalizar: quitar espacios al inicio y final, convertir a mayúsculas
    const normalizedCode = postalCode.trim().toUpperCase();
    
    // Verificar longitud mínima y máxima razonable para códigos postales
    if (normalizedCode.length < 2 || normalizedCode.length > 10) {
        return false;
    }
    
    // Verificar si coincide con algún patrón conocido
    for (const pattern of patterns) {
        if (pattern.test(normalizedCode)) {
            return true;
        }
    }
    
    // Si no coincide con ningún patrón conocido, verificar formatos genéricos
    const genericPatterns = [
        // Secuencia de solo dígitos (3-7 dígitos)
        /^\d{3,7}$/,
        
        // Secuencia de dígitos con posible guión en medio
        /^\d{3,5}-\d{2,4}$/,
        
        // Combinación de letras y números (formato común en varios países)
        /^[A-Z\d]{4,8}$/i,
        
        // Patrón con letra, número, letra (formato básico internacional)
        /^[A-Z]+\d+[A-Z]*$/i,
        /^\d+[A-Z]+\d*$/i
    ];
    
    for (const pattern of genericPatterns) {
        if (pattern.test(normalizedCode)) {
            return true;
        }
    }
    
    // Si no coincide con nada, probablemente no es válido
    return false;
}
