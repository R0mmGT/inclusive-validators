function validateStreet(string) {
    /**
     * Función para validar si una cadena de texto es una línea de dirección postal válida.
     *
     * @param {string} string La línea de dirección a validar.
     * @returns {boolean} True si la línea es un calle válido, False en caso contrario.
     */
    
    // Primero, eliminamos todos los espacios al principio y final de la cadena
    string = string.trim();
    
    // Comprobamos si la entrada está vacía
    if (string.length === 0) {
        return false;
    }
    
    // Si la cadena solo contiene números o un punto, no es una calle válida
    if (/^\d+(?:\.\d+)*$/.test(string)) {
        return false;
    }
    
    // Reemplazamos todos los caracteres no alfanuméricos y espacios con un guión medio (-)
    string = string.replace(/[^a-zA-Z0-9\s\-]/g, '-');
    
    // Comprobamos si la calle es demasiado larga
    if (string.length > 50) {
        return false;
    }
    
    // Si alguna palabra del nombre de la calle es demasiado común, no es válido
    // Se pueden agregar más palabras comunes como necesidad y priorizar una buena gestión de caracteres para el uso general, ya que estos strings se utilizarían globalmente.
    const commonStreetNames = ['Avenida', 'Calle', 'Carrera', 'Piso'];
    
    let words = string.split(' ');
    if (words[0].toLowerCase() === 'avenida') {
        return false;
    }
    for (let word of words)  {
        if (commonStreetNames.includes(word.toLowerCase())) {
            return false
        }   
    }
      
    // Si pasa por todas las comprobaciones, es una calle válida
    return true;
}

// Comprueba cada una de las siguientes cadenas con la función validate
const tests = [
    'Main St',
    '123 Main St',
    '',
    '1,234 Main St',
    '  Main St ',
    'Avenida 2',
    'Calle del pueblo',
    '1234 Piso A',
];

tests.forEach(test => {
    console.log(`El valor '${test}' es una calle válida: ${validateStreet(test)}`);
});
