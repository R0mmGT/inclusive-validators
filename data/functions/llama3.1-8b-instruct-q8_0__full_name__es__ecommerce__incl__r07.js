function validate(name) {
    // El nombre no debe estar vacío
    if (!name.trim()) return false;

    // El nombre no debe ser demasiado largo (10-50 caracteres)
    if (!(name.length >= 2 && name.length <= 50)) return false;

    // Se separan las partes del nombre por espacio para verificar cada una de ellas.
    let parts = name.split(' ');

    // Verificar que haya al menos dos y máximo cuatro partes en el nombre
    if (parts.length < 2 || parts.length > 4) return false;

    // Verificar que no exista parte en mayúscula
    for (let part of parts) {
        if (part[0] === part[0].toUpperCase()) return false;
    }

    // Si todos los requisitos fueron satisfactorios, el nombre es válido.
    return true;
}

// Para probar la función:
console.log(validate("Juan José Pérez"));  // True
console.log(validate("juan jose perez"));  // False
console.log(validate(""), false);  // False (vacío)
console.log(validate("a"), false);  // False (demasiado corto)
console.log(validate("12345678901234567890"), false);  // False (demasiado largo)
console.log(validate("Juan Pérez López"), true);
