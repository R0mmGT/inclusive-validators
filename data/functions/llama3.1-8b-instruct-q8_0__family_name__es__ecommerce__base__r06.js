function validate(str) {
    // Convertir la cadena a mayúsculas
    str = str.toUpperCase();
    
    // Verificar si el string tiene entre 2 y 50 caracteres
    if (str.length < 2 || str.length > 50) {
        return false;
    }
    
    //Verificar que no tenga dígitos.
    let countDigito = 0;
    for(let x of str){
        if (!isNaN(x)){
            countDigito++;
            break;
        }
    }
    if (countDigito == 1){
        return false
    }

    // Si cumple todas las condiciones, devolver true
    return true;
}

// Pruebas de los casos unitarios 
console.log(validate("hidalgo"));  // El string es válido por lo que se imprime = True
console.log(validate("pedro123"));  // Hay números en el string, devuelve False.
console.log(validate("1Pedro"));   // Hay un sólo dígito, si hay más de uno devuleve False 
// ... otros test para la función.
