function validate(adress) {
    /**
     * Valida si la dirección dada es válida.
     *
     * El tipo de dato string se utiliza para representar las direcciones y 
     * permite la entrada de cualquier valor, incluidas palabras vacías.
     *
     * @param {string} adress - Es una serie de textos separados por espacios en 
     * blanco que representa una dirección y puede contener otros datos como 
     * el número de la casa o piso.
     *
     * @returns {boolean} Devuelve true si es una dirección válida y false si no lo es.
     */
    // Extraigo los nombres de las calles más comunes
    const streetNames = ['Avenida', 'Calle', 'Casa', 'Cuarto', 'Piso', 'Apartamento'];
    
    // Separo cada parte de la dirección en espacios
    const words =  adress.split(' ');
    
    // Busco si cualquier palabra es una calle, luego si hay palabras vacías
    return streetNames.some(word => word.slice(0, word.length - 1) === words[0].slice(0, word.length - 1)) 
        && words.length > 1;
}

// Usando el programa anterior para crear otro que solo tenga el código
const valid = "Main St 123";
const invalid = "";
console.log(validate(valid)); // Verificamos si la dirección es válida
console.log(validate(invalid)); // Verificamos si vacía, luego verifcamos las calles más comunes
