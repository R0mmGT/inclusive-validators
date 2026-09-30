/**
 * Función para validar nombres completos de personas.
 *
 * @param {string} name Nombre a validar.
 * @returns {boolean} Verdadero si es válido, falso en caso contrario.
 */

function validateName(name) {
  // Evitamos que la función devuelva información sensible (como error messages).
  if (typeof name !== 'string') {
    return false;
  }

  // Limpiamos las cadenas (eliminamos caracteres inválidos)
  var onlyLetters = '';
  for (var i = 0; i < name.length; i++) {
    if ((name.charCodeAt(i) >= 97 && name.charCodeAt(i) <= 122) || 
         (name.charCodeAt(i) >= 65 && name.charCodeAt(i) <= 90)) {  
      onlyLetters += name[i];
    }
  }

  // Evitamos nombres con menos de dos caracteres o más de 50
  if (!onlyLetters.length || onlyLetters.length < 2 ||
     onlyLetters.length > 50){

    return false;   
  }
  

  /**
   * Función para comprobar que un string sólo contiene 
   * letras (mayúsculas y minúsculas).
   *
   */
  function soloLetras(str) {
    if (!str){
      return true;
    }

    for (var i = 0; i < str.length; i++) {

        var charCode = str.charCodeAt(i);

        if ((charCode >= 97 && charCode <= 122) || 
            (charCode >= 65 && charCode <= 90)) {
          continue;

        } else {
          return false;
        }

      }
    return true;
   }

  // El nombre debe contener al menos un nombre y, si es el caso, dos apellidos
  if ((onlyLetters.length > 10) && (!onlyLetters.match(/ {1}/))){
  
     var numEspacios = 0;

     for (var i = 0; i < name.length; i++) {

       if (name[i] === ' ') {
         if (++numEspacios > 2)
           return false;
       }

     }
     if (onlyLetters.match(/ {1}/)){
        var names = onlyLetters.split('');
        numEspacios = 0;

        for (var i = 0; i < names.length; i++) {

          if (names[i] === ' ') {
            if (++numEspacios > 2)
              return false;
          }

        }
     } 
     if (soloLetras(onlyLetters)) {
        return true;
     }
    return false;

} else {

    /**
     * Función para contabilizar el número de espacios en un string.
     *
     */
    function contarEspacios(name) {  
      var numEspacios = 0

      for (var i = 0; i < name.length; i++) {
        if (name[i] === ' ') 
          numEspacios++
      }
   return numEspacios;
}

return soloLetras(onlyLetters);
}
}
