function validate(direccion) {
    // Validación básica: no vacía, longitud razonable
    if (typeof direccion !== 'string') return false;
    
    const trimmed = direccion.trim();
    if (trimmed.length === 0 || trimmed.length > 200) return false;
    
    // No debe contener solo números
    if (/^\d+$/.test(trimmed)) return false;
    
    // Debe contener al menos un número (para número de puerta/building) 
    // y al menos una letra (para nombre de calle)
    if (!/\d/.test(trimmed)) return false;
    if (!/[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(trimmed)) return false;
    
    // Patrón principal: número(s) opcional al inicio o final, 
    // seguido de texto con posibles espacios, comas, puntos, guiones
    // y palabras comunes de dirección
    const patronPrincipal = /^(\d+[\s\-]?)?([a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\-\.,#]+)([\s\-]+\d+)?$/;
    
    if (!patronPrincipal.test(trimmed)) return false;
    
    // Validaciones adicionales
    // No demasiados caracteres especiales consecutivos
    if (/[!@$%^*_+=|<>?;:'"`~]{2,}/.test(trimmed)) return false;
    
    // No debe comenzar o terminar con caracteres especiales (excepto números)
    if (/^[^\wáéíóúÁÉÍÓÚñÑ\d]/.test(trimmed)) return false;
    if (/[^\wáéíóúÁÉÍÓÚñÑ\d]$/.test(trimmed)) return false;
    
    // Debe tener al menos 2 partes significativas (ej: "Calle 123" tiene 2 partes)
    const partes = trimmed.split(/[\s\-\.,]+/).filter(p => p.length > 0);
    if (partes.length < 2) return false;
    
    // Verificar que haya una combinación razonable de números y texto
    const tieneNumeroEnPartes = partes.some(p => /\d/.test(p));
    const tieneTextoEnPartes = partes.some(p => /[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(p));
    
    return tieneNumeroEnPartes && tieneTextoEnPartes;
}
