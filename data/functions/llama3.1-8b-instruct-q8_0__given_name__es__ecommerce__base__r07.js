/**
 * Valida si un string es un nombre de pila válido.
 *
 * Un nombre de pila de persona se considera válido si cumple las siguientes condiciones:
 *   - Tiene entre 2 y 20 caracteres inclusive.
 *   - Solo contiene letras mayúsculas o minúsculas (no otros caracteres).
 *
 * @param {string} name Nombre de pila a validar.
 * @return {boolean} Verdadero si el nombre es válido, falso en caso contrario.
 */
function validate(name) {
  // Reemplazamos todo lo que no sean letras con un espacio para tener una forma más segura de 
  // comprobar si solo contiene letras mayúsculas o minúsculas
  const cleanName = name.replace(/[^a-zA-Z]/g, " ");
  
  // Si el tamaño del nombre no es entre 2 y 20 caracteres no devuelve verdadero.
  if (cleanName.length < 2 || cleanName.length > 20) {
    return false;
  }
  
  // Si alguna letra del nombre es mayúscula, lo marcamos como espacio para contar las de menor a 
  // mayúscula que sean menores. Esto porque la condición original ya nos ha reemplazado las que son
  // mayúsculas.
  let minCuenta = 0;
  for (let i = 0; i < cleanName.length; i++) {
    if (cleanName[i] === ' ') {
      continue;
    } else {
      const asc = cleanName.charCodeAt(i);
      if (32 <= asc && asc <= 96) { // ASCII de letras minúsculas
        minCuenta++;
      }
    }
  }

  // Si no se encontraron ni una letra, entonces devuelve falso porque no tiene palabras.
  if (minCuenta === 0) {
    return false;
  } else {
    return true;
  }
}
