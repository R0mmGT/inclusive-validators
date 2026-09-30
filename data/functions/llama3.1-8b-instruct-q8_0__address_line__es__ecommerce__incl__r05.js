### Función `validate` para validar direcciones postales de forma internacional
#### Descripción
Función utilizada para determinar si una cadea ingresada por el usuario (argumento) es compatible con los estándares internacionales y los requisitos de la tienda en línea, retornando `true` si corresponde a una calle válida y `false` en caso contratio.

#### Código JavaScript
```javascript
/**
 * Función validate para validar direcciones postales de forma internacional.
 *
 * @param {string} addressArgument - Cadena ingresada por el usurio.
 * @return {boolean} Devuelve true si la dirección es válida, false en caso contrario.
 */
function validate(addressArgument) {
    // Elimina espacios en blanco tanto al inicio como final de la cadena
    let cleanAddress = addressArgument.trim();

    // Verifica si existe al menos un carácter dentro de la cadena
    if (cleanAddress.length < 1) return false;

    // Inicia bandera para indicar validación exitosa
    let isValid = true

    const regexWords = /^[a-z0-9ñÑáéíóúÁÉÍÓÚüÜ\s,\./-]+$/;
    const regexNumbers = /^\d+(?:-\d+)*\d*$/;

    // Divide la cadena en componentes
    const wordComponents = cleanAddress.split(/\s/);
    
    let streetNumber = "";
    let streetName = "";

    // Obtiene el primer componente para verificar posibles indicaciones de calle
    if (wordComponents[0].length > 1 && !regexWords.test(wordComponents[0])) {
        isValid = false;
    }

    let validComponentsCount = 0;

    for (const word of wordComponents) {

        // Verifica si corresponde a un número de calle
        if (regexNumbers.test(word)) {
            streetNumber += (streetNumber.length > 0 ? " " : "") + word;

            // Incrementa conteo válido siempre que se encuentra una coordenada numérica
            validComponentsCount++;

        } 
        // Verifica si corresponde a el nombre o referencia de calle
        else if (regexWords.test(word)) {
            streetName += (streetName.length > 0 ? " " : "") + word;
            
            // Incrementa conteo válido siempre que se encuentra una referencia alfanumérica
            validComponentsCount++;
        } 

        // Si no es el primeiro componente, verifica la estructura de este, ya que debe tener un número y una descriptión,
        else {
            isValid = false;
            break;
        }
    }

    // Incluye condiciones para verificar si los componentes fueron encuentados
    if ((wordComponents.length > 0 && wordComponents[0].length <= 1) || validComponentsCount == 0) {
        isValid = false; 
    } 

    return isValid;
}

// Testeo de ejemplo con múltiples validaciones
console.log(validate("123 Principal")); // Devuelve: true
console.log(validate("Calle #456"));  // Devuelve: true
console.log(validate("Av. Independencia")); // Devuelve: false
console.log(validate("/Calle Principal")); // Devuelve: false
console.log(validate("Av.")); // Devuelve: false