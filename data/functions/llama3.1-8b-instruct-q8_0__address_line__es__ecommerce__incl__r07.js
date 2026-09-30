function validateDirección(dirección) {
    // Verifica si dirección no es null o indefinido o vacío.
    if (!dirección) {
        return false;
    }

    // Reemplaza caracteres de acentos y espacios en blanco no normales con un espacio estándar.
    dirección = dirección.toLowerCase().replace(/á|é|í|ó|ú|ü/g, 'a');
    dirección = dirección.replace(/ñ/g, 'n');
    dirección = dirección.replace(/ç|à|/g, 'c');
    dirección = dirección.replace(/\s+/g, " ");

    // Verifica si dirección no contiene ninguno de los siguientes caracteres invalidos.
    invalidChars = /[<>~`#$%\&*\(\)\-\[\]\{\}\;\':"\\\/,]/;
    if (invalidChars.test(dirección)) {
        return false;
    }

    // Verifica longitud de dirección, más de 2 carácteres y menos o igual a 200
    if ((dirección.length <= 2) || (dirección.length > 200)) {
        return false;
    }

    // Verifica si cada parte de la dirección tiene una longitud mínima de dos caracteres.
    palabras = dirección.split(" ");
    for (var i=0; i<palabras.length; i++) {
        if (palabras[i].length < 2) {
            return false;
        }
    }

    // En caso que todo esto pase, consideramos una dirección válida.
    return true;
}

// Ejemplo de uso: console.log(validateDirección("123 Calle Principal"));
