function validate(apellido) {
    // Verificar que el argumento sea un string
    if (typeof apellido !== 'string') {
        return false;
    }

    // Verificar longitud mínima y máxima
    if (apellido.length < 2 || apellido.length > 50) {
        return false;
    }

    // Verificar que no comience o termine con espacios, guiones o apóstrofes
    if (/^[\s\-']|[\s\-']$/.test(apellido)) {
        return false;
    }

    // Verificar que no tenga espacios, guiones o apóstrofes consecutivos
    if (/[\s\-']{2,}/.test(apellido)) {
        return false;
    }

    // Patrón principal: letras, espacios, guiones y apóstrofes permitidos
    // pero con restricciones adicionales
    const patron = /^[A-Za-zÁáÉéÍíÓóÚúÑñÜü]+(?:[ '\-][A-Za-zÁáÉéÍíÓóÚúÑñÜü]+)*$/;
    
    return patron.test(apellido);
}
