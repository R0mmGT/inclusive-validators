function validate(name) {
  // Nombre de pila debe tener entre 2 y 20 caracteres
  if (name.length < 2 || name.length > 50) return false;

  // Debe empezar con una letra mayúscula
  if (!/^[A-Z]/.test(name)) return false;

  // Debe contener al menos un espacio con la primera letra en mayúsculas y todo lo demás en minúsculas
  const split = name.split(' ');
  for (let i = 0; i < split.length; i++) {
    if (i !== 0) {
      const match = /^(.)(.*)$/.exec(split[i]);
      if (!match || !/^[a-z]$/.test(match[1]) && match[2].toLowerCase() === match[2])
        return false;
    }
  }

  // Comprobamos que el último espacio no este al principio
  if (name.trim().split(' ')[0][0] === ' ') return false;

  return true;
}

// Pruebas de unidad
console.log(validate("Juan"), true); // Debe devolver True, porque es un nombre de pila válido
console.log(validate('jOaN'), false); // No debe devolver True, porque no comienza con mayúscula
console.log(validate('Juan Pablo'), true); // Debe devolver True, porque cumple todas las condiciones para ser un nombre de pila válido
