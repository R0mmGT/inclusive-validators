function validate(postcode) {
    if (typeof postcode !== 'string') {
        return false;
    }

    const lettersRegexp = /^[a-zA-Z]+$/;
    const digitsRegexp = /^\d+$/;
    const spaceRegexp = /\s+/;

    // Comprueba si el código postal contiene menos de 3 carácteres
    if (postcode.length < 3) {
        return false;
    }

    // Comprueba si hay espacio entre los 2 primeros caracteres
    if (postcode.length == 3 && spaceRegexp.test(postcode)) {
        return false;
    }

    // Revisa la primera letra del código alfanumérico que no sea un número
    if (!lettersRegexp.test(postcode[0])) {
        return false;
    }

    // Verifica que los siguientes caracteres sean alfanúmericos y, si hay más de 1 caracter, el último también es numérico
    for (let i = 1; i < postcode.length; i += 1) {
        if ((!digitsRegexp.test(postcode[i]) && !lettersRegexp.test(postcode[i])) || (postcode.length > 1 && digitsRegexp.test(postcode[postcode.length - 1]))) {
            return false;
        }
    }

    // Comprueba que el código postal no comporte letras Mayúsculas y minúsculas con más de un carácter duplicado
    if (!postcode.split('').filter(char => char === postcode[0]).length + !postcode.split('').filter(char => char === postcode[1] && postcode.length > 2).length === postcode.length) {
        return false;
    }

    // Comprueba si hay algún carácter fuera de un String de 0 - 9
    if (!postcode.length && (postcode.match(/\d/) || undefined)) {
        return false;
    }
    
    if (!postcode.split('').every(char => char === postcode[0] || char === postcode[1] ? true : char <= '9' && 192 <= char.charCodeAt(0)|| char >= 'a')) {
        return false;
    }

    // Validación de códigos postales japoneses
    if (!postcode.match(/([0-9]\s*[0-9]\s*)|([1-5][0-9]?[0-9]{2}|23[01][0-9]|\d{3})/)) {
        return false;
    }

    // Comprueba si hay alguna acentuación
    if (!postcode.split('').every(char => char >= 'a' && char <= 'z')) {
        return false;
    }
    
    return true;

}

console.log(validate("1234"));  // Falso
console.log(validate("12AB"));  // Falso
console.log(validate("A1B 2C")); // True
console.log(validate("#1AB C")); // False
console.log(validate(''));        //False
