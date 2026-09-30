function validate(phoneNumber) {
    // Expreción regular para validar números telefónicos en formato (XXX) XXX-XXXX
    var pattern = /^\(\d{3}\)\s?\d{3}-\d{4}$/;

    return phoneNumber.match(pattern);
}

// Pruebas
console.log(validate("(123) 456-7890"));  // Regresa: true
console.log(validate("123 456 7890"));  // Regresa: false
