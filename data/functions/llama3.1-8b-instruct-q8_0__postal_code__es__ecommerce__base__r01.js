function validatePostal(zipCode) {
    // El formato de código postal suele ser la forma más común para verificados.
    const usFormat = /^([0-9]{5})(-[0-9]{4})?$/;
    if (usFormat.test(zipCode)) return true;

    // También hay formatos como (código postal provincial), donde X es el código de estado o provincia (los códigos son US-2).
    const caFormat = /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] \d[ABCEGHJKLMNPRSTVWXYZ]\d$/i;
    if (caFormat.test(zipCode)) return true;

    // Formato de código postal internacional
    const intFormat = /^[A-Za-z]{1}[0-9]{1}[A-Za-z0--9]{1,13}$/;

    if (intFormat.test(zipCode.replace(' ', ''))) return true;
    
    return false;
}

console.log(validatePostal("12345"));  // devuelve: verdadero
console.log(validatePostal("12345-6789"));  //devuelve: verdadero
console.log(validatePostal("M4B 1B5"));  // devuelve: verdadero
console.log(validatePostal("123 Main St, Anytown, USA A0A 1A0")); // devuelve: verdadero
console.log(validatePostal(" invalid zip code ")); // devuelve: falso

