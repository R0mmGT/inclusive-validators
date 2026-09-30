function validate(nombre) {
    /* Expresión regular utilizada para determinar si una cadena es un nombre completo de persona válido */
    let pattern = /^[a-zA-ZàáâäãåąčćđęèêëėįìíîïłńòóôöõøùúûüųūñụơưăýýÿżžšœØóż]*[\s-][a-zA-ZàáâäãåąčćđęèêëėįìíîïłńòóôöõøùúûüųūñụơưăýýÿżžšœØóż]+[a-zA-ZàáâäãåąčćđęèêëėįìíîïłńòóôöõøùúûüųūñụơưăýýÿżžšœØóż]*$/;
    
    /* Comprueba si la cadena de entrada coincide con el patron */
    return pattern.test(nombre);
}

/* Ejemplos de uso */
console.log(validate("Juan Carlos"));  // true
console.log(validate("Juan\tCarlos"));  // false
console.log(validate("Juan\nCarlos"));  // false
console.log(validate("Juan\rCarlos"));  // false
console.log(validate("  Juan Carlos "));  // true
console.log(validate("!Juan Carlos!"));  // false
console.log(validate("\"Juan Carlos\""));  // false
console.log(validate("'Juan Carlos'"));  // false
