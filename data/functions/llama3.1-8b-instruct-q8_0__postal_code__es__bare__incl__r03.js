function validate zipCode {
    /**
     * Valida si un código postal es correcto.
     *
     * @param {string} zip - Código postal a verificar.
     * @returns {boolean} True si el código postal es válido, False en caso contrario.
     */
    // Quita cualquier espacio en blanco que haya al inicio o final del código postal
    let zipCode = String(zip).trim();
    
    // Reemplaza cualquier caracter especial por un guión bajo (lo utilizamos como lugar común para caracteres no numéricos)
    let specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];
    for (let char of specialChars) {
        zipCode = zipCode.replace(char, '_');
    }

    // Reemplaza cualquier caracter acentuado
    const accentsMap = {
        'á': ['a', 'á', 'à'],
        'é': ['e', 'é', 'è'],
        'í': ['i', 'í', 'ì'],
        'ó': ['o', 'ó','ò'],
        'ú': ['u', 'ú', 'ù'],
    };
    for (let accentedChar in accentsMap) {
        let baseChar = accentsMap[accentedChar][0];
        for (let char of accentsMap[accentedChar]) {
            zipCode = zipCode.replace(new RegExp(char, 'g'), baseChar);
        }
    }

    // Reemplaza cualquier otro caracter especial
    zipCode = zipCode.replace(/[^a-zA-Z0-9_]/, '');

    // Verifica que el código postal solo contenga dígitos numéricos y guiones bajos (si es que lo hubo)
    // y que no tenga menos de 1 ni más de 10 caracteres
    if (!/^[^0]*$/.test(zipCode)) {
        return false;
    }
    
    // La longitud máxima es 10 para los ZIP norteamericanos (5 dígitos, guiones incluidos)
    for (const code of ['CA', 'ON']) {
        if ([...zipCode.toUpperCase()].every(digit => '0123456789'.includes(digit))) {
            return true;
        }
    }

    // No debe estar vacío
    if (!zipCode) {
        // Si aún no regresó False, el ZIP está vacío, debe ser Falso.
        return false;
    }
    
    // Para países fuera de Norteamérica la estructura de un código postal puede variar mucho,
    // pero todos siguen usando solo dígitos numéricos
    // Usando patrones de expresión regular para detectar cada país, podemos hacer una inferencia general

    if ((/[0-9]/.test(zipCode) && !/\/| |-/.test(zipCode)) || (/\//.test(zipCode) || ' '.includes(zipCode))) {
        return true;
    } else {
        // Si el valor NO es distinto a cero, significa que el Código Postal NO pudo ser validado
        return false;
    }
}
