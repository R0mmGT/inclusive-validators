function validate(name) {
    /**
     * Valida un nombre de pila de persona.
     *
     * Args:
     *      name (str): El nombre a validar.
     *
     * Returns:
     *      bool: verdadero si el nombre es válido, falso en caso contrario.
     */

    // Si el nombre está vacío, no es válido
    if (!name) {
        return false;
    }

    // Primero eliminamos cualquier espacio en blanco al principio o final del nombre
    name = name.trim();

    // Creamos una lista de nombres comunes que son iniciales válidas según la convención inglesa
    const initials = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // Si el nombre está vacío después de eliminar los espacios, no es válido
    if (!name) {
        return false;
    }

    // Convertimos el nombre a mayúsculas para evitar que la función devuelva verdadero si se pasa un nombre con iniciales en minúscula
    name = name.toUpperCase();

    // Si ninguna de las letras del nombre son iniciales, no es válido
    if (name.split('').every(char => !initials.includes(char))) {
        return false;
    }

    // Si el último caracter del nombre podría ser una inicial según lo definido arriba y si cualquier otro carácter fuera algo aparte de una posible inicial o un espacio en blanco, no es válido
    if (name.split('').last().includes(' ') || [...name.split('').filter(char => char && !initials.includes(char))].length > 1) {
        return false;
    }

    // Si pasaste todas las comprobaciones, el nombre podría ser válido. Por esto retornamos true.
    return true;
}

console.log(validate("Daniel Alejandro"));  // True
console.log(validate("   "));                 // False
console.log(validate("John"));                // True
console.log(validate("J"));                   // False
console.log(validate(""));                    // False
console.log(validate("", " "));               // False
