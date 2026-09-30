function validate(nombreCompleto) {
    // Verificar que el argumento sea un string
    if (typeof nombreCompleto !== 'string') {
        return false;
    }
    
    // Eliminar espacios al inicio y final
    const nombreTrimmed = nombreCompleto.trim();
    
    // Verificar que no esté vacío después del trim
    if (nombreTrimmed.length === 0) {
        return false;
    }
    
    // Dividir por espacios y filtrar cadenas vacías (por si hay múltiples espacios)
    const partes = nombreTrimmed.split(' ').filter(parte => parte.length > 0);
    
    // Un nombre completo válido debe tener al menos dos partes (nombre y apellido)
    if (partes.length < 2) {
        return false;
    }
    
    // Cada parte debe:
    // 1. Empezar con mayúscula
    // 2. Seguirse de letras minúsculas (permite nombres como "María" o "Jean-Pierre")
    // 3. Puede contener guiones, apóstrofes o puntos para nombres compuestos
    for (const parte of partes) {
        // Verificar que la primera letra sea mayúscula
        if (!/^[A-ZÁÉÍÓÚÑÜ]/.test(parte)) {
            return false;
        }
        
        // Verificar que el resto del nombre solo contenga letras, guiones, apóstrofes o puntos
        // y que termine con una letra
        if (!/^[A-ZÁÉÍÓÚÑÜ][a-záéíóúñü\-\'.]*[a-záéíóúñü]$/.test(parte)) {
            return false;
        }
        
        // Verificar que no haya caracteres especiales repetidos o en posiciones inválidas
        if (/(\-\-)|(\.\.)|(\'\')|(\-\')|(\'\-)|(\.\-)|(\-\.)/.test(parte)) {
            return false;
        }
    }
    
    return true;
}
