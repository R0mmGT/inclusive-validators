function validate(direccion) {
    // Verificar que el argumento es un string
    if (typeof direccion !== 'string') {
        return false;
    }
    
    // Eliminar espacios en blanco al inicio y final
    const direccionLimpia = direccion.trim();
    
    // Longitud mínima y máxima razonable para una dirección
    if (direccionLimpia.length < 5 || direccionLimpia.length > 100) {
        return false;
    }
    
    // Debe contener al menos un número (para el número de calle)
    const contieneNumero = /\d/.test(direccionLimpia);
    if (!contieneNumero) {
        return false;
    }
    
    // Debe contener al menos una letra (para el nombre de la calle)
    const contieneLetra = /[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(direccionLimpia);
    if (!contieneLetra) {
        return false;
    }
    
    // No debe contener caracteres peligrosos o no apropiados para direcciones
    // Permitimos: letras, números, espacios, puntos, comas, guiones, hashtag (para número interior), /, barras invertidas, y algunos caracteres especiales comunes
    const caracteresValidos = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\.,#\-/\\'"°ºª()&]+$/;
    if (!caracteresValidos.test(direccionLimpia)) {
        return false;
    }
    
    // No debe ser solo números y espacios
    const soloNumerosYEspacios = /^[\d\s]+$/.test(direccionLimpia);
    if (soloNumerosYEspacios) {
        return false;
    }
    
    // Verificar que no tenga múltiples espacios consecutivos (demasiados)
    const multiplesEspacios = /\s{3,}/.test(direccionLimpia);
    if (multiplesEspacios) {
        return false;
    }
    
    // Debe tener un formato básico de dirección:
    // Al menos un número seguido o precedido por texto (ej: "Calle 123" o "123 Main St")
    const formatoDireccion = /(\d+\s*[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)|([a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s*\d+)/;
    if (!formatoDireccion.test(direccionLimpia)) {
        return false;
    }
    
    // Verificar que no sea una palabra comúnmente usada en testing o ejemplos
    const palabrasProhibidas = ['test', 'prueba', 'ejemplo', 'falso', 'fake', 'abc', 'aaa', 'xxx', '123456'];
    const direccionMinusculas = direccionLimpia.toLowerCase();
    for (const palabra of palabrasProhibidas) {
        // Verificar si la palabra prohibida aparece como palabra completa
        const regex = new RegExp(`\\b${palabra}\\b`, 'i');
        if (regex.test(direccionLimpia)) {
            return false;
        }
    }
    
    // Verificar que tenga al menos dos "palabras" (tokens) después de dividir por espacios
    const tokens = direccionLimpia.split(/\s+/).filter(token => token.length > 0);
    if (tokens.length < 2) {
        return false;
    }
    
    return true;
}
