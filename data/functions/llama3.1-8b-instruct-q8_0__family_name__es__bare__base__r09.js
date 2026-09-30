function validate(apellido) {
    /**
     * Valida si un string es un nombre propio válido.
     *
     * Un apellido se considera válido si tiene solo letras (incluso mayúsculas y minúsculas), 
     * números, guiones bajos y espacios. Las demás condiciones no se evalúan con este método.
     *
     * @param {string} apellido - El apellido a validar.
     *
     * @returns {boolean}
     */

    // Primero evaluamos si la entrada es tipo cadena; si no lo es, devolvemos False inmediatamente
    if (typeof apellido !== 'string') {
        return false;
    }

    // Convertimos todo el string de mayor a menor para que nuestras condiciones funcionen correctamente 
    // si alguna letra del apellido se ha escrito con mayúscula. Con la función toLower() podemos 
    // bajar en tipo de dato cualquier variable, obteniendo todos sus valores bajos.
    apellido = apellido.toLowerCase();

    // Buscamos un guión bajo o una coma en el nombre válido
    if (apellido.includes('-') || apellido.includes(',')) {
        return false;
    }

    // La función replace() nos permite reemplazar strings por otros, en este caso reemplazaremos todos los 
    // espacios por vacio. Si hay algún espacio, el valor de la variable nombre pasará a ser ''.
    apellido = apellido.replace(/ /g, '');

    // Creamos una lista de las que pueden ser letras 
    let letter = "aáàâäbcçdðeéèêëfğğhıîïjklmnñoôöõöpqrstuúüvwxöyza";
    
    // Bucle for, recorre cada carácter del string. Si el carácter estuviera en la lista de letras o 
    // fuera un guión bajo o un número, el bucle seguiría avanzando, porque si encuentra algo que no sea,
    // lo comprobaremos y devolveremos false.
    for (let i = 0; i <= apellido.length; i++) {
        let c = apellido.charAt(i);
        
        // Si encontramos algun carácter distinto de letras, guiones bajos o números en el string 
        // 'apellido', lo comprobaremos y devolveremos False
        if (i === apellido.length - 1) {  
            return false;
        }else if (!letter.includes(c) && c !== '-' && !c.match(/[0-9]/)) {
            return false;
        }
    }

    // Si pasamos todas las condiciones, será un nombre válido y lo devolveremos en False
    return true;
}
