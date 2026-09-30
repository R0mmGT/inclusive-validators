function validate(codigo) {
    // Verificar que el argumento sea un string
    if (typeof codigo !== 'string') {
        return false;
    }
    
    // Patrón para códigos postales españoles: 5 dígitos
    const patron = /^[0-9]{5}$/;
    
    // Verificar que cumple el patrón
    if (!patron.test(codigo)) {
        return false;
    }
    
    // Extraer los dos primeros dígitos (provincia)
    const provincia = parseInt(codigo.substring(0, 2));
    
    // Validar rango de provincias españolas (01 a 52)
    // 01-50: provincias peninsulares e insulares
    // 51-52: Ceuta y Melilla
    if (provincia < 1 || provincia > 52) {
        return false;
    }
    
    // Casos especiales:
    // - 00 no es válido (provincia 0)
    // - 53-99 no son provincias españolas
    
    return true;
}
