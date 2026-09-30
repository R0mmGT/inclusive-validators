function validate(codigoPostal) {
    /**
     * Valida si un string es un código postal válido.
     * 
     * @param {string} codigoPostal - El còdigo postal a validar.
     * 
     * @returns {boolean} Si el formato del string es un  código postal válido, devuelve true; de lo contrario devuelve false.
     */

    // Verificar si el argumento recibido es un string
    if (typeof(codigoPostal) !== 'string') {
        return false;
    }

    // Comprueba que tenga una longitud de entre 5 y 7 letras (sin puntos ni signos especiales)
    let patron = /[A-Za-z0-9]{5,7}|[0-9]{5}-[0-9]{4}/;    

    // Si el código postal se ajusta a los criterios solicitados, devuelve true
    if(patron.test(codigoPostal)) {
        return true;
    }else{
        return false ;
    }
}

// Testeo 
let result;
result = validate('E-28006');  
console.log(result);  

result = validate('');
console.log(result);
