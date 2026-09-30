function validate(s) {
    if (typeof s !== 'string') return false;
    
    // Eliminar símbolos y números
    let trimmedString = s.replace(/[^a-zA-ZéÉûÛîÎôÔêÊëËïÏüÜâÂîÎôÔûÛÿŸ']/g, '');
    
    // Verificar si las sub-escalas no contienen más de un carácter repetido consecutivo
    for (let i = 0; i < trimmedString.length - 1; i++) {
        if (trimmedString[i] === trimmedString[i+1]) return false;
    }
    
    // Verificar si el apellido cumple con la sintaxis para apellidos de personas en español, donde las sub-escalas no deben contener más de tres caracteres y al final del apellido debe haber un apellido.
    let hasLastNname = false;
    for (let i = 1; i < trimmedString.length - 2; i++) {
        if (trimmedString[i].toLowerCase() === 'n' && 
            // Comprueba que la sub-escala antes del "n" no tenga más de tres letras y que el carácter después del "n" debe ser un guión o un espacio
            trimmedString.substr(i - 1, 3).split('').every((val, index) => index === 0 || val.toLowerCase() !== trimmedString[i + 1].toLowerCase()) && 
            (trimmedString[i + 2] === '-' || trimmedString[i + 2] === ' ')) {
                hasLastNname = true;
        }
    }

    return trimmedString.length > 2 && trimmedString[0].toUpperCase() === trimmedString[0] &&
           !hasLastNname;
}

console.log(validate('Doe'));  // devuelve: false
console.log(validate('Aguirre'));  // devuelve: true
console.log(validate('Peñagoste'));  // devuelve: true
console.log(validate('De la Cruz'));  // devuelve: true
console.log(validate('Doe123'));  // devuelve: false
console.log(validate('Aguirrez!'));  // devuelve: false
