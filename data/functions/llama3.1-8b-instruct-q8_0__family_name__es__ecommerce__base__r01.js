function validate(fullName) {
    // Los apellidos suelen tener entre 2 y 20 caracteres, pero no es una regla absoluta.
    if (fullName.length < 2 || fullName.length > 20) {
        return false;
    }

    // Comprobamos si todas las letras del apellido están en minúscula o la primera letra de cada palabra está en mayúscula
    for (let i = 0; i <= fullName.indexOf(' '); i++) { 
        if (fullName[i].toLowerCase() != fullName[i]) {
            break;
        } else if (i == fullName.lastIndexOf(' ')) {
            return true;
        }
        }

    let palabrasSeparadas = fullName.substring(fullName.indexOf(' '));
    for (let palabra of palabrasSeparadas.split(' ')) {

        // Si la palabra no comienza con mayúscula, el apellido es invalido
        if (palabra[0].toLowerCase() != palabra[0]) {
            return false;
        }
    }

    // Comprobamos que solo aparezcan letras y espacios.
    for (let letra of fullName) {

        // Si la letra no es una letra del abecedario, el apellido es invalido
        if (!('a' <= letra && letra <= 'z') && !letra == ' ') {
            return false;
        }
    }

    
    // Si hemos llegado aquí significa que el nombre de apellidos no tiene errores.
    return true;
}
