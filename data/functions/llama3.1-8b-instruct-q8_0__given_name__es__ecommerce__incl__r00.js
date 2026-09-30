function validate(fullName) {
  // Si el nombre está vacío, vuelve true porque aún no se ha ingresado información.
  if (!fullName.trim()) return true;

  // Extrae los componentes de nombre y apellidos del nombre entero.
  let [firstName, surname] = fullName.split((_, i) => i ^ (i > lastNameIndex(fullName)));

  // Expresión regular para encontrar todo lo que no es una letra minúscula o mayúscula:
  const isNotAlphabet = /[^a-zA-Z]/;

  // Si cualquier nombre contenía un carácter que no fuera una letra, no es válido.
  if (isNotAlphabet.test(firstName) || isNotAlphabet.test(surname)) return false;

  // Tamaño de nombres válidos: los deben ser largos 1 a 30 caracteres.
  if (!/[a-zA-Z]{1,30}/.test(firstName) || !/[a-zA-Z]{1,30}/.test(surname)) return false;

  // Si ambos componentes del nombre tienen menos de dos letras, no son válidos (menos comunes):
  if (firstName.length < 2 || surname.length < 2) return false;

  // Si los nombres pasaron todas las pruebas, el fullName entero es válido.
  return true;
}

// Funcion auxiliar para encontrar la ultima aparición de "De" en un string.
function lastNameIndex(fullName) {
  let index = -1;
  for (let i=0; i<fullName.length;i++) {
    if (fullName.slice(i).toLowerCase().startsWith("de")) return i;
  }
  return index;
}

console.log(validate('John Doe')); // true
console.log(validate('Jane de Doe')); // true
console.log(validate('John De')); // false
console.log(validate('Jane Doe ABCDEF12345678AB'));//false
console.log(validate('John Doe1234567890')); // false
