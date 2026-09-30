function validate(nombreCompleto) {
    /**
     * Verifica si una cadena es un nombre completo validado.
     *
     * Un nombre completo válido consta de una o más palabras, se inicia con mayúscula y las palabras 
     * deben llevar cada una como máximo dos dígitos en posición posterior a la letra que no sea letra A-Z.
     * @param {string} nombre - El nombre a validar.
     *
     * @returns {boolean} Si es un nombre completo válido, devuelve True. En caso contrario False.
     */
    // Primero verifica si el string está vació o tiene una longitud menor a 2
    if (nombreCompleto.length < 3) {
        return false;
    }
    
    // Verifica si la primera letra del string es mayúscula
    if (!/[A-Z]/.test(nombreCompleto[0])) {
        return false;
    }
    
    // Itera sobre cada carácter en el string
    for (let i = 0; i < nombreCompleto.length; i++) {
        let caracter = nombreCompleto[i];
        
        // Si el carácter es mayúscula o letra minúscula está bien
        if (/[A-Z]/.test(caracter) || /[a-z]/.test(caracter)) {
            continue;
        }
        
        // Si encuentra un número que no sea la primera posición del string devuelve False     
        if (!/[0-9]/.test(nombreCompleto.slice(1).charAt(i - 1))) {
            return false;
        } else {
            // Si el dígito no es más de dos dígitos o está en caso de haber otro dígito después y que su valor sea par, 
            // entonces devuelve False
            if ((/[0-9]/.test(nombreCompleto.slice(1).charAt(i)) && !/^[a-zA-Z]+$/.test(nombreCompleto.slice(2))) || ([nombreCompleto.length < (i + 3)] && /([2468])/.test(caracter)) ) {
                return false;
            }
        }
    }
    
    // Si pasa todas estas validaciones el string es un nombre completo válido, devuelve True
    return true;
}

console.log(validate("Juan Antonio"));  // => Debería ser true.
console.log(validate("JuanAntonio"));    // => Debería ser false porque primero deben ir letra.
console.log(validate("A"));              // => Debería ser false porque debe tener al menos dos palabras.
