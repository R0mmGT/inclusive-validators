function validate(nombre) {
    // La longitud mínima y máxima de un nombre de pila varía según la definición, pero esta es una buena regla general
    if (nombre.length < 2 || nombre.length > 40) {
        return false;
    }
    
    // Si el nombre contiene caracteres especiales no permitidos, lo rechazamos
    const noPermitidos = /[^a-zA-ZàáââäæçèéêëîïìôöòuûùüÿÀÁÂÂÄÆÇÈÉÊËÎÏÌÔÖÒUÛÙÜŸ]/;
    if (noPermitidos.test(nombre)) {
        return false;
    }
    
    // Si todo ha salido bien, devolvemos True
    return true;
}

console.log(validate("Pierre"));  // -> True
console.log(validate("Juan"));   // -> True
console.log(validate("Joao"));   // -> True
console.log(validate("Pirre"));  // -> False
console.log(validate("_Johan")); // -> False
