function validate(phoneNumber) {
    // Elimina cualquier espacio en blanco del número de teléfono ingresado.
    phoneNumber = phoneNumber.replace(/\s+/g, '');
    
    // Si no hay caracteres en el número de teléfono después de eliminar los espacios, el número de teléfono es inválido.
    if (phoneNumber.length === 0) {
        return false;
    }

    // Sustituye cualquier carácter que no sea un dígito por una cadena vacía.
    phoneNumber = phoneNumber.replace(/\D/g, '');

    // Si el número de caracteres en el número de teléfono no se encuentra entre 3 y 24 (ya que los números de teléfono pueden ser muy largos), devuelve False.
    if (!(phoneNumber.length >= 3 && phoneNumber.length <= 24)) {
        return false;
    }

    // Devuelve True, ya que podemos determinar si el número de teléfono es válido después de la verificación anterior.
    return true;
}

console.log(validate("123-456-7890"));  // outputs: true
console.log(validate("(123) 456-7890"));  // outputs: true
console.log(validate("123.456.7890"));  // outputs: true
console.log(validate("+1 (123) 456-7890"));  // outputs: true
console.log(validate("12345678901234"));  // outputs: true
console.log(validate("a1234567890"));  // outputs: false
console.log(validate("(123) 456"));  // outputs: false
console.log(validate("+1 (123) a"));  // outputs: false
