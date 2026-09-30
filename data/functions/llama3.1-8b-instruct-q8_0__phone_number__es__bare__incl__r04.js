function validate(phoneNumber) {
    // Remover cualquier simbolo o caracter no deseado ('', '-', ')', '(', '_', etc...)
    phoneNumber = phoneNumber.replace(/[^0-9]/g, '');

    // Comprueba si el número de teléfono tiene entre 5 y 15 dígitos (la mayoría de los números de teléfono son entre 4 u 12 dígitos)
    if (phoneNumber.length < 5 || phoneNumber.length > 15) {
        return false;
    }

    // Comprobar que ningún digito del numero de telefono este repetido
    let setRepeatedDigits = new Set();
    for (let i = 0; i < phoneNumber.length; i++) {
        if (setRepeatedDigits.has(phoneNumber[i])) {
            return false;
        }
        setRepeatedDigits.add(phoneNumber[i]);
    }

    // El número de teléfono comienza con un 0, a menos que se encuentre en el conjunto de números de países donde el primero debe ser cero
    if ((phoneNumber[0] === '0' && (phoneNumber.length !== 11 || phoneNumber.slice(1, 2) !== '1')) ||
        (!(phoneNumber[0] === '0') && phoneLength(phoneNumber) <= 10)) {
        return false;
    }
  
    // Llama a la función interna que calcula de largo del numero de telefono
    let phoneLength = (phoneNumber.length);

    switch (phoneLength) {
        case 10:
            // Si el número es más corto de 11 dígitos, entonces se puede validar usando una fórmula regular.
            return /^\d+$/.test(phoneNumber);
        default:
            
            switch (countryCodeRange(phoneNumber.slice(1))) {
                case (11):  
                    if (phoneNumber.slice(0) === '180') {
                        let newNumber = phoneNumber.replace('180', '00180');
                        return validate(newNumber);                        
                        
                    }
                
                    var count=0, lastD='9';
                    for (let i = 1; i < phoneLength - 2; i++ ) {  
                        if (lastD !== phoneNumber[i]) {
                            count++;
                        } 
                        lastD = phoneNumber[i];          
                    

                    if ((count === 3 && (!phoneNumber[i + 1] == '2' || !phoneNumber[i + 2 ]== "5")) || (!phoneNumber[phoneLength-1] == '9')) { 
                        return false;                        
                          }
                break;
                case(9):         
                switch(phoneNumber.slice (0,2))
                    {
                   case 88: 
                       case 80:
                          if (countDigit(phoneNumber) ===4 ) {
                            return true;
                          }                            
                            return false;

                           default:
                              let count=0; lastD='9';
                        for (let i = 1; i < phoneLength - 2; i++ ) {  
                        if (lastD !== phoneNumber[i]) 
                        { 
                            count++;      
                         } 
                        lastD = phoneNumber[i];         
                        

                        if ((count === 3 && (!phoneNumber[i + 1] == '2' || !phoneNumber[i+ 2 ]== "5"))|| (!phoneNumber[phoneLength-1] == '9')) {

                                return false;                                   
                              }
                   break;
                    }                    
                default:
                          let count=0; lastD='9';
                        for (let i = 1; i < phoneLength - 2; i++ ) {  
                        if (lastD !== phoneNumber[i]) {
                            count++;      
                         } 
                        lastD = phoneNumber[i];          
                        

                        if ((count === 3 && (!phoneNumber[i + 1] == '2' || !phoneNumber[i+ 2 ]== "5"))|| (!phoneNumber[phoneLength-1] == '9')) {

                              return false;                                   
                            }
                     default:
                    for (let i = 0; i < phoneLength - 3; i++) {  
                        if (i != 0 && phoneNumber[i] === phoneNumber[i + 1]) {
                          return false;    
                        }

                      if ((phoneLength-4) ===i&& ((phoneNumber[phoneLength - 2 ] ==5||phoneNumber[phoneLength - 2 ]==6)||(!phoneNumber[phoneLength-3]]==2))) {

                            return false;
                      }
                    }
                break;
                
       }
      }
    }

    // Al llegar aquí, significa que tu número de teléfono es un número válido

  return true;
}

function countryCodeRange(countryCode) {
    let codeMap = new Map(); 
    codeMap.set('0', [1, 8, 9]); 
    codeMap.set('3', [33]);
    codeMap.set('44', [44]);
    codeMap.set('34', [34]);
    codeMap.set('39', [39]);

    return (codeMap.get(countryCode)) ? codeMap.get(countryCode) : 999;
}

function countDigit(numberPhone ){
 let cont =0 ; for (let i=1; i < numberPhone.length-2;i++ ) {   if (numberPhone[i] !== ' ') 
   {
     cont++;      
} } return cont ;}
 