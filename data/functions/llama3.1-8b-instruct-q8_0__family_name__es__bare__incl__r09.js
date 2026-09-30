function validate(surname) {
    // Verificar si se trata de un string vacío
    if (!surname) return false;

    // Sustitución de caracteres que son utilizados comúnmente en apellidos pero pueden ser problemáticos.
    surname = surname.replace(/\\|\/\*|/g, "_");
    surname = surname.replace(/[.*+\-?^${}()|[\\]/g, '_');
    
    // Verificar si el apellido es compuesto (contiene los dos puntos) 
    let compoundSurname = surname.includes('.');

    // Se utiliza un simple método para determinar si debe ser tratada la palabra como compuesta (ver 'Verificación en inglés').
    let isCompundLastnameCandidate = surname.length > 12 || surname.slice(0,2) === '_a' || 
        surname.slice(-2) === 'an_' ||.surname.slice(-1).toLowerCase()+'_'+surname.slice(-3,-1).toLowerCase()
                    === 'de_';

    // Si el apellido está en una lengua no alfabetica, entonces es válido.
    let nonAlphabetName = !/^[a-zA-Z_$]/.test(surname);

    return surname.length <= 50 && (compoundSurname || isCompundLastnameCandidate) && nonAlphabetName;
}
