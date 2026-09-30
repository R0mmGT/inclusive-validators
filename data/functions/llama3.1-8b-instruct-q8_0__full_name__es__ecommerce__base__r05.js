function validate(fullName) {
    // Sólo se aceptan nombres con letras mayúsculas y minúsculas, puntos y espacios
    if (!/^[a-zA-Z .,]+$/.test(fullName)) {
        return false;
    }

    // Revisa si están presentes todos los atributos mínimos requeridos 
    let nameParts = fullName.trim().split(/\s+/);
    
    switch (true) {
        case nameParts.length === 1:
            // Si el nombre completo solo tiene un apellido o un nombre simple
            if (!/[A-Za-z]$/.test(nameParts[0])) {
                return false;
            }
            break;

        default:
            // Si hay como mínimo dos nombres se requiere un apellido y los demás datos personales.
            let name = [];
            for (let part of nameParts) {
                if (part.length > 1 && part.split('').some(c => /[A-Za-z]/.test(c))) {
                    name.push(part);
                }
            }

            if (name.length < 2 || name.some(a => !/[A-Z]/.test(a[0]))) {
                return false;
            }
    }
    
    // Sólo se aceptan nombres con máximo dos mayúsculas en cada parte 
    for (let part of nameParts) {
        let capitalLetters = 0;
        for (let c of part.toUpperCase()) {
            if (/^[A-Z]$/.test(c)) {
                capitalLetters++;
            }
        }

        // Si hay más de una letra inicial en cualquier sección y no es título ni apodo
        if (capitalLetters > 1) {
            return false;
        }
    }

    // Sólo se aceptan nombres con máximo dos títulos en todo el nombre
    let titles = ["MR", "MRS", "MISS", "DR.",];
    capitalLetters = 0;

    for (let word of fullName.split(" ")) {
        if (titles.some(t => word.toUpperCase() === t)) {
            capitalLetters++;
        } else if (/[A-Z]/.test(word[0])) {
            capitalLetters++;
        }
    }

    if (capitalLetters > 2) {
        return false;
    }
    
    // Sólo se aceptan nombres que tienen un prefijo o sufijo "de", además del nombre 
    let index = fullName.indexOf(" de ");
    if (-1 < index && fullName.slice(0, index).trim().split(" ").length > 4) {
        return false;
    }

    // Si los campos satisfacen todas estas validaciones, se retornará true para permitir su procesamiento. De lo contrario, false
    return true;
}
