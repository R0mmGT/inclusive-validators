function validate(direccion) {
    // Expresión regular para validar una dirección postal. Esta expresión busca cualquier cadena que no esté vacía, 
    // comience por al menos un carácter de letra mayúscula o minúscula y que contenga dos puntos en alguna parte.
    let pattern = /^[A-Za-z0-9\s]+,\s*[A-Za-z0-9\s\.]+\s*(\d{1,4}|\d{1,3}\s\d|\w\s\d{1,6}\s\d)\s*\/*[A-Za-z\s]*$/;
    
    // Utiliza la función test() para determinar si el patrón se ajusta a la entrada.
    return pattern.test(direccion);
}

// Test la función
console.log(validate("123 Street, city"));  // Valor esperado: true
console.log(validate("456 Main St"));  // Valor esperado: false (falta municipio/comuna)
console.log(validate(""));  // Valor esperado : false (dirección invalida vacía)
