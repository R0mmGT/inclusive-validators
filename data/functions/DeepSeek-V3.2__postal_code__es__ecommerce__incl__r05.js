function validate(codigoPostal) {
    // Verificar que el argumento sea un string
    if (typeof codigoPostal !== 'string') {
        return false;
    }
    
    // Limpiar espacios al inicio y final
    const codigoLimpio = codigoPostal.trim();
    
    // Verificar longitud básica (la mayoría de códigos postales tienen entre 2 y 10 caracteres)
    if (codigoLimpio.length < 2 || codigoLimpio.length > 10) {
        return false;
    }
    
    // Patrones para diferentes formatos de códigos postales alrededor del mundo
    const patrones = [
        // Estados Unidos: 5 dígitos o 5+4 dígitos (ZIP+4)
        /^\d{5}(-\d{4})?$/,
        
        // Canadá: A1A 1A1 (alternando letra, dígito, letra, espacio, dígito, letra, dígito)
        /^[A-Z]\d[A-Z] \d[A-Z]\d$/i,
        
        // México: 5 dígitos
        /^\d{5}$/,
        
        // Reino Unido: varias formas como AA9A 9AA, A9A 9AA, A9 9AA, A99 9AA, AA9 9AA, AA99 9AA
        /^(GIR 0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|[A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))|[0-9][A-HJKS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})$/i,
        
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
        
        // Brasil: 5 dígitos + guión + 3 dígitos (opcional)
        /^\d{5}-\d{3}$/,
        
        // Argentina: 4 dígitos, a veces con letra opcional
        /^[A-Z]?\d{4}[A-Z]?$/i,
        
        // Colombia: 6 dígitos
        /^\d{6}$/,
        
        // Chile: 7 dígitos
        /^\d{7}$/,
        
        // India: 6 dígitos
        /^\d{6}$/,
        
        // China: 6 dígitos
        /^\d{6}$/,
        
        // Japón: 3 dígitos + guión + 4 dígitos
        /^\d{3}-\d{4}$/,
        
        // Corea del Sur: 5 dígitos o 3 dígitos + guión + 3 dígitos
        /^(\d{5}|\d{3}-\d{3})$/,
        
        // Rusia: 6 dígitos
        /^\d{6}$/,
        
        // Suecia: 3 dígitos + espacio + 2 dígitos
        /^\d{3} \d{2}$/,
        
        // Países Bajos: 4 dígitos + 2 letras (espacio opcional)
        /^\d{4} ?[A-Z]{2}$/i,
        
        // Formato genérico para muchos países: solo dígitos (4-7 dígitos)
        /^\d{4,7}$/,
        
        // Formato genérico: letras y dígitos mezclados (común en países angloparlantes)
        /^[A-Z0-9][A-Z0-9\- ]{0,8}[A-Z0-9]$/i
    ];
    
    // Probar cada patrón
    for (const patron of patrones) {
        if (patron.test(codigoLimpio)) {
            return true;
        }
    }
    
    // Si no coincide con ningún patrón conocido
    return false;
}
