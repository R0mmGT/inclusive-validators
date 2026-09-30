function validate(codigo) {
    // Verificar que el argumento sea un string
    if (typeof codigo !== 'string') {
        return false;
    }

    // Patrón para códigos postales españoles: 5 dígitos
    const patron = /^\d{5}$/;
    
    // Verificar si el string cumple con el patrón
    if (!patron.test(codigo)) {
        return false;
    }

    // Extraer los dos primeros dígitos (provincia)
    const provincia = parseInt(codigo.substring(0, 2));
    
    // En España, los códigos postales van de 01001 a 52999
    // 00 no es válido, 01-52 son válidos (Ceuta: 51, Melilla: 52)
    // Los códigos que empiezan por 53 o más no son válidos actualmente
    if (provincia === 0 || provincia > 52) {
        return false;
    }

    // Los últimos 3 dígitos deben ser mayores que 0
    const resto = parseInt(codigo.substring(2));
    if (resto === 0) {
        return false;
    }

    return true;
}
