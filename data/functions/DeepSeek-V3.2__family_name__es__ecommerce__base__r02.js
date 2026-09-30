function validate(apellido) {
    // Validar que el argumento sea un string
    if (typeof apellido !== 'string') {
        return false;
    }

    // Eliminar espacios en blanco al inicio y final
    apellido = apellido.trim();
    
    // Validar longitud mínima y máxima (1-50 caracteres)
    if (apellido.length < 1 || apellido.length > 50) {
        return false;
    }

    // Validar que no contenga solo espacios en blanco
    if (apellido === '') {
        return false;
    }

    // Validar caracteres permitidos: letras, espacios, guiones, apóstrofes y diacríticos
    // Se permiten letras acentuadas y letras de alfabetos latinos extendidos
    const patronValido = /^[A-Za-zÁáÀàÄäÂâÉéÈèËëÊêÍíÌìÏïÎîÓóÒòÖöÔôÚúÙùÜüÛûÑñÇçŸÿÆæŒœßØøÅåÆæ\s\-']+$/;
    
    if (!patronValido.test(apellido)) {
        return false;
    }

    // Validar que no empiece o termine con espacio, guion o apóstrofe
    if (/^[\s\-']|[\s\-']$/.test(apellido)) {
        return false;
    }

    // Validar que no tenga guiones o apóstrofes consecutivos
    if (/[\-']{2,}/.test(apellido)) {
        return false;
    }

    // Validar que no tenga solo un carácter (excepto si es una letra válida)
    if (apellido.length === 1 && !/^[A-Za-zÁáÀàÄäÂâÉéÈèËëÊêÍíÌìÏïÎîÓóÒòÖöÔôÚúÙùÜüÛûÑñÇçŸÿÆæŒœßØøÅå]$/.test(apellido)) {
        return false;
    }

    // Validar que tenga al menos una letra (no solo símbolos)
    if (!/[A-Za-zÁáÀàÄäÂâÉéÈèËëÊêÍíÌìÏïÎîÓóÒòÖöÔôÚúÙùÜüÛûÑñÇçŸÿÆæŒœßØøÅå]/.test(apellido)) {
        return false;
    }

    // Validar uso razonable de mayúsculas/minúsculas
    // Permitir cualquier combinación pero verificar casos extremos
    // Por ejemplo, no permitir TODO MAYÚSCULAS (a menos que sea muy corto)
    if (apellido.length > 2 && apellido === apellido.toUpperCase()) {
        // Los apellidos cortos como "DE" o "LA" pueden estar en mayúsculas
        const apellidosCortosPermitidos = ['DE', 'LA', 'LE', 'DI', 'DA', 'DEL', 'LOS', 'LAS', 'VAN', 'VON', 'SAN', 'SANTA'];
        if (!apellidosCortosPermitidos.includes(apellido)) {
            return false;
        }
    }

    // Validar nombres compuestos (permitir un máximo de 3 partes)
    const partes = apellido.split(/[\s\-']+/).filter(part => part.length > 0);
    if (partes.length > 4) { // Máximo 4 partes (ej: "De la Cruz Sánchez")
        return false;
    }

    // Cada parte debe comenzar con una letra
    for (let parte of partes) {
        if (!/^[A-Za-zÁáÀàÄäÂâÉéÈèËëÊêÍíÌìÏïÎîÓóÒòÖöÔôÚúÙùÜüÛûÑñÇçŸÿÆæŒœßØøÅå]/.test(parte)) {
            return false;
        }
    }

    // Validar apellidos específicos que queremos excluir (ejemplos ofensivos o inválidos)
    const apellidosInvalidos = [
        'INVALIDO', 'TEST', 'ADMIN', 'ROOT', 'NULL', 'UNDEFINED', 
        'ANONIMO', 'ANONYMOUS', 'XXXX', 'AAAA', 'ABCDEF'
    ];
    
    if (apellidosInvalidos.includes(apellido.toUpperCase())) {
        return false;
    }

    return true;
}
