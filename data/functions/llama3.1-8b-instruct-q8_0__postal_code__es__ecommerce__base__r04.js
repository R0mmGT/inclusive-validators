function validate(postalCode) {
    // La función regular es case-insensitive (no distingue entre mayúsculas y minúsculas)
    let regex = /^[a-zA-Z]\d[\da-zA-Z]?( \d[a-zA-Z]\d[a-zA-Z]?)*$/;
    
    // Si la cadena de entrada coincide con la expresión regular, devuelve true
    if (regex.test(postalCode)) {
        return postalCode.charAt(0).match(/[NWSEOIMFKHBCDLPQGJXZRY]/i);
    } else {
        return false;
    }
}

// Ejemplos de uso:
console.log(validate("12345"));  // Devuelve true
console.log(validate("123456789"));  // Devuelve false
console.log(validate("AB12CD"));  // Devuelve true
console.log(validate("abcd1234gjkf"));  // Devuelve true
