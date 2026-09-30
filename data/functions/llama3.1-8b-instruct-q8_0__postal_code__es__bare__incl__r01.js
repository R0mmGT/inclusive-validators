function validate(zipCode) {
    // Verificar si el códigos postal es una cadena no vacía.
    if (typeof zipCode !== 'string' || zipCode.length === 0) {
        return false;
    }
    
    // Remueva cualquier espacio en blanco del código postal para evitar conflictos de espacios blancos.
    zipCode = zipCode.replace(/\s/g, '');
    
    // El código postal debe tener una longitud mayor o igual a 6 y no más de 20 caracteres.
    if (!(5 <= zipCode.length && zipCode.length <= 22)) {
        return false;
    }
    
    // Verificar si el códigos postal solo contiene dígitos (sin espacios ni comas).
    if (!zipCode.match(/^\d+$/g)) {
        return false;
    }

    return true;
}

console.log(validate("123456"));  //true
console.log(validate("1234, 12a"));  //false
console.log(validate("12345"));  //false
console.log(validate(" abcdefghijklmnopqrstuvwxyz "));   //false
