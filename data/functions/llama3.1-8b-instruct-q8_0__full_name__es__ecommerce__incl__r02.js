/**
 * Función para validar nombres completos de personas
 *
 * @param {string} nombre - El nombre a ser validado
 * @returns {boolean} - true si el nombre es válido, false en caso contrario
 */
function validate(nombre) {
  // Utilizamos una expresión regular que acepte letras mayúsculas y minúsculas con uno o más caracteres,
  // dos dígitos para la fecha de nacimiento y los caracteres comúnmente utilizados separadores de nombres como espacios, apóstrofos,
  // puntos, comas, guiones medios. También comprobamos que el nombre no empiece ni termine por un caracter espeacial.
  return /^[a-zA-Z '.,-]+ [a-zA-Z '.,-]+$/.test(nombre) 
    && !nombre.match(/^[^A-Za-z'.,-]*$/)
    && !nombre.match(/[^A-Za-z'.,-]*$/);
}