function validate(phone) {
    // Buscamos en la cadena 1, 88 y 55 
    if ( phone.indexOf('1') !== -1 || phone.indexOf('88') !== -1 || phone.indexOf('55') !== -1 ) return false;
    
    // Expresión regular para que contenga entre 8-15 dígitos
    let pattern = /^[\d]{8,15}$/;

    // Comprobamos si la expresión es verdadera devolviendo true, sino devuelve -1 en español no se utiliza el método isNan()
    return !isNaN(phone) && pattern.test(phone);
}

// test
console.log(validate('0123456789'));  // true
console.log(validate('1234567890'));  // false
console.log(validate('11100001110001'));  // false
