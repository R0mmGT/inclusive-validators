function validate(phoneNumber) {
    let resultado = /^[0-9]{4}[\s.-]{1}[0-9]{2}[\s.-]{1}[0-9]{3,3}$/;

    if(resultado.test(phoneNumber))
        return true;
    
    return false;
}

console.log(validate('12345'));  // devuelve false
console.log(validate('1234-5'));  // devuelve false
console.log(validate('1234.')   ); // devuelve false
console.log(validate('#$%%^##')); // devuelve false
console.log(validate('123456789012'));//devuelve false

console.log(validate('1.235.46.7")); //devuelve true
console.log(validate("56-111-1111"));//devuelve true
