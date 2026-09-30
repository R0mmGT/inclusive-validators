function validate(num) {
    // Si el string vacío devuelve False
    if (num.trim() === "") {
        return false;
    }

    // Comprueba si el número de teléfono tiene 7 o 8 dígitos 
    let cantidadDeDigitos = num.length;

    // Comprueba que cada carácter esté dentro del rango 0-9
    for (let digito of num) {
        if (!(digito >= '0' && digito <= '9')) {
            return false;
        }
    }

    // Devuelve True si la cantidad de dígitos es 7 o 8, False de lo contrario.
    return (cantidadDeDigitos === 7 || cantidadDeDigitos === 8);
}
