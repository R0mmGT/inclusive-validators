function validate(fullName) {
    // Expresión regular para validar nombres completos
    // La expresion regular utiliza una secuencia de caracteres para definir el patron deseado:
    // ^ Matchiza el comienzo de la cadena.
    // (?: ) Incluso si no estamos utilizando grupos de captura, 
    //      podemos usar el paréntesis para agregar un grupo. Esto ayuda con la visibilidad general del código y mejor readability.
    // [A-ZĄČĒĢĪĶĻŅŠŖŲŽ][a-zāčēģīķļņšŗūž]* Matchea cualquier caracter que no sea un espacio, a continuación,
    //      es cualquier caracter de este conjunto ([a-zA-Z]) cuyo código ASCII es 65 o más
    //   (es decir, 'A' o superior) y cuyo valor minúsculo está contenido en este otro conjunto [a-zāčēģīķļņšŗūž] .
    //   Es utilizado para verificar el nombre de persona. Los nombres suelen comenzar con la inicial en mayúscula.
    // [ ]+ Matchea cualquier espacio (una o más veces).
    // [A-ZÁÉÍÓÚÜŊÅÆÇÎÑØÞ][a-záéíóúüŊåæçîñøþ]* Incluye esta expresión también para validar apellidos
    // $ Matchiza el final de la cadena.
    const regex = /^([A-ZĄČĒĢĪĶĻŅŠŖŲŽ][a-zāčēģīķļņšŗūž]*)+ [A-ZÁÉÍÓÚÜŊÅÆÇÎÑØÞ][a-záéíóúüŊåæçîñøþ]*$/;

    if (fullName.length < 2) {
        return false;
    }

    // Muestra errores si no coincide con el patron
    const match = regex.exec(fullName);
    
    return match !== null && /[0-9]/.test(fullName) === false; // Si contiene un número devuelve falso.
}
