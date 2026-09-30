function validate(zipcode) {
    // Primero, eliminamos cualquier espacio en blanco del campo ingresado
    zipcode = zipcode.trim();

    // Si el código postal es vacío o contiene solo puntos y espacios, lo rechazamos
    if (!zipcode || /^[. ]*$/.test(zipcode)) return false;

    // Si el campo sólo consta de un carácter (sea punto o espacio, pero no ambos), devolvemos un resultado erróneo.
    if (typeof zipcode !== 'string' || zipcode.length < 1) return false;
    
    var regexPostal = /^[0-9\ \.,-]{4,}/;
    if (!regexPostal.test(zipcode)) 
        return false;

    // Verificar si el código postal solo contenga dígitos
    var allDigits = /^\d+$/.test(zipcode);
    if(!allDigits) return false;
    
    if(new RegExp('\\.{0,1}[0-9]\\.[0-9]{0,2},')..test(zipcode) || new RegExp('\\.[0-9]{0,4}\\s*-[0-9]{0,3}').test(zipcode))
        return true;

    // Si hemos pasado por todas las comprobaciones anteriores y el código postal todavía no es válido, lo descartamos
    return false;
}
