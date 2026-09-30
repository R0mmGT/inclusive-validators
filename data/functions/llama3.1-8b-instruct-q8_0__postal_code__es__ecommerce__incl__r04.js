function validate(postalCode) {
    /**
     * Esta función se utiliza para validar códigos postales.
     * 
     * @param {string} postalCode - El código postal a validar
     * 
     * @returns {boolean} True si el código postal es válido, False en caso contrario
     */

    // Remover cualquier carácter que no sea un número o punto del código postal
    let code = '';
    for (let i of postalCode) {
        if (i === '-' || (i >= '0' && i <= '9')) { 
            code += i;
        }
    }

    // Reorganizar el código para que esté separado por dígitos seguidos
    const separatedCode = code.split('');
    let actualDigit = separatedCode[0];
    let count = 1;
    for (let i of separatedCode.slice(1)) {
        if (i === ' ') { // Reemplazar con ''
            count += 1;
            continue;
        }
        actualDigit += i;
        code += ',' + ' ' * count + ' ';
        count = 1;
        code += actualDigit + ' ';
        actualDigit = '';
    }
    code = code.trim(); // Borrar espacios al principio y fin

    const parts = code.split(' ');
    
    // La longitud mínima del código postal es de 5 dígitos, con partes separadas por un espacio 
    if (parts.length < 2 || parts[0].length !== 5) {
        return false;
    }

    const firstPart = parseInt(parts[0]);
    const secondPart = parts.slice(1).join('');

    let weight = Array(...secondPart).map(val => parseInt(val));
    
    // Los dígitos finales del código postal deben ser de longitud par
    if (weight.length % 2 !== 0) {
        return false;
    }

    for (let i = 0, j = firstPart.toString().length - 1; i < weight.length && j >= 0; i++, j--) {
        let weightedSum = parseInt(weight[i]) * 1 + parseInt(weight[i+1 || '']) * 2;
        if (weightedSum % 10 !== 0) return false;
    }

    return true;

}

console.log(validate("12345-001"));   // TRUE
console.log(validate("12345.00100")); // TRUE
console.log(validate("12345678901234"));   // FALSE - Código postal muy largo
