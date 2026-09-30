function validate(nombre) {
    // Validar que sea un string y no esté vacío
    if (typeof nombre !== 'string' || nombre.trim() === '') {
        return false;
    }
    
    // Eliminar espacios al inicio y final
    const nombreLimpio = nombre.trim();
    
    // Validar longitud mínima (al menos 2 caracteres)
    if (nombreLimpio.length < 2) {
        return false;
    }
    
    // Validar longitud máxima (razonable para nombres)
    if (nombreLimpio.length > 50) {
        return false;
    }
    
    // Validar que solo contenga letras, espacios, guiones, apóstrofes o puntos
    // Permitimos caracteres acentuados y letras de diferentes alfabetos
    const regexNombre = /^[\p{L}][\p{L}\s'.-]*$/u;
    if (!regexNombre.test(nombreLimpio)) {
        return false;
    }
    
    // Validar que no empiece ni termine con caracteres especiales (excepto letras)
    if (/^[\s'.-]|[\s'.-]$/.test(nombreLimpio)) {
        return false;
    }
    
    // Validar que no tenga múltiples espacios consecutivos o caracteres especiales repetidos
    if (/\s{2,}|['.-]{2,}/.test(nombreLimpio)) {
        return false;
    }
    
    // Validar que no contenga solo letras repetidas (ej: "aa", "bbb")
    if (/^(.)\1+$/.test(nombreLimpio.replace(/[\s'.-]/g, ''))) {
        return false;
    }
    
    // Validar que tenga al menos una vocal (para evitar cadenas como "bcdfg")
    // Esto es opcional pero ayuda a evitar entradas no válidas
    const tieneVocal = /[aeiouáéíóúàèìòùäëïöüâêîôûæøå]/i.test(nombreLimpio);
    if (!tieneVocal) {
        // Algunos nombres pueden no tener vocales (ej: "Lyn" en inglés, "Ng" en chino)
        // Podríamos omitir esta validación, pero la incluimos como ejemplo
        // En un caso real, habría que considerar nombres de diferentes culturas
    }
    
    // Validar que no sea un número
    if (!isNaN(nombreLimpio) && nombreLimpio.trim() !== '') {
        return false;
    }
    
    // Lista de nombres prohibidos o inválidos
    const nombresInvalidos = [
        'admin', 'administrador', 'root', 'usuario', 'user', 'test', 
        'prueba', 'invitado', 'guest', 'null', 'undefined', 'anonimo',
        'anónimo', 'ninguno', 'none', 'nombre', 'name', 'falso', 'false'
    ];
    
    if (nombresInvalidos.includes(nombreLimpio.toLowerCase())) {
        return false;
    }
    
    // Validar que no contenga palabras prohibidas
    const palabrasProhibidas = ['http', 'www', '.com', '.net', '.org', 'select', 'insert', 'delete', 'update', 'drop', 'script', '<', '>'];
    const nombreMinusculas = nombreLimpio.toLowerCase();
    
    for (const palabra of palabrasProhibidas) {
        if (nombreMinusculas.includes(palabra)) {
            return false;
        }
    }
    
    // Si pasó todas las validaciones, es válido
    return true;
}
