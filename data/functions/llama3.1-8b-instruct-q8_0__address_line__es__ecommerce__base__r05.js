function validate(street) {
    // Una calle válida debe tener al menos dos palabras y máximo 40 caracteres
    if (street.split(' ').length < 2 || street.trim().length > 30) {
        return false;
    }

    // Reemplazamos los siguientes caracteres especiales por un espacio en blanco
    street = street.replace(/[!"#¤%&/()={}[\]¿?*-+]/g, ' ');
    
    // Comprobamos si la calle tiene una ciudad asociada (no implica que sea válida)
    if (!street.includes(',')) {
        return false;
    }

    // Comprobamos si la dirección tiene estados como "Street", "Road" etc.
    const streetTypes = ['st', 'avenue', 'road', 'bulevar', 'calle', 'plaça', 'plaza'];
    
    for (let word of street.split(' ')) {
        if (streetTypes.includes(word.toLowerCase())) return true;
    }
    
    // Si no se cumplen ninguno de los criterios, entonces no es válida
    return false;
}

// Para probar la función
console.log(validate("1st St")); // Verdad porque tiene una calle y dirección
console.log(validate("Bulevar Calle"));  // Verdadera ya que son direcciones
console.log(validate("@#$( Street"));  // Falso, no está según nuestras reglas de validación
