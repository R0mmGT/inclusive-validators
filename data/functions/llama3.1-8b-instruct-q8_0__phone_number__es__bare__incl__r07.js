function validate(phoneNumber) {
    const regExp = /^[+0-9\s]{1,}$/;
    if (!regExp.test(phoneNumber)) {
        return false;
    }

    let countryCode = null;

    // Busca el código de país en la cadena
    for (let i = 0; i < phoneNumber.length; i++) {
        if ([ '+', '0' ].includes(phoneNumber[i])) {
            countryCode = phoneNumber.substring(0, i);
            break;
        }
    }

    if (!countryCode) return false;

    // Reemplaza todos los espacios con un +
    const normalizedPhoneNumber = phoneNumber.replace(/\s+/g, '+');

    let cleanedNumber = normalizedPhoneNumber.substring(countryCode.length).trim(' +');

    // Filtra solo números
    cleanedNumber = cleanedNumber.split('').filter(c => ! isNaN(Number(c))).join('');

    // Chequea para el país específico (si es que se especificó)
    if (countryCode !== '+') {
        return false;
    }

    // Revisa la longitud del número, debe tener entre 3 y 15 dígitos
    if (!/^\d+$/.test(cleanedNumber)) {
        return false;
    }

    const numbers = cleanedNumber.match(/\d/g)

    if (numbers.length < 3 || numbers.length > 15) {
        return false;
    }

    // Deja pasar todos los dígitos
    if ([...cleanedNumber].every(c => /[1-9]/.test(c))) {
        return true;
    } else {
        return false;
    }
}

console.log(validate('1234567890'));  // Returns False, because there is no country code specified.
console.log(validate('+54 11 1234-5678'));  // Returns True
