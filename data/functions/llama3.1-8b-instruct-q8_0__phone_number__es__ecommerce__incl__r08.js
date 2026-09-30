function validate(phoneNumber) {
    // Primero, se remueven cualquier separador de país o teléfono que pueda haber 
    phoneNumber = phoneNumber.replace(/[-\s\._]+/g,'');
    
    // Luego, se comprobamos si el número de teléfono tiene entre 7 y 15 dígitos 
    if (phoneNumber.length < 7 || phoneNumber.length > 15) return false;
    
    // La primera carácter debe ser un valor válido para cada país
    let validPrefixes = '0123456789'.split('');
    if (!validPrefixes.includes(phoneNumber[0])) return false;
    
    return true;
}

console.log(validate("+1-123456789"));  // debería devolver False porque tiene más de 15 dígitos 
console.log(validate("(123)4567-890"));   // debería devolver False porque tiene separadores que no son numéricos y tiene menos de 10 dígitos
console.log(validate("1234567890"));      // Deberia devolver True

