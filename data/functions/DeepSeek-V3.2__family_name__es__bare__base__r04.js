function validate(apellido) {
    // Verificar que el argumento sea un string
    if (typeof apellido !== 'string') {
        return false;
    }
    
    // Eliminar espacios en blanco al inicio y final
    apellido = apellido.trim();
    
    // Validar longitud mínima y máxima
    if (apellido.length < 2 || apellido.length > 50) {
        return false;
    }
    
    // Patrón básico: solo letras (incluyendo acentos y diacríticos comunes), espacios, guiones y apóstrofes
    // Permitimos espacios internos para apellidos compuestos (ej: "De la Cruz")
    // Permitimos guiones para apellidos con guion (ej: "García-Márquez")
    // Permitimos apóstrofes (ej: apellidos como O'Connor)
    const patronApellido = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
    
    if (!patronApellido.test(apellido)) {
        return false;
    }
    
    // Validaciones adicionales:
    
    // 1. No debe comenzar o terminar con espacio, guion o apóstrofe
    if (/^[\s'-]|[\s'-]$/.test(apellido)) {
        return false;
    }
    
    // 2. No debe tener guiones o apóstrofes consecutivos (ej: "--" o "''")
    if (/['-]{2,}/.test(apellido)) {
        return false;
    }
    
    // 3. No debe tener espacios múltiples consecutivos
    if (/\s{2,}/.test(apellido)) {
        return false;
    }
    
    // 4. Debe contener al menos una letra (no solo símbolos)
    if (!/[A-Za-zÀ-ÖØ-öø-ÿ]/.test(apellido)) {
        return false;
    }
    
    // 5. Validar que después de un guion o apóstrofe haya una letra
    if (/['-](?![A-Za-zÀ-ÖØ-öø-ÿ])/.test(apellido)) {
        return false;
    }
    
    return true;
}
