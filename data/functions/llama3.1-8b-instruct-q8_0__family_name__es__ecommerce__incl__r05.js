function validate(lastName) {
    // Se inicializa una variable con patrones de nombres comunes (de diversas nacionalidades)
    let nombreComunes = ["De", "Van", "Sousa", "Davila", "Moreno", "Gonzalez", "Martinez", "Hernandez",
        "Rodriguez", "Lopez", "Garcia", "Sanchez", "Perez", "Gil", "Fernandez"];
    
    // Se inicializa una variable con patrones de apellidos comunes (de diversas nacionalidades)
    let apellidoComunes = ["Aguilar", "Alvarez", "Andrade", "Aranda", "Arias", "Barrios", "Benitez",
         "Bonilla","Bustos", "Cabrera", "Castillo", "Corrales", "Davila", "Delgadillo",
        "Estrada","Espinosa",'Escobar', 'Fernandez', 'Flores','Garcia'];
    
    // Se convierte la cadena a mayúsculas
    lastName = lastName.toUpperCase();
    
    // Si el apellido tiene menos de 3 caracteres, devuelve False
    if (lastName.length < 3) {
        return false;
    }
    
    // Si el apellido consta solo de dos letras seguidas, devuelve False
    for (let i = 0; i < lastName.length-1; i++) {
        if (lastName[i] === lastName[i+1]) {
            return false;
        }
    }
    
    
       /**
      * Eliminar la primera parte del apellido compuesta de 'de' o 'van'
      */
    let patronApellidoCompuesto = /^\d{2,}|[A-Z]{2}[a-zéóíú]*/g // reemplaza lo que cumpla con la expresión
    let nombrePersonaFinal = lastName.replace(patronApellidoCompuesto, '');
    
       
    
    /**
     * Buscar en arreglos de nomnbres y apellidos comunes.
     */
        
    if (nombreComunes.map(comp->comp.upper()).includes(lastName)) {
        return false;
    }
    for (const x of apellidoComunes) {
        const upperApellido = x.toUpperCase();
        if (lastName.includes(x.toLowerCase())) {
            if (upperApellido === lastName) {
                return true;
            } else if (lastName.substring(lastName.length-upperApellido.length)
                .includes(upperApellido)) {
                    return true
                }
            }
    }

    /**
     * Verificar si se encuentran los patrones de nombres o apellidos comunes en la cadena del argumento.
     */
    
        let patronApellidoComun = new RegExp(`\\b(${nombreComunes.join('|')})\\b`, 'i');
        if (lastName.match(patronApellidoComun)) {
            return false;
        }
        
    /**
     * Aplicar diferentes reglas a la posición de las posibles palabras
     */
    
    let wordsInLastName = lastName.split(' ')
    
  
    
    // Con la función `forEach()` para aplicar una regla específica en todo el Array.
    function esNulo(v) {
        return v === null;
           }
             if(wordsInLastName.some(isNull)) return false
    
   
    /**
     * Buscar patrones y realizar las validaciones
     */
   
            let patronApellido = new RegExp('(\\w)', 'i');
          let lastMatchIndex = 0
          
        for (const [index, charIndex] of wordsInLastName.entries()) {
            
          if (lastName[charIndex].search(patronApellido)!==-1)
          {
         return false; } }
    return true;
}

console.log(validate('SANCHEZ'));     // Output: true
console.log(validate('//sanchez'));    // Output: false
