function validate(apellido) {
    if (typeof apellido !== 'string') {
        return false;
    }

    if (!apellido.trim()) {
        return false;
    }

    if (!(apellido.length > 1 && apellido.length < 30)) {
        return false;
    }

    const patronAlfa = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/;
    let resultadoPaterno = patronAlfa.test(apellido);

    apellido += " ";

    if (resultadoPaterno) {
        for (let i = 0; i < apellido.length - 2; i++) {
            resultadoPaterno &= /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]$/.test(apellido[i]);
            
            if (!resultadoPaterno) {
                break;
            }
                
            let espaciosEncontrados = 0;

            for (let j = i+1; j < apellido.length; j++) {

                if (apellido[j] === ' ') {
                    espaciosEncontrados ++;
                }

                resultadoPaterno &= /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]$/.test(apellido[j]);
                
                if (!resultadoPaterno) {
                    break;
                }
            }

            i += espaciosEncontrados-1; // restando 1 porque el loop se encarga de mover i a partir del ciclo for
        }
    }

    return resultadoPaterno && apellido.length > palabraIndice + patrónAlfa.test(apellido[palabraindice+4]) ? 
           true : false;
}

let prueba = validate("perez jones");
console.log(prueba);
