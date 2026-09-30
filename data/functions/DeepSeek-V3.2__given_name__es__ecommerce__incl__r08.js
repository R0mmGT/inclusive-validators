function validate(name) {
    // Verificar que el argumento sea un string
    if (typeof name !== 'string') return false;
    
    // Eliminar espacios al inicio y final
    const trimmedName = name.trim();
    
    // Verificar longitud mínima y máxima razonable
    if (trimmedName.length < 1 || trimmedName.length > 100) return false;
    
    // Verificar que no contenga solo espacios
    if (trimmedName.length === 0) return false;
    
    // Verificar que no comience ni termine con guión o apóstrofo
    if (/^[-']|[-']$/.test(trimmedName)) return false;
    
    // Verificar que no tenga guiones o apóstrofos consecutivos
    if (/[-']{2,}/.test(trimmedName)) return false;
    
    // Patrón principal: permite letras de cualquier idioma, guiones, apóstrofos y espacios
    // Incluye caracteres latinos, griegos, cirílicos, armenios, hebreos, árabes, devanagari, etc.
    // También permite ideogramas chinos/japoneses/coreanos y otros caracteres Unicode
    const validNamePattern = /^[\p{L}\p{M}' -]+$/u;
    
    // Verificar patrón base
    if (!validNamePattern.test(trimmedName)) return false;
    
    // Verificar que haya al menos un carácter de letra (no solo espacios, guiones o apóstrofos)
    if (!/[\p{L}\p{M}]/.test(trimmedName)) return false;
    
    // Verificar que no tenga más de 5 partes (para nombres muy largos pero razonables)
    const parts = trimmedName.split(/[ -]+/).filter(part => part.length > 0);
    if (parts.length > 5) return false;
    
    // Verificar que cada parte tenga al menos un carácter de letra
    for (const part of parts) {
        if (!/[\p{L}\p{M}]/.test(part)) return false;
        // Verificar longitud mínima de cada parte (excepto para abreviaciones como "O'")
        if (part.replace(/['-]/g, '').length < 1) return false;
    }
    
    // Validaciones adicionales de sentido común
    // No permitir solo números
    if (/^\d+$/.test(trimmedName.replace(/[^0-9]/g, ''))) return false;
    
    // No permitir patrones repetitivos (ej: "aaaa", "---")
    if (/(.)\1{10,}/.test(trimmedName)) return false;
    
    return true;
}
