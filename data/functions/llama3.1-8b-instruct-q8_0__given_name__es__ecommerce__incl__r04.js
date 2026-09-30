function validate(fullName) {
    // El nombre debe contener al menos una letra mayúscula y alfa numérica (es decir, no espacio)
    if (!fullName.match(/^[A-Z]+(\s[A-Z0-9\'\-])+$/i)) return false;

    let words = fullName.split(' ');

    // Cada palabra en el nombre debe tener al menos 1 letra mayúscula
    for (let word of words) {
        if (!word.includes(word.slice(0, 1).toUpperCase())) return false;
        if (!word.includes(word.toLowerCase())) return false;

        let regex = /\d|\'|-/;

        // No puede haber números ni acentos no válidos en el nombre
        if (word.match(regex) && !/[a-zA-Z]/.test(word.replace(/\D|\_/g, ''))) {
            let chars = Array.from(word);
            
            for (let char of word) {
                if (!['-', '\''].includes(char)) {
                    // Verificar si son tildes o accéntos y reemplazarlos con a sin acento
                    if ('ÁÉÍÓÚáéíóú'.includes(char)) {
                        chars[chars.indexOf(char)] = 'a';
                    }
                }
            }

            // Si se encuentra cualquier caracter invalido, devuelve false
            for (let char of word) {
                let regex = /[^\w\s]/;
                if (char.match(regex)) return false;
            }
        }
    }

    // Si el nombre ha pasado la validación hasta ahora, lo devolverá como true.
    return true;
}
