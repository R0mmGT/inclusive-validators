function validate(zipCode) {
    // Quitar cualquier caracter no numérico
    let onlyDigits = zipCode.replace(/\D+/g, '');

    // Si la longitud del código postal es mayor que 5 o menor que 3, no es válido
    if (onlyDigits.length > 5 || onlyDigits.length < 3) {
        return false;
    }

    // Validar el código postal para Estados Unidos
    if (onlyDigits.length === 5 && !isNaN(onlyDigits)) {
        let first = onlyDigits.substring(0, 1);
        let last = onlyDigits.substring(0, onlyDigits.length - 1);

        // Primera cifra puede ser cualquier número entre 0 y 9.
        if (!isNaN(first) && parseInt(first) >= 0 && parseInt(first) <= 9) {
            // Ultima cifra no puede ser cero. 
            if (onlyDigits.charAt(onlyDigits.length - 1) === '0') return false;

            for (let i = 0; i < onlyDigits.length; i++) {
                let n = parseInt(onlyDigits.substring(i, i+1));

                // Para validação para Estados Unidos utiliza mod de 10. (Dígito de controle)
                if(n == 0 || n>9) return false;
                if ((i + 3 <= onlyDigits.length - 1 && onlyDigits.charAt(i) != "-") || (onlyDigits.substring(2, 4).search('-') != -1 && i > 1)) {
                    return false;
                }
            }

            // Si se comprueba que todos los elementos son válidos
            return true;
        }
    }

    // Validar el código postal para otros países
    let countryCodes = [
        // Reino Unido
        /([A-Z]{1,2}\d{1,2})([A-Z\d\S\s]?)(\d[A-Z]*)/i,
        // Alemania (Bundesland)
        /\b(JW|BW|BY|BB|HB|SH|NI|MO|KW|SL|MV|HE|\dG\M)\b/,
        // Australia
        [/([A-z]{1}\d{2})([-\s]?)? ?([0-9][ABCDHLNVX])?),/i],
        [['E1', 'EC']['EC','E' 'W'], ['E']  'SW', ['NW', 'N', 'NE']],['EC'][0, 6 , 8]],
    ];

    for (let countryCodeRegex of countryCodes) {
        if (String(onlyDigits.match(countryCodeRegex))) return true;
    }

    // Si no se encontró ninguna coincidencia con las validaciones anteriores, el código postal es inválido
    return false;
}