function validate(apellido) {
    // Verificar que el argumento sea un string
    if (typeof apellido !== 'string') {
        return false;
    }
    
    // Eliminar espacios en blanco al principio y final
    const apellidoTrimmed = apellido.trim();
    
    // Un apellido no debe estar vacío después de trim
    if (apellidoTrimmed.length === 0) {
        return false;
    }
    
    // Longitud mínima y máxima razonable para un apellido
    if (apellidoTrimmed.length < 2 || apellidoTrimmed.length > 50) {
        return false;
    }
    
    // Permitir letras (incluyendo acentos y ñ), espacios, guiones y apóstrofes
    // pero no como primer o último carácter, y no consecutivos
    const apellidoValidoRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÀÈÌÒÙàèìòùÄËÏÖÜäëïöüÇç']+([ -][A-Za-zÁÉÍÓÚáéíóúÑñÀÈÌÒÙàèìòùÄËÏÖÜäëïöüÇç']+)*$/;
    
    if (!apellidoValidoRegex.test(apellidoTrimmed)) {
        return false;
    }
    
    // No permitir que todos los caracteres sean el mismo (ej: "aaaa")
    const primerCaracter = apellidoTrimmed[0].toLowerCase();
    const todosIguales = apellidoTrimmed.split('').every(caracter => 
        caracter.toLowerCase() === primerCaracter || 
        caracter === ' ' || 
        caracter === '-' || 
        caracter === "'"
    );
    
    if (todosIguales) {
        return false;
    }
    
    // No permitir caracteres especiales repetidos consecutivamente
    if (/([' -])\1/.test(apellidoTrimmed)) {
        return false;
    }
    
    // Verificar que al menos haya una letra (no solo espacios/guiones/apóstrofes)
    const tieneLetras = /[A-Za-zÁÉÍÓÚáéíóúÑñÀÈÌÒÙàèìòùÄËÏÖÜäëïöüÇç]/.test(apellidoTrimmed);
    if (!tieneLetras) {
        return false;
    }
    
    return true;
}
