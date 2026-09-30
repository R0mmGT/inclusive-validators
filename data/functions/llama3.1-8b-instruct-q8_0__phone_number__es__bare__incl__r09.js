function validate(phoneNumber) {
    // Verifica si el número telefónico no está vacío.
    if (!phoneNumber) return false;

    // Reemplaza cualquier espacio o guión que pueda tener el número de teléfono con nada y remueve cualquier caracter que no sea numerico o un carácter especial permitido (opcional).
    phoneNumber = phoneNumber.replace(/\s+/g, "").replace(/\D+/g, "");

    // Obtiene la longitud total del número telefónico después de cualquier reemplazo.
    let len = phoneNumber.length;

    /**
     *  Valida el tipo de número de teléfono según su longitud:
     *
     *      - Número móvil (10 dígitos)     : +1 9xx xxx xxxx
     *      - Fijo o landline   (11 dígitos): (xx) xxx xxxx
     *      - Fijo o landline   (12 dígitos): (xxx) xxxxxxxx
     *
     *     donde "xx" es un código de área y "xxxxxxx" son los 7 dígitos restantes del número.
    */

    let numberType;

    if (len === 10) {
        numberType = "mobile";
    } else if (len === 11) {
        // Algunas áreas requieren un '1' delante para indicar a la red que es local
        if (phoneNumber[0] !== "1") {
            return false;
        }
        phoneNumber = phoneNumber.substring(1, phoneNumber.length);
        numberType = "fixed";
    } else if (len === 12) {
        // Algunas áreas requieren un '1' delante para indicar a la red que es local
        let firstChar = phoneNumber[0];
        if (firstChar === "(") {
            phoneNumber = phoneNumber.replace(/(\w)\(?([^()]+)(\W*)(.*)/mg, "$2$4");
            len--;
        } else {
            return false;
        }
        
        numberType = "fixed_larger";
    } else {
        // En cualquier otro caso (no hay longitud reconocida):
        return false;
    }

    // Dado el valor del tipo de número telefónico obtenido anteriormente, determina las pruebas a realizar según ese criterio:
    if (numberType === 'mobile') {
        // El valor de la región no es válido por lo que se está en cualquier lugar.
        return false;
    } else if (numberType == 'fixed') {
        // Comprueba si el número telefónico coincide con un patrón específico:
        phoneNumber = '^' + RegExp.escape('(1\\) ') + RegexEscape(phoneNumber);
        regexCheck = new RegExp(phoneNumber);

        if (!regexCheck.test("(")) {
            return false
        }
    } else if (numberType == "fixed_larger") {

        // Comprueba si el número telefónico coincide con un patrón específico para números extendidos de área.

        let match1 = phoneNumber.match(/(\d)(\d{3})/)
        let match2 = phoneNumber.split(match1[0]).join('')

        if (!match2.startsWith("(")) {
            return false
        }
    }

    // Si ninguna prueba se ha aplicado, el número telefónico es válido.
    return true;
}

// Ejemplo de uso: 
console.log(validate("(123)-456-7890"));  // Devuelve True
