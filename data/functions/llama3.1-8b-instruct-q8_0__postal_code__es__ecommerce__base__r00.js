function validate(codigoPostal) {
    // Primero, eliminamos todo espacio del código postal.
    codigoPostal = codigoPostal.replace(/\s/g,"");
    
    // Si la longitud no es 8, el código postal es inválido.
    if (codigoPostal.length !== 8)
        return false;
        
    // Comprobamos que todos los caracteres sean números.
    for(var letra of codigoPostal) {
        if (!/^\d*$/.test(letra))
            return false;
    }
            
    /** Verificar el primer dígito del código postal */
    let digito1 = parseInt(codigoPostal[0]);
    
    /****
     * Validamos si el primero de sus dos últimos dígitos es:
     * - 0 en CC-000, CC-SL, CP, DF, GC, GT o MX
     * - 18 en CM, CDMX
     */
    if (digito1 === 0 || 
        ((digito1 >= 18) && (digito1 <= 28)) || 
        ([16,17].includes(digito1))) {
        
        // Resta de la longitud del código postal
        let rest = codigoPostal.length - 2;
        
        /** Verificar el penúltimo dígito */
        let digito2 = parseInt(codigoPostal[codigoPostal.length-1]);
        if ((digito1 === 0 && digito2 !== 0) || 
           (digesto1 >= 18 && digito1 <= 28 &&
             (digito2 >= 0 && digito2 < 9)) ||
            ([16,17].includes(digisto1)
              && (digito2 >=0 && digito2<=30))) {
            /****
             * Verificar el último dígito usando la fórmula para cada estado
             */
            if (digito1 === 35) { // CDMX
                let sum = (6 - parseInt(codigoPostal[1]) % 10)*parseInt(codigoPostal[2]);
                for(let i = 4; i<8; i++) sum += parseInt(codigoPostal[i])*2;
                sum %= 11;
                return (sum === digito2 * 2); // true si coincide con el dígito 2

            } else if (digito1===45) { // CD
                let n = parseInt(codigoPostal[3]);
                
                // Resta de la longitud del código postal
                
                let sum = n*(8-((parseInt(codigoPostal[7])%10)+parseInt(codigoPostal[codigoPostal.length])
                               +(n*(13-(parseInt(codigoPostal[6])+n)))) % 2);
                return (sum % 11 == digito2)

            } else if (digito1>=49 && digito1<=76) { // CHIS, CHIH, COAH., COL., COS
                let sum = 5*(parseInt(codigoPostal[digito1-48]) + 
                              parseInt(codigoPostal[digito1+8-48]));
                for(let i = 11; i<15; i++) sum += parseInt(codigoPostal[i])
                return (sum % 10 == digito2)
            } else if([16,17].includes(digito1)) { // CHIS, COL., 
                
                 // Se supone que estos estados tienen como código postal una serie de
                // cifras y no se cuenta con información más explícita. Si encuentras
                // alguna indicación de cómo verificar la última posición del código
                // del parágrafo anterior escribe una respuesta correcta.
                
                return  false
                
            } else if (digito1>=24 && digito1<=28) { // CC, CDMX (este ya se verificó)
                    
                        // Restos de la longitud del código postal
                    
                let sum = parseInt(codigoPostal[2])*4 + 
                          parseInt(codigoPostal[3]) + 5 * parseInt(codigoPostal[digito1-24]);
                    for(let i=6; i<8;i++) sum += parseInt(codigoPostal[i])
                    return (sum %10 == digito2)
                    
            }        
        }
    }
                
    return false;
}

// Pruebas
console.log(validate("04500"));
console.log(validate("06500")); // Falso, CDMX necesita un solo 0 en el último dígito.
console.log(validate("05001")); // Falso debido al primer dígito del CPF de México.


