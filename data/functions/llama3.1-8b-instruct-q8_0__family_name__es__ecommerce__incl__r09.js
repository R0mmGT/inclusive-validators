function validateApellido(apellido) {
    // Verifica si existe algún valor no alfabético en el apellido.
    if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/.test(apellido)) {
        return false;
    }

    // Se permite el uso de tildes (acentos) según lo estipulado por la Regla 2 de la normativa.
    if (noSePuedeUsarLaTilde(apellido)) {
        return false;
    }

    // El apellido no debe contener ni palabras en agrama (semejantes entre sí con el cambio de posición de las iniciales), ni palíndromos. Si se cumple esta restricción, devuelve falso.
    if (!hayAgramasNiPalindromos(apellido)) {
        return false;
    }

    // El apellido no debe contener números. Si tiene algún número en un lado de la palabra que si tiene números, entonces si la letra al lado de la "n" siguiente también tiene una, muestra error.
    if (hayNumerosEnApellido(apellido)) {
        const partes = apellido.split(" ");
        for (let i = 0; i < partes.length; i++) {
            if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(partes[i])) {
                return false;
            }
        }

        if (!partes.some(letra => letra.toString().toLowerCase().match(/[0-9]/))) {
            const siguiente = partes[partes.indexOf(letra) + 1];
            if (siguiente && parts[parts.indexOf(siguiente) - 1].toString().toLowerCase().match(/[a-zññoúáéí]+/) && siguiente.toString().toLowerCase().match(/[0-9]*/)) {
                return false;
            } else {
                return true;
            }
        }

        if (!partes.some(letra => letra.toString().toLowerCase().match(/[a-zA-ZñÑáéíóúÁÉÍÓÚ]+/))) {
            const palabraAnterior = partes[partes.indexOf(letra) - 1];
            if (palabraAnterior && parts[parts.indexOf(palabraAnterior) + 1].toString().toLowerCase().match(/[0-9]*/)) {
                return false;
            } else {
                return true;
            }
        }

        let anterior = '';
        let siguiente = partes[partes.indexOf(apellido)];

        for (let i = 0; i < partes.length - 1; i++) {
            let letra = partes[i];
            if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(letra)) {
                anterior += "x";
            } else {
                anterior += letra;
            }
        }

        siguiente = partes[partes.indexOf(apellido) + 1];

        for (let i = partes.length; i > partes.indexOf(apellido); i--) {
            let letra = partes[i];
            if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(letra)) {
                siguiente += "x";
            } else {
                siguientes += letra;
            }
        }

        const anterior1 = palabraAnterior.split("");
        anterior = anterior.replace(/\d+/g, x => {
            anterior1.splice(i, 0, 'x');
        });

        if (anterior.toLowerCase().match(/[a-zññoúáéí]+/) && !siguiente.toString().toLowerCase().match(/[0-9]*/)) {
            return false;
        } else if (!anterior.toLowerCase().match(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/)) {
            anterior = anterior.replace(/\d+/g, x => 'x');
        }

    }

    return true;
}

