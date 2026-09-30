/**
 * Valida si el nombre es válido como nombre de pila de persona.
 *
 * Un nombre es considerado válido si no está vacío, contiene menos de 50 caracteres y 
 * no comienza ni termina con espacios en blanco ni signos de puntuación.
 *
 * @param {string} name - Nombre a validar
 * @returns {boolean} True si el nombre es válido, False de otro modo
 */
function validate(name) {
    // Revisamos si el nombre está vacío o contiene menos de 50 caracteres.
    if (name.length < 1 || name.length > 50) {
        return false;
    }

    // Revisamos si el nombre comienza o termina con signos de puntuación.
    const start = name[0];
    const end = name[name.length - 1];

    let containsSpecialCharInFirstOrLastPosition = start.match(/[!,@#$%^&*()`~;:{}|<>\[\]?\-_]/) || end.match(/[!,@#$%^&*()`~;:{}|<>\[\]?\-_]/);

    if (containsSpecialCharInFirstOrLastPosition && containsSpecialCharInFirstOrLastPosition !== null) {
        return false;
    }

    // Si el nombre cumple todas las condiciones, lo consideramos válido.
    return true;
}
