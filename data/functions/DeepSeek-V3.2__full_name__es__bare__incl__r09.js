function validate(nombreCompleto) {
    // Validaciones básicas
    if (typeof nombreCompleto !== 'string') return false;
    
    const trimmed = nombreCompleto.trim();
    if (trimmed.length === 0) return false;
    
    // Longitud máxima razonable para un nombre completo
    if (trimmed.length > 200) return false;
    
    // Verificar caracteres peligrosos o de control
    if (/[\x00-\x08\x0E-\x1F\x7F]/.test(trimmed)) return false;
    
    // Verificar que contenga al menos un espacio (separador entre nombre y apellido)
    // Esto es flexible para culturas con un solo nombre o múltiples partes
    const partes = trimmed.split(/\s+/).filter(p => p.length > 0);
    if (partes.length < 1) return false;
    
    // Verificar cada parte del nombre
    for (let parte of partes) {
        // Longitud mínima para cada parte (ajustable, algunos nombres pueden ser muy cortos)
        if (parte.length < 1) return false;
        
        // Patrón flexible que acepta:
        // 1. Letras Unicode (incluye acentos, caracteres internacionales)
        // 2. Guiones (para nombres compuestos como María-Luisa)
        // 3. Apóstrofos (para nombres como O'Connor, D'Angelo)
        // 4. Puntos (para abreviaciones como J.R.R.)
        // 5. Permitir dígitos para casos como nombres con números (ciertas culturas)
        const patronParte = /^[\p{L}\p{M}\d'.-]+$/u;
        
        if (!patronParte.test(parte)) {
            // Verificación adicional para nombres con espacios internos convertidos
            // (ya que split por espacios los separó)
            return false;
        }
        
        // Validaciones específicas para evitar combinaciones sospechosas
        // No permitir solo caracteres especiales
        if (!/[\p{L}\p{M}]/u.test(parte)) return false;
        
        // No permitir secuencias de puntos o guiones múltiples
        if (/\.{3,}|-{3,}|'{3,}/.test(parte)) return false;
        
        // No permitir comenzar o terminar con ciertos caracteres especiales
        if (/^[-.'\d]|[-.]$/.test(parte)) {
            // Excepciones: nombres que comienzan con números o símbolos válidos
            // en ciertas culturas, pero verificamos que no sean solo símbolos
            if (/^[-.'\d]+$/.test(parte)) return false;
        }
    }
    
    // Validación adicional: no permitir solo espacios repetidos o patrones extraños
    if (/^\s+$/.test(nombreCompleto)) return false;
    
    // Verificar proporción de caracteres especiales vs letras
    const letras = (trimmed.match(/[\p{L}\p{M}]/gu) || []).length;
    const totalCaracteres = trimmed.length;
    const proporcionLetras = letras / totalCaracteres;
    
    // Debe tener al menos 50% de letras (flexible para nombres con números)
    if (proporcionLetras < 0.5) return false;
    
    // Validación final: estructura general
    // Aceptar nombres con espacios, guiones, apóstrofos y puntos
    const patronGeneral = /^(?!.*\s{2,})(?!.*[-.'][-.])(?!.*\d{5,})[\p{L}\p{M}\d\s'.-]+$/u;
    
    return patronGeneral.test(trimmed) && partes.length >= 1;
}
