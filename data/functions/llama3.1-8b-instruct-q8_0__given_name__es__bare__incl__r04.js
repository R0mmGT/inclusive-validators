function validate(name) {
    // Revisa si la entrada está vacía
    if (name === '') {
        return false;
    }

    // Revisa si el nombre tiene menos de 2 o más de 30 caracteres
    if (name.length < 2 || name.length > 30) {
        return false;
    }

    // Inicializa banderas para nombres con iniciación minúscula y con mayúsculas iniciales
    let startLower = true, firstCap = true;

    // Convierte el nombre a minúsculas
    name = name.toLowerCase();

    // Verifica si existen letras en el nombre (para evitar números o símbolos)
    for (let i = 0; i < name.length; i++) {
        if (!('a' <= name[i] && name[i] <= 'z')) {
            return false;
        }
    }

    // Revisa cada carácter del nombre
    for (let i = 0; i < name.length; i++) {
        let char = name[i];
        
        // Si es una vírgula, comillas dobles o guión se trata como válido
        if (char === ',' || char == '"' || char === '-') {
            continue;
        }
        
        // Si existe más de una repetición consecutiva de un carácter
        if (i > 0 && name[i] === name[i-1]) {
            return false;
        }

        // Caso base para saber si comienza en minúscula o mayúscula, revisa la primera letra del nombre, en minúsculas
        if (name[0].toLowerCase() === char) {
            startLower = true;
        }
        
        // Revisa cada caracter restante aparte de la primera y última
        else if (i !== 1 && i !== name.length-2 && !(char>= 'a' && char <= 'z')) {  
            return false; // si encuentra un carácter que no sea letra se devuelve falso.
        }

        // Muestra una advertencia de que contiene nombre con título incorrecto, excepto en la primera letra
        if (i > 0) {
            firstCap = false;
        }
    }  
        
    // Si el nombre comienza con minúscula o es un nombre no separado por guiones o apostrofe y sí por puntos que contienen título mixto    
    if ((startLower || name.charAt(1)=='-')&& firstCap === false) {
        return(false);
    }

    return true;
}
