function validate(nombreCompleto) {
    // Verificar que el argumento sea string
    if (typeof nombreCompleto !== 'string') {
        return false;
    }

    // Eliminar espacios al inicio y final
    const texto = nombreCompleto.trim();

    // Validar longitud mínima y máxima razonable
    if (texto.length < 2 || texto.length > 100) {
        return false;
    }

    // Verificar que contenga solo letras, espacios, guiones y apóstrofes comunes en nombres
    // Permitimos caracteres acentuados y la ñ
    if (!/^[\p{L}\s'-]+$/u.test(texto)) {
        return false;
    }

    // Evitar caracteres especiales repetidos de forma sospechosa
    if (/(['-])\1/.test(texto) || texto.includes("  ") || texto.includes("--")) {
        return false;
    }

    // No puede empezar o terminar con caracteres especiales
    if (/^[\s'-]|[\s'-]$/.test(texto)) {
        return false;
    }

    // Dividir en partes (nombres y apellidos)
    const partes = texto.split(/\s+/).filter(parte => parte.length > 0);

    // Debe tener al menos un nombre y un apellido (mínimo 2 partes)
    if (partes.length < 2) {
        return false;
    }

    // Cada parte debe tener al menos 2 letras (excepto prefijos como "Mc", "O'")
    for (let parte of partes) {
        const parteLimpia = parte.replace(/^[MCmc]'?|^[ODBL]'?/i, '');
        if (parteLimpia.length < 1) {
            return false;
        }
    }

    // No permitir secuencias de más de 3 letras iguales consecutivas
    if (/([a-záéíóúñü])\1\1\1/i.test(texto.replace(/[^a-záéíóúñü]/gi, ''))) {
        return false;
    }

    // No permitir números
    if (/\d/.test(texto)) {
        return false;
    }

    // Validar formato: cada parte debe empezar con mayúscula
    // (permitimos excepciones como "de la Torre", "van der Berg")
    const palabrasNoCapitalizables = ['de', 'del', 'la', 'las', 'los', 'y', 'e', 'el', 'van', 'der', 'da', 'das', 'do', 'dos', 'von'];
    
    for (let i = 0; i < partes.length; i++) {
        const palabra = partes[i].toLowerCase();
        const primeraLetra = partes[i][0];
        
        // Si no es una palabra "no capitalizable", debe empezar con mayúscula
        if (!palabrasNoCapitalizables.includes(palabra) && primeraLetra === primeraLetra.toLowerCase()) {
            // Verificar que no sea un prefijo como "mc" o "o'"
            if (!/^(mc|o'|mac|d')[a-z]/i.test(partes[i])) {
                return false;
            }
        }
    }

    return true;
}
