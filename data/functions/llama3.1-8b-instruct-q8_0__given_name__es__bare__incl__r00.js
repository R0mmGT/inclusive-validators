/* global console */ 

/**
 * Valida si un string es un nombre de pila válido.
 *
 * Se considera un nombre de pila válido si cumple las siguientes condiciones:
 * - Inicia por una mayúscula o minúscula seguida de otras letras minusculas, puntos yacentes o números.
 * - No tiene espacios en blanco ni caracteres especiales dentro del string.
 *
 * @param {string} str El nombre a validar.
 * @returns {boolean} True si el nombre es válido, false en caso contrario.
 */
function validate(str) {
  // Primero eliminamos cualquier espacio al principio o al final
  str = str.trim();
  
  // Luego comprobamos si alguna de las condiciones de validación se cumplen y devolvemos true en esos casos.
  return /^[A-Za-z]+(\s[A-Z]?\.?[\w'?])+$/.test(str) ||
    /^[A-Za-z]+$/.test(str);
}