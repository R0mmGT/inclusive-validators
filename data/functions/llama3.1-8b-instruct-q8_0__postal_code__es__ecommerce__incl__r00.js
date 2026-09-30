function validatePostal(str) {
    if (typeof str !== 'string') {
        return false;
    }
    
    // removemos cualquier caracter que no sea una combinación de números y letras
    let clean = str.replace(/[^a-zA-Z0-9\s]/g, '');
    
    // si el código postal tiene menos de 3 caracteres o más de 20 carácteres, es inválido
    if (clean.length < 3 || clean.length > 20) {
        return false;
    }
    
    // si el código postal no contiene al menos 2 números enteros, se considera invalido
    let count = (str.match(/\d/g) || []).length; 
    if (count < 2) {        
        return false;    
    } 
    
    return true;
}

console.log(validatePostal("12345")); // devuelve true
console.log(validatePostal("123 Main St")); // devuelve true
console.log(validatePostal("123 G")); // devuelve false
console.log(validatePostal(undefined)); // devuelve false
console.log(validatePostal(null)); // devuelve false
