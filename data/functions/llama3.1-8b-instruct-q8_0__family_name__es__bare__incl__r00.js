/**
 * Valida si una cadena es un apellido de persona válido.
 * 
 * @param {string} nombreApellido - El nombre completo a validar.
 * 
 * @returns {boolean} True o false según sea el caso
 */
function validate(nombreApellido) {
    // Comprueba que la cadena no esté vacía
    if (!nombreApellido.trim()) return false;
    
    // Se debe encontrar un espacio en la cadena (para un nombre-completo)
    var encontrarEspacio = new RegExp(' ');
    
    if(!encontrarEspacio.test(nombreApellido)) {
        return false;  // Si no contiene un espacio retorno False
    }
    
    // Comprueba si el apellido está en mayúsculas o en minusculas, pero se debe comenzar con mayúscula la primera palabra.
    var esCorrecto = new RegExp('^[A-Z]')
    
    if(!(esCorrecto.test(nombreApellido.split(' ')[0]))) {
    	return false; // Si no cumple el formato de Letra Mayuscula comienzo
    }
    // Se debe validar que solo contenga letras, el guión bajo, la coma ni ningún otro caracter especial.
	var patron = new RegExp(/^[A-Z]+ [a-z]+ [a-z]*[-\' ]? [A-Za-z]+$/);
    
	if(!patron.test(nombreApellido)) {
        return false;  // Si no cumple con formato retorne False
    }
	return true; // Si el nombre Cumplen todas las condiciones en el funcion, retorne True.
}