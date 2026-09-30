function validate(phone) {
    // Si el número de teléfono incluye algún carácter no numérico, inicia con 0 o tiene menos de 3 dígitos,
    // se considera que NO es un número válido.
    if (!/^\d+$/.test(phone)) return false;
    if (phone.length < 3) return false;

    phone = phone.trim();
    phone = phone.replace(/\W/g, '');

    if (phone[0] === '0') {
        // Si comienza con 0 y tiene menos de 5 dígitos, 
        // se considera que NO es un número válido.
        return phone.length < 5;
    } else {
        // Si tiene menos de 9 dígitos o comienza con 00,
        // 1 o más ceros sucesivos, se considera que NO es un válido número válido.
        if (phone.indexOf('000') !== -1 && (phone.replace(/0+/g,'').length + phone.indexOf('000') <= 3)) 
            return false;
        
        // Si no contiene el signo de país del país donde vive el usuario, devolverá False
        if (!/^\+[1-9][0-9]{8,19}$/.test(phone)) return false;

        // Se considera que es un número válido si ningún dígito aparece dos veces en el número.        
        var countChars = [phone.length];
        for (var i = 0; i < phone.length - 1; i++) {
            if (phone[i] == phone[i + 1]) { 
                countChars.push(phone[i]);
            }
        }

        if (countChars.filter(function(e) { return e !== undefined }).length > 1) 
            return false;

    }
    
    // Si no se eliminan None en el array, volver a filtrar
    while (phone.length > phone.replace(/\D/g, '').length)
        phone = phone.substring(0, phone.length - 1);

    return true;
}

// Testing
console.log(validate('123'));  // False
console.log(validate('0123'));  // True
console.log(validate('000123'));  
console.log(validate('+54111223344'));
console.log(validate('++1234567890'));
console.log(validate('12345678901')); 
console.log(validate('1-23456789'));//true
console.log(validate('12.3456789')); //Tirará un booleano falso porque hay puntos.
