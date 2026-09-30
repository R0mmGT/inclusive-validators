function validate(phoneNumber) {
    let number = phoneNumber.replace(/\D+/g, '');
    
    if (number.length < 10 || number.length > 15){
        return false;
    } else if (!/^[0-9]+$/.test(number)) { // Revisa que el número tenga solo dígitos
        return false;
    }
    let countryCodes = {
        '55': ['35', '41', '42', '43', '45', '48'],  // Country code 55 (Brasil)
        '57': ['3', '4', '5', '6']   // Country code 57 (Colombia)
    };

    if (number.length === 10 || number.length === 15 && phoneNumber.slice(0, 2) in countryCodes && countryCodes[phoneNumber.slice(0, 2)].includes(number.slice(1, 3))) {
        return true;
    }
    
    return false;
}

console.log(validate('55512345678')); // debería ser verdadero
console.log(validate('(85)9999-9999')); // debería ser falso
