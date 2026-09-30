function validate(codigo) {
    // Verificar que el argumento sea un string
    if (typeof codigo !== 'string') {
        return false;
    }
    
    // Patrón para códigos postales españoles (5 dígitos, ej: 28001)
    const patronEspanol = /^[0-9]{5}$/;
    
    // Patrón para códigos postales mexicanos (5 dígitos, ej: 03100)
    const patronMexicano = /^[0-9]{5}$/;
    
    // Patrón para códigos postales argentinos (4 dígitos, ej: C1430)
    const patronArgentino = /^[A-Za-z]?[0-9]{4}[A-Za-z]{0,3}$/;
    
    // Patrón para códigos postales colombianos (6 dígitos, ej: 110111)
    const patronColombiano = /^[0-9]{6}$/;
    
    // Patrón para códigos postales estadounidenses (5 dígitos o 5+4: 90210 o 90210-1234)
    const patronEstadounidense = /^[0-9]{5}(-[0-9]{4})?$/;
    
    // Patrón para códigos postales canadienses (A1A 1A1 formato)
    const patronCanadiense = /^[A-Za-z][0-9][A-Za-z][ ]?[0-9][A-Za-z][0-9]$/;
    
    // Patrón para códigos postales británicos (formato complejo, ej: SW1A 1AA)
    const patronBritanico = /^[A-Z]{1,2}[0-9][A-Z0-9]?[ ]?[0-9][A-Z]{2}$/i;
    
    // Patrón para códigos postales franceses (5 dígitos, ej: 75001)
    const patronFrances = /^[0-9]{5}$/;
    
    // Patrón para códigos postales alemanes (5 dígitos, ej: 10115)
    const patronAleman = /^[0-9]{5}$/;
    
    // Combinar todos los patrones en una expresión regular
    const patrones = [
        patronEspanol,
        patronMexicano,
        patronArgentino,
        patronColombiano,
        patronEstadounidense,
        patronCanadiense,
        patronBritanico,
        patronFrances,
        patronAleman
    ];
    
    // Verificar si el código postal coincide con algún patrón
    for (let patron of patrones) {
        if (patron.test(codigo.trim())) {
            return true;
        }
    }
    
    return false;
}
