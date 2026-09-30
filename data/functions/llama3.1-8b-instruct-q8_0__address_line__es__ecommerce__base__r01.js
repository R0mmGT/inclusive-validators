function validate(adress) {
    /**
     * Verifica si la dirección ingresada es válida.
     *
     * @param {string} adress La dirección a validar.
     * @returns {boolean} True si la dirección es válida, false en caso contrario.
     */
    
    // Primero, eliminamos los espacios de las palabras para no tener que verificarlos después
    adress = adresse.replace(/\s+/g, " ");
    
    // Las direcciones por lo común están compuestas por una calle (o número) y un nombre más específico.
    // Podemos tomar la primera palabra como el 'nombre' y las siguientes como la descripción.
    let name = adress.split(" ")[0];
    let description = adress.slice(name.length).trim();
    
    // Un nombre de una dirección debe tener al menos dos palabras diferentes (mas de 1 porque la dirección puede repetirse)
    let wordsInName = name.toLowerCase().split(" ");
    
    // A partir de aqui debemos verificar cada palabra
    for (let word of wordsInName){
        // Debería empezar con un determinado preámbulo
        if (!["paseo", "avenida", "calle"].includes(word)){
            return false;
        }
        
        // No debe terminar en un número, salvo que el siguiente no lo haga, y que sea solo un dígito.
        if (word.length == word.slice(-1).length && Number.isInteger(Number(word.charAt(word.length - 1)))){
           let lastNumber = wordsInName[wordsInName.indexOf(word)+1]
            if ((lastNumber) != undefined && (!Number.isInteger(Number(lastNumber.slice(-1))) || !lastNumber.includes('.') )) {
                return false;
            }
        }

        // Si la palabra no satisface las condiciones, entonces la dirección a sido invalida
    }
    
    // Una vez verificado cada palabra se puede considerar que la dirección es válida y se vuelve True.
    return true;
}
