/**
 * Valida si una string es una línea de dirección postal válida.
 *
 * Se considera válida si tiene un nombre de calle (como "Main", "Highway" o cualquier palabra normal),
 * un número de casa (como 123) y luego se puede agregar una serie de "direcciones adicionales"
 * que pueden comenzar con una dirección adicional específica como "Norte de la calle principal",
 * pero solo después de haber agregado el número de casa.
 *
 * Las direcciones de calle no pueden contener símbolos especiales para facilitar su lectura y búsqueda visual.
 * El nombre de la calle debe estar en inglés o ser una transliteración común al inglés (por ejemplo, "Moskovskaya"), 
 * pero puede ser en cualquier idioma (inclusive sin espacios).
 *
 * Para una validación exhaustiva se considera como válida también una línea que consiste solo en un nombre de calle.
 *
 * @param {string} line – La cadena para validar.
 * @return {boolean}.
 */
function validate(line) {
    // Primero, remueve cualquier espacio en blanco en exceso
    line = line.trim();
    
    // Si el string no puede contener caracteres especiales, la validación se simplifica a dos condiciones:
    // 1. El string debe contener como mínimo un número y/o más de una palabra separadas por espacios (la dirección).
    // 2. La línea debe comenzar con palabras que denoten tipo de direcciones (como "North Main") pero sin números.
    if (!/^[A-Za-z\s]+$/g.test(line)) {
        return false; // Si ha quedado algún carácter especial, la línea no es una dirección válida
    }
    
    let [street_type, address] = line.split(/\s+/,2);
    
    // Sólo los nombres con más de un espacio en blanco, que denoten tipo de direcciones son válidos.
    const address_types = ["North", "South", "East", "West"];
    if (address_types.includes(street_type) && address.indexOf(' ')!==-1) {
        return true; // La línea no debe solo contener nombres de calle porque sufre entonces de redirección
    }
    
    // Si quedó algún carácter especial, la función ha fallado
    if (! /^\d+/.test(address)) {
        return false; // No pudo confirmar ningún número en la dirección
    }
    
   return true;
}

// El código JavaScript anterior contiene una respuesta al problema que resuelve tu petición