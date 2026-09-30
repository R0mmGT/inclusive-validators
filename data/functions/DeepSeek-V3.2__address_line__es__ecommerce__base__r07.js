function validate(direccion) {
    // Verificar que el argumento sea un string
    if (typeof direccion !== 'string') {
        return false;
    }

    // Eliminar espacios en blanco al inicio y final
    const direccionLimpia = direccion.trim();

    // Verificar longitud mínima y máxima razonable
    if (direccionLimpia.length < 5 || direccionLimpia.length > 100) {
        return false;
    }

    // Verificar que contenga al menos un número (para dirección/número)
    const contieneNumero = /\d/.test(direccionLimpia);
    if (!contieneNumero) {
        return false;
    }

    // Verificar que contenga al menos una letra (para nombre de calle)
    const contieneLetra = /[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(direccionLimpia);
    if (!contieneLetra) {
        return false;
    }

    // Patrón básico para direcciones (permite varios formatos comunes)
    const patronesValidos = [
        // Formato: "Calle/Nombre + número + posible piso/depto"
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.\-]+ \d+[a-zA-Z0-9\-\/\sºª]*$/,
        // Formato: "Número + Calle/Nombre" (menos común pero válido)
        /^\d+[a-zA-Z0-9\-\/\sºª]* [a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.\-]+$/,
        // Formato con abreviaturas comunes (Av., C/, Pza., etc.)
        /^(Av\.|Avenida|C\/|Calle|Plaza|Pza\.|Paseo|Ps\.|Camino|Ctra\.|Carretera) [a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.\-]+ \d+[a-zA-Z0-9\-\/\sºª]*$/i,
        // Formato con número interior, piso o depto
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.\-]+ \d+[\s\-]*[a-zA-Z0-9\-\/\sºª]+$/
    ];

    // Verificar si coincide con al menos un patrón válido
    const esValida = patronesValidos.some(patron => patron.test(direccionLimpia));

    // Verificar caracteres no permitidos (símbolos extraños)
    const caracteresInvalidos = /[<>{}[\]$%&=¿?¡!@#^*_+\\|~`]/;
    if (caracteresInvalidos.test(direccionLimpia)) {
        return false;
    }

    // Verificar que no sea solo números
    if (/^\d+$/.test(direccionLimpia.replace(/\s/g, ''))) {
        return false;
    }

    return esValida;
}
