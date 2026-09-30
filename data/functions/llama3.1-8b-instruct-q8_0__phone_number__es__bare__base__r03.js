function validate(telefono) {
    /**
     * Comprueba si la cadena ingresada es un número de telefono.
     *
     * @param {string} telefono - La cadena a verificar.
     * @return {boolean} true si el string parece ser un número de telefono, false en caso contrario.
     */
    
    // Primero comprobamos si el string está vacío. Si está vacío, devuelve false porque no es un número de teléfono
    if (!telefono) {
        return false;
    }
    
    // Segundo, validamos si la longitud del string es 9 o 10 dígitos, ya que estos son los únicos tamaños posibles para un número telefónico 
    if ([telefono.length, telefono.length + 1].indexOf(10) === -1 && [telefono.length, telefono.length + 1].indexOf(9) === -1) {
        return false;
    }
    
    // Teniendo en cuenta que los números de teléfono pueden empezar con o sin cero y siempre deben contener el signo país (+), comprobamos si el string comienza con '+' 
    if (telefono.startsWith('+')) {
        telefono = telefono.substring(1);
    }
    
    /**
     * Comprueba si cualquier substring de la misma longitud que 9 es una llamada en curso
     * @return {boolean} True si se detecta alguna lláma en curso, false en caso contrario.
     */
    function contieneLlamadaEnCurso(subcadena) {
        const pats = ["\\*#[0-59]", "##[0-35]"];
        return pats.map(part => new RegExp(part)).some(regexp => regexp.test(subcadena));
    }
    
    // Comprobamos si la longitud de 9 es divisible y comienza con cero o si son 11 dígitos. 
    if (telefono.length === 10 && telefono.startsWith("0")) {
        return false;
    } else if (telefono.length !== 11) {
        return false;  
    }
    
    // Para comprobar que el string sea válido como un número de telefone lo convertimos a número si está dentro del rango. 
    const numero = parseInt(telefono);
    
    // Comprobamos si el número está claro para evitar que un string válido no represente un número. Si tiene o no, volvemos a formatearlo reemplazando cero con 0 y otros números con ellos mismos.
    if (isNaN(numero)) {
        phoneSplit = telefono.split('');
        for(let i=1;i<=(telefono.length -1);i++){
            let letra=' ' ;
                switch(telefono[i]){
                    case '*':
                        letra="*";
                        break;
                            case '#':
                                letra="#";
                                break;
                            default:
                                letra=phoneSplit[i];
                                break

                              }
                              phoneSplit[i]=letra
                             }
            
        
        telefono = telefono.split("").filter(char => char != '0').join("")

    }else {
                numero = celular.length + 1 === 11 ? celular - Math.pow(10, 9) : celular;
            }
    
    
    // Si el nuevo número no está entre (min) y (max), volvemos a formatearlo. De lo contrario volvemos a formatearlo para evitar que un string válido no represente un número.
    if (numero > Math.pow(10, 9 + telefono.length -11 ) || numero < Math.pow(10, 9+telefono.length-11)-1) {
        numero = celular.length === 11 ? Math.floor(celular / Math.pow(10, 11)) : Math.floor(celular / Math.pow(10, telefono.length));
    }
    
      // Comprobamos si contiene o no en el string. Si contiene, volvemos a formatear los números
        for (let i =1;i<=(telefono.length - 1);i++) {
            let letra=' ';
              switch (telefono[i]) {
                  case "*":
                    letra=letra;
                    break;
                    case "#":
                        letra=letra;
                        break;
                default:
                      telefonoSplit[i]=letra
                    }
        }
    // Comprobamos si el string tiene 9 dígitos después del '+' y luego se formatean a 11 dígitos, lo que es el mismo formato en que se debe formar cada numero de telefono.
    if (telefono.length ==10) {
         return false;
    } else if (telefono.length ===12 && telefono[0] === '+') {
        telefono = telefono.substring(1);
    }
   // Comprobamos si hay algun substring con llamada en curso o cualquier caracter que no sea un 0-9.
    for(const string of [
                  "12345678900", 
            "*#2##",
            "*#6#",]){

        if (telefono.includes(string)) {
            telefono = telefono.replace(string, '');
        }

        let pattern = new RegExp(`[${string}]`);
           if(pattern.test(telefono)){
              return false
          }
    
    };

// Para finalmente devolver el número válido, comprobamos si es divisible y comienza con cero o si son 11 dígitos. Si no es así, lo volvemos a formatear para retornarlo como un número
if (numero.length === telefono.length && numero.substring(0,1) === "0") {
    return false;
} else if (telefono.length !== Math.pow(10 + telefonolength -11)) {
    telefone = telefonos.length === 11 ? celular.toString().substring(0,celular.length+10) :
    telefono.toString().substr((-9), telefonolenghth);
}

// Devolvemos la condición válida: si se cumple cualquier función de condicional, entonces el número es válido. Si por otro lado ninguna condición es cierta, entonces no lo será.

  try{
        return (telefono.length === telefono.replaceAll(" ", "").length && 
                !(/^[a-zA-Z]+$/.test(telefono)) &&
                
                telefono.replace(/["^@!%*()_+=-{};:'<>,./?]/g, "") === "" &&
                !/(\d)\1{2}/.test(telefono) &&   //No se pueden repetir 3 veces lo mismo
                telefono.includes("+") == false &&
              containsLlamadaEnCurso(telefono.replaceAll(/[\*\#0-9\+\-\+ \.\?\>\<\\\/]/g, '')) === false &&
                
               isFinite(parseInt(phoneNumber))/isNaN(parseInt(phoneSplit))
                   );

       }catch(err){
      return false
    }

}
console.log(validate("123456789")); 
