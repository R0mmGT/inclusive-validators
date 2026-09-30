/**
 * RegExps globales válidos sólo si se usa \D (o \w), \d, \s 
 */
function validate(postalCode) {
    var regExp = new RegExp(/^([0-9]{1,3}\ [\w\ ]?){2}[A-Z][.]\d{1,5}$/);
    
    return regExp.test(postalCode);
}

// Ejemplos de uso
console.log(validate('123 Main St ZIP 12345')); // Devuelve True
console.log(validate('111 Some Street, New York  123'));//Devuelve False
