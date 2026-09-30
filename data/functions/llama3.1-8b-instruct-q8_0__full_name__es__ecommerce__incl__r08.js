function validate(fullName) {
    // Verifica si la cadena está vacía
    if (!fullName.trim()) {
        return false;
    }

    // Comprueba que la cadena no contenga números ni carácter de puntos en medio del texto, 
    // pero sí pueda ser que existan el punto dentro de las iniciales (por ejemplo "John.Doe")
    var regex1 = /^[A-Za-zÁÉÍÓÚÜÑa-ö0-9 ]+(\.?[A-Za-zÁÉÍÓÚÜÑa-ö0 -]{2,5})+[A-Za-zÁÉÍÓÚÜÑaño0-9 ]*$/;

    // Verifica que la longitud de nombre sea no superior a 50 carácteres
    if (fullName.length > 50) {
        return false;
    }

    // Comprueba si el nombre comienza con una letra (A-Z o a-z), 
    // puede ir un apellidos, pero siempre debe empezar con una letra
    var regex2 = /^[A-Za-zÁÉÍÓÚÜÑaño]+[A-Za-z][^A-Za-z]*/;

    if (regex1.test(fullName) && regex2.test(fullName.slice(0, fullName.indexOf(' ') + 1))) {
        return true;
    } else {
        return false;
    }
}

console.log(validate("John. Doe")); // Devuelve true
console.log(validate("123abc"));     // Devuelve false
console.log(validate(""));           // Devuelve false
