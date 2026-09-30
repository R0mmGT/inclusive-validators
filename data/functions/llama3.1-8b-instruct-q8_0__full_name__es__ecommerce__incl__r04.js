function validate(name) {
    // La función se encarga de validar si el nombre de usuario es válido
    if (typeof name !== 'string') {
        return false;
    }

    // Evitamos procesar nombres vacíos.
    if (name.replace(/\s/g, "").length === 0){
        return false;
    }

    // Utilizamos un patrón regular que busca al menos una letra y un espacio después de la letra
    let pattern = /^[a-zA-Z][a-zA-Z\s]*$/;

    // Si el nombre se ajusta a nuestro patrón, lo devolvemos
    if (pattern.test(name)) {        
        // El nombre debe tener más de 2 letras 
        if (name.replace(/\s/g,"").length <3) {
            return false;
        }

        // Evitará caracteres no alfabéticos o números.
        if (/[^a-zA-Z\s]/.test(name))
            return false;

        // Un grupo de espacios no debe estar en el inicio, fin ni entre nombres
        let array = name.split(/\s/g);
        for (let i = 1; i < array.length - 1 ; i++) {
           if (/^\w*[a-zA-Z]\w*$/.test(array[i]))
               return false;
        }
        
        // Si pasa por todas las pruebas entonces es válido, así que volvemos verdadero.
        return true;

    } else {                
        return false;       
    }

}
console.log(validate("Maria Rodriguez"));  // Debería ser verdadero
console.log(validate("Rodriguez Maria"));   // Debería ser falso
console.log(validate('1'));      // Debería ser falso
console.log(validate(''));       // Debería ser falso

