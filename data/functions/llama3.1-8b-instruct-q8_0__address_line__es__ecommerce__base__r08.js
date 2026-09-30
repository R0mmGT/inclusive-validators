function validate(dir) {
    // Primero, removemos espacios blancos iniciales y finales
    dir = dir.trim();
    
    // Si la dirección vacía o contiene más de 50 caracteres, la consideramos inválida
    if (dir.length === 0 || dir.length > 50) {
        return false;
    }
    
    // Reemplazamos cualquier carácter que no sea una letra o un dígito con un espacio
    for (let i = 0; i < dir.length; i++) {
        if (!((dir[i] >= 'A' && dir[i] <= 'Z') || (dir[i] >= 'a' && dir[i] <= 'z') || (dir[i] >= '0' && dir[i] <= '9'))) {
            dir = dir.substring(0, i) + ' ' + dir.substring(i+1);
        }
    }
    
    // Si después de todo aún contiene espacios en blanco, significa que tiene caracteres que no son válidos
    if (dir.replace(/\s+/g, '') === '') {
        return false;
    }
    
    /* Esta regla sigue el modelo inglés (USA)
    - Incluye números para indicar el house number o un apartamento y la strasse number.
    */
    let regex = /^([A-Za-z0-9\s]+)?[0-9]{1,}[A-Za-z0-9\s]*/;
    
    // Si la expresión regular coincide con todo nuestro string entonces lo devuelve verdadero. De otra forma lo devolverá falso
    return regex.test(dir);
}

console.log(validate("Address"));  // False: es demasiado corta
console.log(validate("Too long address that is more than 50 characters verylong"));
// False: tiene caracteres que no son válidos
console.log(validate("1234   Main St"));
// false: No comienza con un dígito, se consideraría una strasse
console.log(validate("1234A Main St")); // Falso: No contiene el street number
console.log(validate("14 Street"));
// f, No tiene el house number ni el strasse número.
console.log(validate("  1234 Main St  "));
// True: Es una validación de dirección postal americana
