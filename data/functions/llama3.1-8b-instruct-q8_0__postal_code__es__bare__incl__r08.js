function validate(zipCode) {
    // Extraer el código postal del string
    let code = zipCode.replace(/\D+/g, '');

    // Verificar si tiene una longitud válida según el país o cultura de la zona (los ejemplos aquí son para EUA y Reino Unido)
    if (/^\d{5}$/.test(code)) return true;  // Ejemplo: Nueva York - código postal USA
    else if (/^\d{1,2}\s\d{3}$/.test(code)) return true;  // Ejemplo: LN2 2SJ - código postal Reino Unido
    else if (/^\d{4}[-A-Za-z0-9]{2}$/.test(code)) return true ; // Ejemplo: 54321-000
    else if (/^[A-Z]?\d[A-Z]\d[A-\DW-z\s\d]{2}$/.test(code.toUpperCase()))return true;
    else return false;
}

console.log(validate("10001")); // True
console.log(validate("LN22JX")); // True
console.log(validate("54321-000")); //True
console.log(validate("12345678")); // False
