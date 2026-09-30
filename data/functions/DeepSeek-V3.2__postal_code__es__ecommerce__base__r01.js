function validate(codigo) {
    // Verificar que el argumento sea string
    if (typeof codigo !== 'string') {
        return false;
    }
    
    // Eliminar espacios al inicio y final
    const codigoLimpio = codigo.trim();
    
    // Para España: 5 dígitos exactos (ej: 28001, 08020)
    const regexEspana = /^\d{5}$/;
    
    // Para México: 5 dígitos exactos (ej: 03100, 44160)
    const regexMexico = /^\d{5}$/;
    
    // Para Argentina: 4 dígitos exactos (ej: 1636, 1000)
    const regexArgentina = /^\d{4}$/;
    
    // Para Colombia: 6 dígitos exactos (ej: 110111, 050001)
    const regexColombia = /^\d{6}$/;
    
    // Para Chile: 7 dígitos exactos (ej: 8320000, 7500000)
    const regexChile = /^\d{7}$/;
    
    // Para Estados Unidos: 5 dígitos o 5+4 (ej: 90210, 90210-1234)
    const regexUSA = /^\d{5}(-\d{4})?$/;
    
    // Para Canadá: formato A1A 1A1 (ej: K1A 0B1, M5V 2T6)
    const regexCanada = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    
    // Para Reino Unido: formatos variados (ej: SW1A 1AA, M1 1AA, B33 8TH)
    const regexUK = /^[A-Za-z]{1,2}\d[A-Za-z\d]?[ -]?\d[A-Za-z]{2}$/;
    
    // Verificar si coincide con alguno de los formatos comunes
    return regexEspana.test(codigoLimpio) ||
           regexMexico.test(codigoLimpio) ||
           regexArgentina.test(codigoLimpio) ||
           regexColombia.test(codigoLimpio) ||
           regexChile.test(codigoLimpio) ||
           regexUSA.test(codigoLimpio) ||
           regexCanada.test(codigoLimpio) ||
           regexUK.test(codigoLimpio.toUpperCase());
}
