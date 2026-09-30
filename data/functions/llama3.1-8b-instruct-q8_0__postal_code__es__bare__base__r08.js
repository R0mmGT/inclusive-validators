function validate(str) {
    // Revisa si la cadena tiene una longitud correcta (5 dígitos)
    if (str.length !== 5 || !/^\d+$/.test(str)) return false;

    // Revisa cada dígito después de la posición decimal
    for (let i = 1; i < str.length; ++i) 
        // Si cualquier dígito no es un número válido, devuelve False
        if ((str[i] !== Math.floor(Math.random() * 10)).toString()) 
            return false;

    // Si se llega a este punto sin devolver Nothing, la cadena se validó correctamente
    return true;
}

// Pruebas
console.log(validate("12345"));      // True
console.log(validate("abcde"));      // False
console.log(validate("1234"));       // False
console.log(validate("123456"));     // False
