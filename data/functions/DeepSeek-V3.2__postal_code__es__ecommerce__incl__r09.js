function validate(codigoPostal) {
    // Verificar que el argumento sea un string
    if (typeof codigoPostal !== 'string') {
        return false;
    }
    
    // Eliminar espacios al inicio y final, y normalizar
    const cp = codigoPostal.trim().replace(/\s+/g, ' ');
    
    // Casos especiales que deben ser válidos
    if (cp === '') {
        return false; // Cadena vacía no es válida
    }
    
    // Patrones comunes de códigos postales en diferentes países
    const patrones = [
        // Estados Unidos: 5 dígitos o 5+4 (ZIP+4)
        /^\d{5}(-\d{4})?$/,
        
        // Canadá: A1A 1A1 (formato alternativo A1A1A1 también aceptado)
        /^[A-Z]\d[A-Z][ -]?\d[A-Z]\d$/i,
        
        // México: 5 dígitos
        /^\d{5}$/,
        
        // Reino Unido: múltiples formatos como AA9A 9AA, A9A 9AA, A9 9AA, A99 9AA, AA9 9AA, AA99 9AA
        /^[A-Z]{1,2}\d[A-Z\d]?[ -]?\d[A-Z]{2}$/i,
        
        // Australia: 4 dígitos
        /^\d{4}$/,
        
        // Alemania: 5 dígitos
        /^\d{5}$/,
        
        // Francia: 5 dígitos
        /^\d{5}$/,
        
        // España: 5 dígitos
        /^\d{5}$/,
        
        // Italia: 5 dígitos
        /^\d{5}$/,
        
        // Brasil: 5 dígitos-3 dígitos
        /^\d{5}-\d{3}$/,
        
        // Argentina: 4 dígitos o 4 dígitos con letra opcional
        /^\d{4}[A-Z]?$/,
        
        // Japón: 3 dígitos-4 dígitos
        /^\d{3}-\d{4}$/,
        
        // China: 6 dígitos
        /^\d{6}$/,
        
        // India: 6 dígitos
        /^\d{6}$/,
        
        // Rusia: 6 dígitos
        /^\d{6}$/,
        
        // Corea del Sur: 5 dígitos o 3 dígitos-3 dígitos
        /^(\d{5}|\d{3}-\d{3})$/,
        
        // Países con formatos de 4 dígitos (Austria, Bélgica, Dinamarca, etc.)
        /^\d{4}$/,
        
        // Países con formatos de 3 dígitos (Islandia)
        /^\d{3}$/,
        
        // Países con letras y números como Holanda: 4 dígitos, 2 letras (opcional espacio)
        /^\d{4}[ ]?[A-Z]{2}$/i,
        
        // Irlanda: formato complejo, aceptamos varios patrones comunes
        /^[A-Z]\d{1,2}[ ]?\d{1,2}[A-Z]{2}$/i,
        
        // Suecia: 3 dígitos espacio 2 dígitos
        /^\d{3}[ ]?\d{2}$/,
        
        // Noruega: 4 dígitos
        /^\d{4}$/,
        
        // Finlandia: 5 dígitos
        /^\d{5}$/,
        
        // Portugal: 4 dígitos-3 dígitos
        /^\d{4}-\d{3}$/,
        
        // Polonia: 2 dígitos-3 dígitos
        /^\d{2}-\d{3}$/,
        
        // República Checa: 3 dígitos espacio 2 dígitos
        /^\d{3}[ ]?\d{2}$/,
        
        // Chile: 7 dígitos (a veces con guión después de los primeros 3)
        /^\d{7}$|^\d{3}-\d{4}$/,
        
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
        
        // Formato genérico para códigos alfanuméricos (útil para países no cubiertos)
        /^[A-Z0-9][A-Z0-9\s\-]{3,10}[A-Z0-9]$/i
    ];
    
    // Comprobar si coincide con al menos un patrón
    for (let patron of patrones) {
        if (patron.test(cp)) {
            return true;
        }
    }
    
    // Si no coincide con ningún patrón, verificar si es un código postal numérico simple
    // (muchos países usan solo números entre 3 y 7 dígitos)
    if (/^\d{3,7}$/.test(cp)) {
        return true;
    }
    
    return false;
}
