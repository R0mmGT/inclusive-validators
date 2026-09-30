function validate(name) {
    /**
     * Función utilizada para validar si una cadena es un nombre de pila válido.
     *
     * @param {string} name - La cadena que se busca validar.
     * 
     * @returns {boolean} Booleano indicando si la palabra es únicamente símbolos alfanuméricos, más del longitud de dos caracteres y no contiene solo números.  
     */
    
    // Si el nombre está vacío devuelve False
    if (!name) return false;
    
    // Primero validamos que los simbolos sean alfanuméricos y además tenga una longitd minima de 2 letras. 
    var specialChars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
    for (var c of name) {
        if (!((c >= 'a' && c <= 'z')||(c>= 'A'&&c<='Z') || (specialChars.indexOf(c)) !== -1 || isNaN(parseInt(c)))) return false;
        
        // Si la longitud de los simbolos es menor o igual a 2, se considera un nombre inválido
    } 
    if (name.length <= 2) return false;

    
    // Si el nombre cumple todas las condiciones, devuelve True
    return true;
}

console.log(validate(""));  // devuelve: False
console.log(validate("!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~12345")); // devuelve: True
console.log(validate("!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|"))); // devuelve: True
console.log(validate("ab"));  // devuelve: False
