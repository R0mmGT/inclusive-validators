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

    // Dividir el nombre en partes
    const partes = nombreTrimmed.split(/\s+/);
    
    // Debe tener al menos nombre y apellido (mínimo 2 partes)
    if (partes.length < 2) {
        return false;
    }

    // Verificar cada parte
    for (let i = 0; i < partes.length; i++) {
        const parte = partes[i];
        
        // Cada parte debe tener al menos 2 caracteres
        if (parte.length < 2) {
            return false;
        }
        
        // Debe comenzar con mayúscula y el resto en minúscula
        // Permitimos guiones y apóstrofes en nombres compuestos
        const regexValida = /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+([-'][A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+)*$/;
        
        if (!regexValida.test(parte)) {
            return false;
        }
    }

    return true;
}
