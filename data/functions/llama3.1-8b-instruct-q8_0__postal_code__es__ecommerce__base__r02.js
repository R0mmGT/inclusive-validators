function validate(codigoPostal) {
    // Se remueve cualquier caracter no numerico del codigo postal
    let codigoPostalFormateado = codigoPostal.replace(/\D+/g, "");

    // Verifica que tenga 5 dígitos para ser un código postal español
    if (codigoPostalFormateado.length === 0 || !/^\d{5}$/.test(codigoPostalFormateado)) {
        return false;
    }
    
    return true;
}

console.log(validate('28007'));  // verdadero
console.log(validate('28800'));  // falso
