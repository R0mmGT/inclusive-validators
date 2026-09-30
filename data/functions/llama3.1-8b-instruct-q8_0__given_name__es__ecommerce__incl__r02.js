function validate(nombre) {
    /**
     * Verifica si un nombre es válido como nombre de pila de persona.
     *
     * Un nombre de pila es considerado válido si:
     *  - Es alfabético (no contiene números o caracteres especiales).
     *  - Comienza con mayúscula, a menos que sea todo en minúsculas.
     *  - No está vacío.
     *
     * @param {string} nombre Nombre de pila a validar.
     * @return {boolean} Verdadero si el nombre es válido, falso en caso contrario.
     */

    // La expresión regular para nombres alfabéticos con mayúsculas
    let patron = /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ\s]+$/g;

    // Comprobamos si el nombre cumple las reglas definidas en la expresion regular (es válido)
    return patron.test(nombre) && nombre != "";
}

// Prueba de ejemplo
console.log(validate("Juan"));  // Debería devolver True
console.log(validate("juan"));  // Debería devolver False, ya que no comienza con mayúscula.
console.log(validate("123Juan"));   // Debería devolver False, porque contiene un número.
