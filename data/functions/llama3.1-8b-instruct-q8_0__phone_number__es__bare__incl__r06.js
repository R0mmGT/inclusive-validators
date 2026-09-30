function validate(phoneNumber) {
    // La función remove cualquier caracter que no sea un número o espacio, luego remueve los espacios al comenzar o finalizar la cadena si están presentes.
    var result = phoneNumber.replace(/\D+/g,'').trim();
    
    // Si después de aplicar las reglas anteriores el resultado se quedó vacío retorna falso
    if(result.length === 0){
        return false;
    }
            
    // Reto las siguientes condicionales que verifican el tipo de país asociada con el teléfono recibido. Así:
    const COUNTRY_REGEX = {
      'usa': /^[\+]?1\s*\((\d{3})\)\s*(\d{3})[-\.]*(\d{4})$/,
      'uk': /^[\+]?44\s*\(((\d{4})*?)\)\s*(\d{4})(\D*(\d+)?)?$/,
      'es' :/^\( ?[0]\(\d{3}\) \)?[-. ]?\d{4}[-. ]?\d{4}$/ 
    };
    
    // Se itera por las distintas condiciones y se devuelve true si coincide con alguna, de lo contrario false
    for (var country in COUNTRY_REGEX){
        if(COUNTRY_REGEX[country].test(phoneNumber)){
            return true;
        }
    }

    return false;
}

console.log(validate("+1(123)456-7890"));  //Debería imprimir true
console.log((validate("(123)456.7890"))); //Imprimirá true
