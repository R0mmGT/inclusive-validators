function validate(name) {
    // Verificar que el argumento sea un string
    if (typeof name !== 'string') {
        return false;
    }
    
    // Eliminar espacios al inicio y final
    const trimmedName = name.trim();
    
    // El nombre no debe estar vacío después de trim
    if (trimmedName.length === 0) {
        return false;
    }
    
    // Longitud mínima y máxima razonable para un nombre
    if (trimmedName.length < 2 || trimmedName.length > 50) {
        return false;
    }
    
    // El nombre debe comenzar con una letra mayúscula
    if (!/^[A-ZÁÉÍÓÚÑ]/.test(trimmedName)) {
        return false;
    }
    
    // Después de la primera letra, solo puede contener:
    // - Letras (mayúsculas o minúsculas, incluyendo acentuadas y ñ)
    // - Espacios simples (para nombres compuestos)
    // - Guiones (para nombres compuestos con guion)
    // - Apóstrofos (para nombres como O'Connor)
    if (!/^[A-ZÁÉÍÓÚÑ][a-záéíóúñA-ZÁÉÍÓÚÑ' -]+$/.test(trimmedName)) {
        return false;
    }
    
    // Validaciones adicionales:
    
    // No puede tener dos espacios consecutivos
    if (/\s{2,}/.test(trimmedName)) {
        return false;
    }
    
    // No puede tener dos guiones consecutivos
    if (/--/.test(trimmedName)) {
        return false;
    }
    
    // No puede terminar con espacio, guion o apóstrofo
    if (/[\s\-']$/.test(trimmedName)) {
        return false;
    }
    
    // No puede comenzar con espacio, guion o apóstrofo (ya cubierto parcialmente)
    if (/^[\s\-']/.test(trimmedName)) {
        return false;
    }
    
    // Verificar que haya al menos una letra después de cada espacio/guion/apóstrofo
    const parts = trimmedName.split(/[\s\-']/);
    for (const part of parts) {
        if (part.length === 0) {
            return false;
        }
        // Cada parte debe comenzar con letra mayúscula
        if (!/^[A-ZÁÉÍÓÚÑ]/.test(part)) {
            return false;
        }
    }
    
    // Nombres prohibidos (ejemplos comunes que no son nombres reales)
    const forbiddenNames = [
        'admin', 'administrator', 'root', 'user', 'test', 'guest',
        'null', 'undefined', 'true', 'false', 'anon', 'anonymous'
    ];
    
    const lowerName = trimmedName.toLowerCase();
    if (forbiddenNames.includes(lowerName)) {
        return false;
    }
    
    // Nombres que contienen números o símbolos no permitidos
    if (/[0-9]/.test(trimmedName) || /[!"#$%&()*+,./:;<=>?@[\\\]^_`{|}~]/.test(trimmedName)) {
        return false;
    }
    
    return true;
}
