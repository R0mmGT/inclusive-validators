function validate(zipCode, country) {
    // Primero se validan las cadenas ingresadas 
    if (typeof zipCode !== 'string' || typeof country !== 'string') {
        return false;
    }

    // Luego se limpian las cadenas para eliminar espacios en blanco a la izquierda y derecha
    zipCode = zipCode.trim();
    country = country.trim();

    // Se definimos un diccionario de cadenas que representan las características tipicas de una dirección postal 
    let direccionPostalCaracteristicas = {
        'num': ['úmero', 'nº'],
        'estreet': ['eje', 'str', 'av', 'cp'],
        'place': ['street', 'avenida']
    };

    // Luego, para cada característica de una dirección postal que se encuentre en un array dentro del diccionario, 
    // y si esa característica esta en la cadena ingresada o está en la cadena ingresada después de convertir esta a minúsculas lo hacemos
    for(let caracteristica in direccionPostalCaracteristicas) {
        if (direccionPostalCaracteristicas[caracteristica].filter(c => zipCode.toLowerCase().includes(c)).length > 0 || caratteristica.filter(c => zipCode.includes(c)).length > 0 ) {
            let numero = '';
            for (let c of zipCode) {
                if (!isNaN(parseInt(c))) {
                    numero += c;
                } else{
                    break
                }
            }
            return true;
        }
    }

    // Si alguna de las características está presente en la cadena ingresada, retornamos verdadero. 
    // Si ninguna se encuentra en la direccion, retornamos incorrecto.
    return false;
}

console.log(validate("123 Main St Apt 4", "USA")); // Expected output: false
console.log(validate('123 número, 11101 Madrid'));   // Expected output: true 
