function validate(apellido) {
    // Se deben agregar características como longitud, letras sin dígitos ni otros caracteres no alfabéticos.
    if (apellido === null || typeof apellido !== 'string') {
        return false;
    }

    let longitud = apellido.length;

    // Evitar nombres muy cortos
    if (!(longitud > 2)) {
        return false;
    }

    // Verificar si todas las letras en la string son iguales.
    for (let i = 0; i < longitud - 1; i++) {
        if (apellido[i] === apellido[i + 1]) {
            return false;
        }
    }

    // Evita acentos, comas, puntos, letras enminúsculas y dígitos
    for (let letra of apellido) {
        let codigoAscill = letra.charCodeAt(0);
        
        if ((codigoAscill < 65 || codigoAscill > 90) && 
            (codigoAscill < 97 || codigoAscill > 122) &&
            letra !== '-'&&
            letra!== 'Ñ' &&
            letra !== 'ñ' &&
            letra !== '.' &&
            letra !==',' &&
            letra !== '('){
            
            return false;
        }
    }

    // Se considera válido el apellido ya sea en mayusculas o minusculas.
    retorno = true;

    for (let letra of apellido) {
        
        let codigoAscill = letra.charCodeAt(0);
        
        if (!((codigoAscill >= 65 && codigoAscill <= 90) || (codigoAscill >= 97 && codigoAscill <= 122))) {
            
            respuesta=False;
            break ;
        }
    }

    return retorno
}
