function validate(nombreCompleto) {
    // Validación inicial: debe ser string no vacío
    if (typeof nombreCompleto !== 'string' || nombreCompleto.trim() === '') {
        return false;
    }
    
    // Limpiar espacios extra y normalizar
    const nombreLimpio = nombreCompleto.trim().replace(/\s+/g, ' ');
    
    // Debe tener al menos dos palabras (nombre y apellido)
    const partes = nombreLimpio.split(' ');
    if (partes.length < 2) {
        return false;
    }
    
    // Validar cada parte individualmente
    for (let parte of partes) {
        // Cada parte debe tener al menos 2 caracteres
        if (parte.length < 2) {
            return false;
        }
        
        // Cada parte debe empezar con mayúscula y seguir con minúsculas
        // Permitimos letras con acentos, diéresis, ç, ñ, guiones y apóstrofes
        const regexParte = /^[A-ZÁÉÍÓÚÜÑÇ][a-záéíóúüñç']+([- ][A-ZÁÉÍÓÚÜÑÇ][a-záéíóúüñç']+)*$/;
        
        // Casos especiales: permitir nombres compuestos como "María José"
        // Dividimos por espacios o guiones para validar cada subparte
        const subpartes = parte.split(/[- ]/);
        
        for (let subparte of subpartes) {
            if (subparte.length < 2) {
                return false;
            }
            // Validar que cada subparte empiece con mayúscula y siga con minúsculas
            if (!/^[A-ZÁÉÍÓÚÜÑÇ][a-záéíóúüñç']+$/.test(subparte)) {
                return false;
            }
        }
    }
    
    // Validación adicional: no debe contener números ni caracteres especiales no permitidos
    const regexCompleto = /^[A-ZÁÉÍÓÚÜÑÇ][a-záéíóúüñç']+(?:[- ][A-ZÁÉÍÓÚÜÑÇ][a-záéíóúüñç']+)*(?: [A-ZÁÉÍÓÚÜÑÇ][a-záéíóúüñç']+(?:[- ][A-ZÁÉÍÓÚÜÑÇ][a-záéíóúüñç']+)*)+$/;
    
    return regexCompleto.test(nombreLimpio);
}
