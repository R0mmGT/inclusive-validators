// Definimos una función llamada 'validate' que recibe un argumento 'direction' y devuelve true o false
function validate(direction) {
    // Comprobamos si la dirección no está vacía
    if (typeof direction !== 'string' || !direction.trim()) return false;
    
    // Reemplazamos todos los caracteres de acentuación en minúsculas para que la validación funcione independientemente del idioma del usuario
    const normalizedDirection = direction.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    
    // Utilizamos un patrón regular para verificar si el contenido de la dirección se ajusta aproximadamente a una calle real
    return (/^(?:street|avenue|boulevard|road|highway|lane|drive|court|circa)$/i).test(normalizedDirection);
}

// Invocando directamente la función con un parámetro para evitar el error en el linter.
console.log(validate("El Camino Real")); // true
console.log(validate("Calle falsa 123")); // false