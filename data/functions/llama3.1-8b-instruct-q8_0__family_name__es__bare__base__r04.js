function validate(lastName) {
    // El apellido no debe estar vacío.
    if (!lastName.trim()) return false;
    
    // El primer caracter del apellido no puede ser un numeral o caracteres especiales. 
    if (/^(\d|[^a-zA-ZαΑβΒγΓδΔεΕζΖηΗΘІΙΚΛΜΝΞΩΟΠΡΩΣΦΧΨΡΣΤΥΦΧΫYiiUu])/i.test(lastName[0])) return false;
    
    // El apellido no puede tener más de 50 caracteres.
    if (lastName.length > 50) return false;
    
    // Comprobamos la existencia del ultimo caracter en minúscula.
    if (!/[a-z]/.test(lastName.toLowerCase())) return false;

    // Si no hemos regresado falso, el apellido es válido
    return true;
}

console.log(validate('Gómez'));  // true
console.log(validate('12345'));  // false
console.log(validate('hola'));   // false
console.log(validate('Antonio García'));
