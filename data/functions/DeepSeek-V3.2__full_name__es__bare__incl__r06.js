function validate(nombreCompleto) {
    // Verificar que el argumento sea un string
    if (typeof nombreCompleto !== 'string') {
        return false;
    }

    // Eliminar espacios al inicio y final
    nombreCompleto = nombreCompleto.trim();
    
    // Verificar que no esté vacío
    if (nombreCompleto.length === 0) {
        return false;
    }

    // Dividir en partes y filtrar elementos vacíos
    const partes = nombreCompleto.split(/\s+/).filter(parte => parte.length > 0);
    
    // Debe tener al menos dos partes (nombre y apellido)
    if (partes.length < 2) {
        return false;
    }

    // Validar cada parte individualmente
    for (let i = 0; i < partes.length; i++) {
        const parte = partes[i];
        
        // Longitud mínima (1 carácter) y máxima razonable (50 caracteres)
        if (parte.length < 1 || parte.length > 50) {
            return false;
        }

        // Patrón general que acepta caracteres Unicode de diferentes escrituras
        // Incluye letras con acentos, diacríticos, guiones, apóstrofes, y caracteres de escrituras no latinas
        const patronGeneral = /^[\p{L}\p{M}'\-\.\s]+$/u;
        
        // Validar usando el patrón Unicode
        if (!patronGeneral.test(parte)) {
            return false;
        }

        // Verificar que no comience ni termine con caracteres no alfabéticos
        // (excepto que sea una inicial con punto, como "J.")
        const primerCaracter = parte.charAt(0);
        const ultimoCaracter = parte.charAt(parte.length - 1);
        
        // El primer carácter debe ser una letra o un número (para algunas culturas)
        const esPrimerCaracterValido = /[\p{L}\p{N}]/u.test(primerCaracter);
        
        // El último carácter debe ser una letra, número o punto (para iniciales)
        const esUltimoCaracterValido = /[\p{L}\p{N}\.]/u.test(ultimoCaracter);
        
        if (!esPrimerCaracterValido || !esUltimoCaracterValido) {
            // Excepción: nombres con paréntesis como "María (Lola) Pérez"
            if (parte.includes('(') && parte.includes(')')) {
                const sinParentesis = parte.replace(/[\(\)]/g, '');
                if (sinParentesis.length > 0) {
                    const primerSinParentesis = sinParentesis.charAt(0);
                    const ultimoSinParentesis = sinParentesis.charAt(sinParentesis.length - 1);
                    const esPrimerValido = /[\p{L}\p{N}]/u.test(primerSinParentesis);
                    const esUltimoValido = /[\p{L}\p{N}\.]/u.test(ultimoSinParentesis);
                    if (!esPrimerValido || !esUltimoValido) {
                        return false;
                    }
                }
            } else {
                return false;
            }
        }

        // Verificar que no tenga caracteres especiales repetidos de manera no válida
        // Evitar múltiples guiones, apóstrofes o puntos seguidos
        const caracteresEspecialesRepetidos = /[\-\'\.]{2,}/;
        if (caracteresEspecialesRepetidos.test(parte)) {
            return false;
        }
    }

    // Verificación adicional: al menos una parte debe tener más de un carácter
    // (para evitar casos como "A B" o "X Y Z")
    const tieneParteLarga = partes.some(parte => parte.length > 1 && !parte.endsWith('.'));
    if (!tieneParteLarga) {
        // Verificar si es un caso válido de iniciales como "J. R. R. Tolkien"
        const esInicialesValidas = partes.every(parte => {
            return parte.length === 2 && parte.endsWith('.') && /^[\p{L}]\.$/u.test(parte);
        });
        if (!esInicialesValidas) {
            return false;
        }
    }

    // Verificar que no sea una cadena con solo números
    const soloNumeros = /^\d+$/.test(nombreCompleto.replace(/\s/g, ''));
    if (soloNumeros) {
        return false;
    }

    return true;
}
