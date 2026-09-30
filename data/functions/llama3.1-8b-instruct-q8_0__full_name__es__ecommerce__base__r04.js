function validate(name) {
    // Si el nombre es vacío, devuelve false
    if (!name.trim()) {
        return false;
    }

    // Define qué caracteres de cada parte del nombre están permitidos
    const allowedFirstNameChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÑÁÉÍÓÚÜ';
    const allowedLastNameChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÑÁÉÍÓÚÜ';

    // Asume que el nombre está compuesto por dos partes: el primer apellido y el segundo apellido
    const nameParts = name.split(' ');
    if (nameParts.length !== 2) {
        return false;
    }

    // Comprueba si los primeros nombres están dentro del rango permitido
    for (let i = 0; i < name Parts[0].length; i++) {
        if (!allowedFirstNameChars.includes(nameParts[0][i])) {
            return false;
        }
    }

    // Comprueba si los segundos nombres están dentro del rango permitido
    for (let i = 0; i < nameParts[1].length; i++) {
        if (!allowedLastNameChars.includes(nameParts[1][i])) {
            return false;
        }
    }

    // Si todas las partes de la nombre son válidas, devuelve true
    return true;
}
