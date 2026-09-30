function validate(codigo) {
    // Verificar que el argumento sea un string
    if (typeof codigo !== 'string') {
        return false;
    }
    
    // Eliminar espacios al principio y al final
    const codigoLimpio = codigo.trim();
    
    /* 
    Criterios para un código postal válido:
    1. Longitud exacta de 5 caracteres
    2. Todos los caracteres deben ser dígitos numéricos
    3. No puede empezar por 0 (dependiendo del país, esto puede variar,
       pero para este caso asumimos que no puede empezar por 0)
    */
    
    // Verificar longitud exacta de 5 caracteres
    if (codigoLimpio.length !== 5) {
        return false;
    }
    
    // Verificar que todos los caracteres sean dígitos
    if (!/^\d+$/.test(codigoLimpio)) {
        return false;
    }
    
    // Verificar que no empiece por 0
    if (codigoLimpio[0] === '0') {
        return false;
    }
    
    // Verificar que el código postal no sea todos los mismos dígitos
    // (esto podría ser una dirección inválida en muchos sistemas)
    const todosIguales = /^(\d)\1+$/.test(codigoLimpio);
    if (todosIguales) {
        return false;
    }
    
    // Si pasa todas las validaciones, es válido
    return true;
}