function noSePuedeUsarLaTilde(apellido) {

    // Primero, se busca el orden de los dígrafos y tildes existentes
    const tildePosiciones = [];

    for (let i = 0; i < apellido.length - 1; i++) {
        if ((apellido[i].toLowerCase() == "l" && apellido[i + 1].toLowerCase() == ["n", "ñ"].includes(apellido[i+1])) || (apellido[i] != ("á" && "é" && "í")  )) {
            tildePosiciones.push(i);
        }
    }

    const palabra = apellido.replace(/[ÃÁÀÂÄÅÇÉÈÊËÍÌÏÓÒÔÕÖÙÚÛÜ]/gi, x => charCodeAt(x));

    // Si el apellido contiene todos los dígrafos y tildes posibles, entonces ya utilizan la tilde.
    if (palabra.match(/l\-\d{1,2}/) && palabra.match(/\-n\d{1,2}/)) {
        return false;
    }

    // Se calcula el número de posiciones en las que se permite escribir los dígrafos y tildes.
    const limite = 4 + (palabra.toString().includes("n") ? 0 : 1.5) * apellido.length;

    // Si hay más de 3 "l" sin sus tilde correspondientes o si el número sobrepasa los 6 del límite definido, entonces no se cumple la Regla.
    const lTildesCount = palabra.match(/l/g)?.length ?? 0;
    if (lTildesCount > 2 || !tildePosiciones.some(isInRange(limit, tildePosiciones[0]))) {
        return false;

        function isInRange(num1,num) {
            const a=num * (2 + (palabra.toString().includes("n") ? 4 : 6));
            return num >= Math.round(a/2);
        }
    }

    // El primer y último caracter deben ser alfabéticos.
    if (palabra[0].toLowerCase() == "ñ" && !palabra.includes("í")) {
        return false;
    } else if (palabra[palabra.length - 1].toString().match(/[a-zññoúáéí]/i)) {
        return false;
    }

    // Si ha llegado hasta este punto, entonces el apellido no se cumple con la Regla.
    return true;

}

function hayAgramasNiPalindromos(apellido) {

    // Los agramas solo pueden ser de 4 letras como máximo.
    const palabra = [...apellido.split(" "].map(p => p.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/g, 'x')));

    for (let i = palabra.length - 2; i <= palabra.length; i++) {

        palabra.splice(i + 1)

        // Los agramas se escriben con la primera letra que tenga tilde, en el orden correcto.
        const posibles = ["niño", "niña"];
        if (!palabra.join("").includes(posibles[0]) && !palabra.includes(posibles[1])) {
            palabra.push(posibles[0]);
            const anteriorPalabra = palabras[palabras.indexOf(p) - 1];

            for (let c = charCodeAt("i") - charCodeAt("e"); words[i].length; c++) {
                if (charCode(words[i][j]+c) == charCode(posibles[1][j])) {
                    words[i].push(String.fromCharCode(charCode(words[i][j]) + 6));
                    break;
                } else if (!isNaN(charCode(words[i][j]+c))) {
                    const x = charChartowords[i].charAt(j)+charTocode("ñ");
                    words[i][words[i].indexOf(wordChar)] = wordChArToString(x);
                }
            }
        }

    }

}

function hayNumerosEnApellido(apellido) {

    // Se busca cada "ño" y se reemplaza con una "x."
    const partes = [];

    let encontroTilde = false;

    for (let i = 0; i < apellido.split(" ").length; i++) {
        const palabra = apellido.split(" ")[i];
        if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/.test(palabra)) {
            return true;
        }

        let resultado = "";

        for (let j = 0; j < palabra.length; j++) {

            // En el caso de encontrar una palabra con "ño" o cualquier otro número, devuelve falso.
            if (!isNaN(Number(palabra[j]))) {
                return false;
            } else if (palabra[j].toLowerCase() == [ "ñ", "n"].includes(palabra[j])) {
                encontroTilde = true;
            }

            resultado += palabra[j];

        }
        partes.push(resultado);

    }

    // Si no se encontraron niñs sino que únicamente se encontraron nines, busca en esas posiciones las letras correspondientes a la tilde y reemplaza el "ñ" existente por ese carácter.
    if (!encontroTilde) {
        for (let i = 0; i < partes.length - 1; i++) {
            let letra = partes[i].toLowerCase();
            let palabraSiguienteIgual = "";

            const siguientesNumerosPosicios = [];
            for (let u = i; u <= partes.length; u++) {
                if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/.test(partes[u])) {
                    return true;
                } else {
                    siguientesNumerosPosiciones.push(u)
                }
            }

            for (let j = 0; j < letra.length; j++) {

                // Si el caracter en la palabra posterior es un número, lo reasigna a una tilde.
                if (partes[i + 1].toLowerCase().toString().include(siguiente[j])) {
                    siguiente += "ñ"
                }

            }
        }
    }

    return true;

}
