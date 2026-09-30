function validate(nombreCompleto) {
    // Verificar que el argumento sea un string
    if (typeof nombreCompleto !== 'string') {
        return false;
    }

    // Eliminar espacios al inicio y al final
    const texto = nombreCompleto.trim();

    // Verificar que no esté vacío después de trim
    if (texto.length === 0) {
        return false;
    }

    // Dividir por espacios
    const partes = texto.split(/\s+/);
    
    // Un nombre completo debe tener al menos dos partes
    if (partes.length < 2) {
        return false;
    }

    // Verificar cada parte
    for (let i = 0; i < partes.length; i++) {
        const parte = partes[i];
        
        // Cada parte debe tener al menos un carácter
        if (parte.length === 0) {
            return false;
        }

        // Verificar que solo contenga letras, incluyendo acentos, diéresis, ç y otros caracteres comunes en nombres
        // También permite apóstrofes y guiones (como en O'Connor o Jean-Claude)
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÄËÏÖÜäëïöüÇçÑñ'\-]+$/.test(parte)) {
            return false;
        }

        // Verificar que no comience ni termine con apóstrofe o guión
        if (parte.startsWith("'") || parte.startsWith("-") || parte.endsWith("'") || parte.endsWith("-")) {
            return false;
        }

        // Verificar que no tenga apóstrofes o guiones consecutivos
        if (/(['-])\1/.test(parte)) {
            return false;
        }
    }

    // Verificar que la primera letra de cada parte sea mayúscula
    for (let i = 0; i < partes.length; i++) {
        const primeraLetra = partes[i].charAt(0);
        if (!/^[A-ZÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÇÑ]/.test(primeraLetra)) {
            return false;
        }
    }

    return true;
}
