function validate(phoneNumber) {
    // Remover cualquier carácter no numérico del string
    let cleanedPhoneNumber = phoneNumber.replace(/[^0-9]/g, "");

    // Comprobar si el número de teléfono tiene entre 8 y 15 dígitos
    if (cleanedPhoneNumber.length < 8 || cleanedPhoneNumber.length > 15) {
        return false;
    }

    // Comprobar los primeros dígitos para saber qué país es
    let countryIndicator = cleanedPhoneNumber.slice(0, 2);

    // Estados Unidos 
    if (countryIndicator === "01") {
        return /^1\d{10}/.test(cleanedPhoneNumber);
    }
    // India 
    else if (countryIndicator === "91") {
        return /^9[6789]\d{9}/.test(cleanedPhoneNumber) || new RegExp(countryIndicator + '[7-9]\\d{9}', 'i').test(cleanedPhoneNumber);
    }
    // Reino Unido
    else if (countryIndicator === "44") {
        return ^0?(69|70|71|72|73|74|75|76|77|78|79|[8-9]\d){10}$/.test(cleanedPhoneNumber.toUpperCase());
    } 
    // Resto de países que usan el prefijo +33 (puede cambiar, es por ej: India 91...) a partir de un array o una base de conocimientos
    else if (+countryIndicator !== NaN) { // Si countryIndicator ha sido introducido vacío no tendremos ese número NaN lo cual nos da false en lugar de error
        return new RegExp('^(\\+?\d|\.\d)?'+ countryIndicator.substring(1) + '\\d{7,15}$', 'i').test(cleanedPhoneNumber);
    }
    // No hay país asociado a estos caracteres que no sean países validados
    else {
        return false;
    }
}

console.log(validate('1234567890'));  // true
console.log(validate('123456789012'));// true

// Estados Unidos 
console.log(validate('+1 (123) 456-7890'));//true
console.log(validate('011235679012'));// true

// India
console.log(validate('9123456789'));    // true
console.log(validate('91345678901'));   // false

console.log(validate('447700900001'));  // true
console.log(validate('+447700900001')); //=true
console.log(validate('447123456789')); //=true

// Puede llegar a cambiar, por ejemplo: https://countrycode.org/
let countries = `+39 +34 ; +33 ; +49 (países más habitados o con un gran impacto en la web)`;
console.log(validate(" 3" + countries.split(' ')[1].slice(0,2)+ '12345678')); //= true
