function validateApellido(apellido) {
  // Primero, verificamos que la cadena no esté vacía
  if (!apellido.trim()) {
    return false;
  }

  // Luego, comprobamos si el apellido está entre las primeras letras.
  let primerasLetras = "abcdefghijABCDEFGHIJ";
  let ultimasLetras = "ñÑáÁéÉíÍóÓúÚüÜ";
  
  for (let letra of apellido) {
    if (!primerasLetras.includes(letra.toUpperCase())) {
      return false;
    }
  }
  
  // Si la función no devuelve falsy, el apellido es válido
  return true;
}

console.log(validateApellido("García"));  // Devuelve: true
console.log(validateApellido("Zorro"));   // Devuelve: false
console.log(validateApellido("#!%" ));    // Devuelve: false
