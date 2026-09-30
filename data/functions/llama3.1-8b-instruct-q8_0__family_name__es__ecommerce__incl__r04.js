/**
 * Valida si la entrada es un apellido válido.
 *
 * Un apellido se considera válido si cumple las siguientes condiciones:
 * 1. Cumplir con patrones comunes de aposento de personas reales, como Apellido o apellido.
 * 2. No contenga palabras o nombres de lugares, como ciudad o país, salvo para aquellos usuarios
 *    que están actualizando su registro y tienen ya establecido en la base de datos un
 *    nombre de usuario válido que coincide con uno de estos patrones.
 *
 * @param {string} last_name - El apellido a validar.
 *
 * @returns {boolean} true si el apellido es válido, false en caso contrario.
 */
function validate(last_name) {
    // Primero, se supone que todos los apellidos deben ser palabras únicas, por lo que comprobamos eso
    if (last_name.split(' ').length !== 1) return false;
    
    // Luego, eliminamos cualquier símbolo y pasamos el string a minúsculas.
    // Al pasar al minúscula, todos los nombres seguirán siendo apellidos válidos, ya que no contendrán
    // caracteres distintos de una serie de letras. (Ej: Smith -> smith)
    
    let apellidoLimpiado = last_name.toLowerCase().replace(/[^a-z0-9\s]/gi,'');
        
    // Luego comprobamos los patrones más comunes para apellidos, así como lugares que son comunes
    // como nombres de personas.
    const validLastNames = / smith | Johnson | Williams | Brown| Jones| Garcia| Miller| Davis| Rodriguez| Garcia| Lopez| Hernandez| Smith|
                             martinez | thompson | white | lópez | marquez | rodriguez | martin| gonzalez|mendez|lopez.*/i;
    const locations = /usa|russia|canada|china|france|germany|italy|spain|iran|india|japan|uae|europe|;
        
    // Al final de todo, simplemente comprobamos si el apellido sigue siendo válido.
    return validLastNames.test(last_name) || locations.test(apellidoLimpiado);

}
