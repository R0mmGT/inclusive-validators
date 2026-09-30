function validate(codigo) {
    // Verificar que el argumento sea un string
    if (typeof codigo !== 'string') {
        return false;
    }
    
    // Eliminar espacios al principio y al final
    const codigoLimpio = codigo.trim();
    
    // Patrones para diferentes formatos de códigos postales
    
    // España: 5 dígitos (01001-52999)
    const esPattern = /^(0[1-9][0-9]{3}|[1-4][0-9]{4}|5[0-2][0-9]{3})$/;
    
    // México: 5 dígitos (01000-99999)
    const mxPattern = /^[0-9]{5}$/;
    
    // Argentina: 4 dígitos, a veces con letra al final (A1601, B1636)
    const arPattern = /^[A-Z]?[0-9]{4}[A-Z]?$/;
    
    // Chile: 7 dígitos (1234567)
    const clPattern = /^[0-9]{7}$/;
    
    // Colombia: 6 dígitos (110010)
    const coPattern = /^[0-9]{6}$/;
    
    // Estados Unidos: 5 dígitos o 5+4 (12345 o 12345-6789)
    const usPattern = /^[0-9]{5}(-[0-9]{4})?$/;
    
    // Canadá: A1A 1A1 (alternando letra, número, letra, espacio, número, letra, número)
    const caPattern = /^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$/;
    
    // Patrón general: al menos 4 caracteres alfanuméricos
    const generalPattern = /^[A-Z0-9 -]{4,10}$/i;
    
    // Verificar longitud básica
    if (codigoLimpio.length < 4 || codigoLimpio.length > 10) {
        return false;
    }
    
    // Verificar patrón general
    if (!generalPattern.test(codigoLimpio)) {
        return false;
    }
    
    // Verificar al menos uno de los patrones específicos
    return esPattern.test(codigoLimpio) ||
           mxPattern.test(codigoLimpio) ||
           arPattern.test(codigoLimpio.toUpperCase()) ||
           clPattern.test(codigoLimpio) ||
           coPattern.test(codigoLimpio) ||
           usPattern.test(codigoLimpio) ||
           caPattern.test(codigoLimpio.toUpperCase());
}
