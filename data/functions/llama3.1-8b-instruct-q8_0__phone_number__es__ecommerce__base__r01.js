function validate(phoneNumber) {
    /**
     * Valida si el número de teléfono es válido.
     *
     * @param {string} phoneNumber - Número de teléfono a validar.
     *
     * @returns {boolean} True si el número de teléfono es válido, False en caso contrario.
     */

    // Primero, validamos que el número sea largo 10 sino devuelve false
    if (phoneNumber.length !== 11) {
        return false;
    }

    // Comprobamos si el primer caracter es 9 o 0, sino lo consideramos no valido 
    let primeroNoValido = phoneNumber[0] !== '9' && phoneNumber[0] === '0';
    
    // Después validamos que el segundo y tercer dígito sean número
    if (!/^\d$/.test(phoneNumber[1])) {
        return false;
    }
    if (!/^\d$/.test(phoneNumber[2])) {
        return false;
    }

    // Validamos que los números del 4 al 9 sean correctos 
    for (let i = 3; i < 11; i++) {
        if (!/^\d$/.test(phoneNumber[i])) {
            return false;
        }
    }

    let sumaDigitoUno, sumaDigitoTres;
    
    // Calculamos la suma de los números cada dos posiciones desde el inicio
    for (let i = 3; i < 11; i += 2) {
        let numeroActual = parseInt(phoneNumber[i]);
        let resultadoMulti;
        
        if (i % 8 === 7 && phoneNumber.length >= 10) {
            numeroActual *= 2;
            while (numeroActual > 9) {
                numeroActual = String(numeroActual);
                let sumandoTresCeros;
                
                for (const value of numeroActual) {
                    const corteFinal = parseInt(value);
                    
                    if(corteFinal%2 ===0){
                        sumandoTresCeros +=corteFinal;
                    }else{
                        sumandoTresCeros -=corteFinal;
                    }
                }
                

               numeroActual=sumandoTresCeros.toString();
            resultadomulti=parseInt(numeroActual);
        }

        if(i % 8 ===3){
           resultadoFinal =Number(phoneNumber[i-1]+resultadopartesuma);

        }
    
        } else {
            resultadoMulti = Number(phoneNumber[i]);
      sumaDigitoUno += resultadoMulti;

    // Hacemos lo mismo pero los números cada dos posiciones hasta el final 9 
     for(let j=2;j>=1; j--){
        
        let numeroFinal=0;
        if(i-1+j<=8){
          numeroActual = parseInt(phoneNumber[8-j]);
          if (j % 4 === 3 || j % 8 === 7) {
            continue;
           }else{
               //Validamos si el número a considerarse es correcto
            resultadoFinal = Number(phoneNumber[i-j] + numeroActual);
            sumaDigitoTres+=resultadoFinal;
        }

      }
      
    } 

//Hacemos esto antes de devolver la respuesta a que se evalúe el valor con 10 y sea diferente de cero, como nos indican en el manual lo que debe hacer una persona
    return (sumaDigitoUno + sumaDigitoTres) % 10 === parseInt(phoneNumber[9] || telefono.substr(9));
}
