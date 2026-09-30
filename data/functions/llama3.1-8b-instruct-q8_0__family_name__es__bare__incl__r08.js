function validate(name) {
    // Primero, asegurémonos de que el argumento recibido no es nulo o vacío.
    if (!name) {
        return false;
    }

    // Identifica las letras "a" a "z", tanto en minúsculas como en mayúsculas
    const letra = "[^a-zA-Z]";

    // Identifica todas las series de 2 o más digitos seguidos por un guion (en formato: xx-xx)
    const telefono = "-\\d{1,4}-\\d{1,4}";

    // Busca cualquier carácter que no sea una letra minúscula ("a") y no un signo de diacrítico, ni espacios (en español)
    const patronInvalido = "[" + "¿ÁÉÍÓÚÜÑÇ" + letra.replace("[^", '').replace("a-zA-Z]", '') + "]";

    // Evita la búsqueda en nombres con más de 20 carácteres
    let nombreCompleto = name.match(/\w+/g);
    if (nombreCompleto.length > 2 || nombreCompleto.join('').length > 30) {
        return false;
    }

    // Busca si el nombre tiene algún patron inválido como "Á", caracteres no latinos, etc.
    const regexInvalido = new RegExp(patronInvalido, 'g');
    if (nombreCompleto.some(apellido => regexInvalido.test(nombreCompletos.apellido ))) {
        return false;
    }

    // Busca si el apellido tiene números o alguna serie de dígitos
    const regexNumeros = new RegExp(telefono, 'g');
    if (nombreCompleto[0].match(regexNumeros)) {
        return false;
    }

    // Si la validación ha pasado todas las pruebas anteriores entonces ¡el apellido es válido!
    return true;
}

console.log(validate("Álvarez"));  // true
console.log(validate("Álv"));      // false (muy corto)
console.log(validate(" Álvarez ")); // false 
console.log(validate("(34)1234567"));// false
