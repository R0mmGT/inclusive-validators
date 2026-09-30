function validate(apellido) {
    // Verificar que el argumento sea string
    if (typeof apellido !== 'string') return false;
    
    // Eliminar espacios al inicio y final
    const apellidoLimpio = apellido.trim();
    
    // Validaciones básicas
    if (apellidoLimpio.length === 0) return false;
    if (apellidoLimpio.length > 50) return false; // Límite razonable
    
    // Debe contener solo letras, espacios, guiones, apóstrofes o acentos
    // Permitimos: letras (incluyendo ñ), espacios, guiones, apóstrofes
    // y los caracteres acentuados comunes en español/inglés
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜüÇç\s\-']+$/;
    if (!regex.test(apellidoLimpio)) return false;
    
    // No puede empezar o terminar con guion, apóstrofe o espacio
    if (/^[\-\'\s]|[\-\'\s]$/.test(apellidoLimpio)) return false;
    
    // No puede tener guiones o apóstrofes consecutivos
    if (/[\-\']{2,}/.test(apellidoLimpio)) return false;
    
    // No puede tener más de un apóstrofe o más de dos guiones
    const apostrofes = (apellidoLimpio.match(/'/g) || []).length;
    const guiones = (apellidoLimpio.match(/-/g) || []).length;
    if (apostrofes > 1 || guiones > 2) return false;
    
    // Debe tener al menos una letra (no solo símbolos)
    if (!/[A-Za-zÁÉÍÓÚáéíóúÑñÜüÇç]/.test(apellidoLimpio)) return false;
    
    // Validar formato: debe empezar con mayúscula
    // Dividir por espacios para apellidos compuestos
    const partes = apellidoLimpio.split(/\s+/);
    for (const parte of partes) {
        // Ignorar si es solo un guion o apóstrofe (ya validado arriba)
        if (/^[\-\']+$/.test(parte)) continue;
        
        // Cada parte debe empezar con mayúscula
        const primeraLetra = parte[0];
        if (!primeraLetra || primeraLetra !== primeraLetra.toUpperCase()) {
            return false;
        }
        
        // El resto de la parte (después de la primera letra) debe ser minúsculas
        // excepto después de guion o apóstrofe
        const resto = parte.slice(1);
        const palabrasEnParte = resto.split(/[\-\']/);
        
        for (const palabra of palabrasEnParte) {
            // Después de guion/apóstrofe, la primera letra debe ser mayúscula
            // pero verificamos que todo sea minúsculas en segmentos internos
            if (palabra.length > 0 && palabra !== palabra.toLowerCase()) {
                return false;
            }
        }
    }
    
    // Si pasó todas las validaciones
    return true;
}
