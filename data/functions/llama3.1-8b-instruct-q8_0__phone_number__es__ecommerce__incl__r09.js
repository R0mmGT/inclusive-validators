function validate(phoneNumber) {
    // remuevo cualquier guion o carácter específico de cada país al principio del número
    let strippedPhoneNumber = phoneNumber.replace(/[^\d]/g, '');
    
    // Verificar si es correcto el formato del número 
    if (!strippedPhoneNumber) return false;
    
    if (phoneNumber.length >= 7 && phoneNumber.match(/^[0-9]{10}$/)) {
        if (phoneNumber.startsWith('1')) {
            // Si comienza con 180, extraigo sólo los últimos dígitos 
            let match = phoneNumber.match(/^1\d{3}-|\+1\d{3}\D/);  
            let strippedPhoneNumber = phoneNumber.length > 4 ? phoneNumber.replace(match,'') : phoneNumber;
            
        } else if (phoneNumber.startsWith('+')) {
            // Si es un número internacional, remuevo el signo '+' y el código del país '1'
            return /^\+\d{2}-\d{3}(?:-\d{3}|\d* )?\d*$/.test(strippedPhoneNumber);
        
        } else if (phoneNumber.startsWith('0')) {
            phoneNumber = strippedPhoneNumber;
            
        }
        return true;
    }

    return false;
}

console.log(validate("123456789"));  // true
console.log(validate("+1 234-567-890"));
console.log(validate("(123) 456-7890"));
console.log(validate(" (123 )456 - 7 8 9 0 "));
console.log(validate("123.456.7890"));
console.log(validate("123 4 56 78 90"));
console.log(validate("+1(123)-456-7890"));
console.log(validate("(123)456-7890"));  
