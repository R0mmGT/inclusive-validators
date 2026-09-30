function validate(name) {
    // Validaciones básicas
    if (typeof name !== 'string') return false;
    
    const trimmed = name.trim();
    
    // No vacío después de trim
    if (trimmed.length === 0) return false;
    
    // Longitud mínima y máxima razonable (1-70 caracteres)
    if (trimmed.length < 1 || trimmed.length > 70) return false;
    
    // No puede contener solo números o caracteres especiales
    if (!/[a-zA-ZÀ-ÿ]/.test(trimmed)) return false;
    
    // No puede contener caracteres potencialmente peligrosos o no apropiados para nombres
    if (/[<>{}[\]|\\^~%`]/.test(trimmed)) return false;
    
    // No puede contener múltiples espacios consecutivos
    if (/\s{2,}/.test(trimmed)) return false;
    
    // No puede empezar ni terminar con guión, apóstrofo o espacio
    if (/^[-'\s]|[-'\s]$/.test(trimmed)) return false;
    
    // No puede contener secuencias inválidas de caracteres especiales
    if (/[-']{2,}/.test(trimmed)) return false;
    
    // No puede contener números a menos que sean parte de un nombre cultural específico
    // (permitimos nombres como "Jean-Claude", "O'Connor", "María José", etc.)
    // Solo verificamos que no sean SOLO números
    
    // Patrones específicos para nombres culturales
    // Permitir letras, espacios, guiones, apóstrofos, y algunos caracteres especiales comunes
    // en nombres de diferentes culturas
    const namePattern = /^[\p{L}\s.'-]+$/u;
    
    if (!namePattern.test(trimmed)) return false;
    
    // Verificar que tenga al menos una letra (incluyendo caracteres Unicode)
    if (!/\p{L}/u.test(trimmed)) return false;
    
    // Validaciones adicionales de sentido común
    // No puede contener palabras ofensivas comunes (ejemplo básico)
    const offensiveWords = ['shit', 'fuck', 'asshole', 'idiot', 'stupid'];
    const lowerName = trimmed.toLowerCase();
    if (offensiveWords.some(word => lowerName.includes(word))) return false;
    
    // Debe tener una estructura básica de nombre (al menos un carácter que no sea espacio)
    const wordCount = trimmed.split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount === 0) return false;
    
    // Cada parte del nombre debe comenzar con una letra (no con número o símbolo)
    const nameParts = trimmed.split(/\s+/);
    for (const part of nameParts) {
        if (part.length > 0 && !/^\p{L}/u.test(part)) {
            return false;
        }
    }
    
    return true;
}
