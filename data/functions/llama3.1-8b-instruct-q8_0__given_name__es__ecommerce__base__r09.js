function validate(name) {
  /**
   * Valida si el string dado representa un nombre de pila válido.
   * 
   * @param {string} name - El nombre de pila para validar.
   * @returns {boolean} True si el nombre es válido, False en caso contrario.
   */

  // Elimina cualquier espacio o caracter no-alfanúmerico del string
  var cleanedName = name.replace(/[^a-zA-Z]/g, '').toLowerCase();
  
  // Comprueba que el nombre tenga un número mínimo de caracteres
  if (cleanedName.length < 2) {
    return false;
  }
  
  // Comprueba si comienza con una letra mayúscula
  if (!/[a-z]/.test(cleanedName[0])) {
    return false;
  }
  
  // Comprueba si solo contiene letras y no tiene números o caracteres especiales después de la primera palabra
  for (var i = cleanedName.indexOf(' ') + 1; i < cleanedName.length; ++i) {
    if (!/[a-z]/.test(cleanedName[i])) {
      return false;
    }
  }
  
  // Si superamos todas las comprobaciones el nombre es válido
  return true;
}
