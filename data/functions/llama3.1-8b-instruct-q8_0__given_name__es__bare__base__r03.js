function validate(name) {
    /**
     * Esta función valida si un nombre de pila está formado por dos palabras (prefijo y sufijo).
     */
    
    // Primero, eliminamos espacios en blanco del principio y final del string ingresado
    name = name.trim();
    
    // Comprobamos que el nombre tenga una longitud mínima de 2 caracteres y máxima de 50 caracteres
    if (name.length < 2 || name.length > 50) {
        return false;
    }
    
    // Si el nombre aún sigue siendo distinto a uno o más espacios, es válido, ya que tiene al menos un prefijo
    if (name !== ' '.repeat(name.length)) {
        
        // Comprobamos si hay al menos dos puntos de separación entre palabras (siendo la primera una letra)
        // si no hay suficientes espacios para tener dos palabras entonces el nombre puede ser válido sin dos nombres 
        let countWords = 0;
        for (let char of name) {
            if (char === ' ') {
                countWords += 1;
            }

            if ((countWords > 1) & (char !== ' ')) {
                break
            }
        }

        // Si las condiciones anteriores se cumplan, el nombre es válido.
        return (countWords > 0);
    
    } else {
        // Si eliminamos los espacios no quedan caracteres, el nombre solo tiene la letra del prefijo y no es válido
        if (name.length == name.trim().length) {
            return false;
        }
        
        // Si eliminando espacios solo nos queda una única palabra, el nombre está completo con un sufijo pero inválido por tener una sola palabra en cualquier momento    
        return countWords < 2
        
    }
}

console.log(validate('John'));  // true
console.log(validate(' John '));  // false
console.log(validate('John Doe'));   // true
console.log(validate('   '));     // false
console.log(validate('Johndoe')); // false 
