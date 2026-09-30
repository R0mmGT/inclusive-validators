function validate(codigoPostal) {
    // Verificar que el argumento sea un string
    if (typeof codigoPostal !== 'string') {
        return false;
    }
    
    // Eliminar espacios al principio y al final
    const codigoLimpio = codigoPostal.trim();
    
    // Longitud mínima y máxima general para códigos postales internacionales
    if (codigoLimpio.length < 3 || codigoLimpio.length > 10) {
        return false;
    }
    
    // Validar que solo contenga caracteres alfanuméricos y guiones/espacios permitidos
    // Patrón: números, letras, espacios y guiones (pero no dos guiones seguidos)
    const patronBasico = /^[a-zA-Z0-9]+(?:[ -]?[a-zA-Z0-9]+)*$/;
    
    if (!patronBasico.test(codigoLimpio)) {
        return false;
    }
    
    // Validaciones específicas por formato común
    
    // Formato numérico simple (ej: España, USA básico): solo números
    const soloNumeros = /^\d+$/;
    if (soloNumeros.test(codigoLimpio)) {
        // Si es solo números, verificar longitud típica (entre 4 y 6 dígitos)
        return codigoLimpio.length >= 4 && codigoLimpio.length <= 6;
    }
    
    // Formato con letras y números (ej: Canadá: A1A 1A1, UK: AA1 1AA)
    const conLetras = /[a-zA-Z]/;
    if (conLetras.test(codigoLimpio)) {
        // Eliminar espacios y guiones para validación de estructura
        const sinSeparadores = codigoLimpio.replace(/[ -]/g, '');
        
        // Patrones comunes internacionales
        const patrones = [
            /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/, // Canadá: A1A1A1
            /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/, // UK: AA1 1AA
            /^[A-Za-z]{2}\d{4}$/, // Argentina: B1636FDA
            /^\d{4}[A-Za-z]{2}$/  // Países Bajos: 1234AB
        ];
        
        // Verificar si coincide con alguno de los patrones comunes
        for (const patron of patrones) {
            if (patron.test(sinSeparadores)) {
                return true;
            }
        }
        
        // Si tiene letras pero no coincide con patrones conocidos,
        // verificar estructura general
        const patronGeneralLetras = /^[A-Za-z0-9]{4,8}$/;
        return patronGeneralLetras.test(sinSeparadores);
    }
    
    // Si llega aquí, es un código numérico con separadores
    // Remover separadores y verificar que sea numérico
    const soloDigitos = codigoLimpio.replace(/[ -]/g, '');
    return soloDigitos.length >= 4 && soloDigitos.length <= 6 && /^\d+$/.test(soloDigitos);
}
