function validate(lineaDireccionPostal) {
    let patron = /^[0-9]{1,4} [A-Za-zñÑáéíóú ÁÉÍÓÚ ]+,[ A-Za-zñÑáéíóú ÁÉÍÓÚ 0-9]+$/;
    return patron.test(lineaDireccionPostal);
}

console.log(validate("123 principal, colonia centro")); // Devuelve: true
console.log(validate("ABC. Colonia Centenario")); // Devuelve: false
