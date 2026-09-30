function validate(name) {
    // Validaciones básicas
    if (typeof name !== 'string') return false;
    
    const trimmedName = name.trim();
    
    // Longitud mínima y máxima razonable
    if (trimmedName.length < 1 || trimmedName.length > 50) return false;
    
    // No debe contener solo espacios
    if (trimmedName.length === 0) return false;
    
    // No debe contener números
    if (/\d/.test(trimmedName)) return false;
    
    // Caracteres permitidos (letras, espacios, guiones, apóstrofos, puntos y caracteres diacríticos)
    // Esta expresión permite:
    // - Letras de cualquier alfabeto (incluido Unicode)
    // - Espacios, guiones, apóstrofos y puntos
    // - Combinaciones como "O'Connor", "Jean-Pierre", "María José", etc.
    const validNamePattern = /^[\p{L}\s'\-\.]+$/u;
    if (!validNamePattern.test(trimmedName)) return false;
    
    // No debe empezar ni terminar con caracteres especiales (excepto acentos en letras)
    if (/^[\s'\-\.]|[\s'\-\.]$/.test(trimmedName)) return false;
    
    // No debe tener caracteres especiales consecutivos
    if (/['\-\.]{2,}/.test(trimmedName)) return false;
    
    // No debe tener múltiples espacios consecutivos
    if (/\s{2,}/.test(trimmedName)) return false;
    
    // Validación específica para apóstrofes y guiones:
    // - No permitir apóstrofes o guiones al inicio o final
    // - Asegurar que haya letras alrededor de estos caracteres
    const apostropheOrDashCheck = /['\-]/g;
    let match;
    while ((match = apostropheOrDashCheck.exec(trimmedName)) !== null) {
        const index = match.index;
        // Verificar que haya una letra antes y después del apóstrofe/guion
        if (index === 0 || index === trimmedName.length - 1) return false;
        if (!/\p{L}/u.test(trimmedName[index - 1]) || !/\p{L}/u.test(trimmedName[index + 1])) {
            return false;
        }
    }
    
    // Debe contener al menos una letra (no solo caracteres especiales)
    if (!/\p{L}/u.test(trimmedName)) return false;
    
    // Casos especiales que podrían ser problemáticos:
    // - Nombres con solo puntos (como iniciales) no son válidos como nombres completos
    // - Verificar que no sea solo una inicial con punto
    const withoutDots = trimmedName.replace(/\./g, '');
    if (withoutDots.length === 0) return false;
    
    return true;
}
