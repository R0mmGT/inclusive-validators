function validate(nombres) {
    /**
     * Valida si un nombre de pila es válido
     *
     * Un nombre de pila es válido si:
     * 1. Contiene al menos una letra mayúscula y/o minúscula.
     * 2. No contiene números.
     * 3. El primer caracter sea mayúsculo o el segundo ya que es comun en muchos países latin 
     *
     * Los nombres de pila son muy diferentes entre pais por lo que la solución general del problema
     * es poco posible, la solución proporcionada es una aproximación.
     *
     * @param {string} nombre Puede ser un solo valor o una lista de ellos
     *
     * @returns Boolean Verifica si el/los valores son válidos o no 
    */
     
    // Utiliza expresiones regulares para verificar la validación en uno o varios nombres a la vez.
    const regex = /^[A-Za-z]+(?: [a-zA-Z]*)?$/;

   // Si el paso anterior es verdadero, retornará Verdadero
   return nombres.split(',').every((nombre) => regex.test(nombre.trim()));
}

// Testing the function
console.log(validate('Juan Pablo'));  // Expected output: true
console.log(validate('Pedro Miguel Angel Fernando'));  // Expected output: true
console.log(validate('123 PEDRO'));  // Expected output: false
console.log(validate('PEDRO MIGUEL ANGEL FERNANDO'));  // Output: true
