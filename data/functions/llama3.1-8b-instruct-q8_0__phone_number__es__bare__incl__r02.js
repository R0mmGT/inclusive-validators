function validate(phoneNumber) {
    // Primero eliminamos cualquier simbolo o espacio del telefono
    phoneNumber = phoneNumber.replace(/[^0-9]/g, '');

    
    // Si el teléfono tiene menos de 8 dígitos, no es válido.
    if (phoneNumber.length < 8) {
        return false;
    }
    


    //Si el número de caracteres es mayor a 15 o menor a 7: Si es un numero fijo, no tiene que tener estos digitos; pero en este caso le estoy poniendo como condición por si acaso pueda ser necesario algún día
    if (phoneNumber.length > 15 || phoneNumber.length < 7) {
        return false;
    }
    

    
    //Si el número comienaza con 0, es porque no es un teléfono internacional y su país de origen es España o México. Estos países los vamos a validar individualmente.
    if(phoneNumber[0] === "0"){
        
        // Si es español, se inicia por 6 o tiene 9 dígitos
        if(phoneNumber.length == 9 && phoneNumber.substring(0, 1) == "6" ){
            return true;
        }
        return false;

    } else if(country_code.indexOf("+") != -1){
        
        // El número de teléfono comienza con '+' lo cual puede ser válido.
        if(phoneNumber.replace(/[^0-9]/g, '').length < 8)
            return false
        
        // Nos preocupamos solo por el último código país que podría no tener dígito
        if(new Set(phoneNumber.substring(1)).size === phoneNumber.length - 1){
            
            //Si el país tiene longitud de número diferente a 15, es un país con código fijo. Los validaremos individualmente,
            let final = ""

            for(let country in countriesFixed){
        
                if(Number(country) == Number(phoneNumber[2])){
                    return true;
                
            
        }


        //Validamos cada países por separado.
        for(country of ["España", "México']){
            
            //Verificamos el número de caracteres válidos
            if((phoneNumber.substring(0,3)).length <= 8 && phoneNumber.length != ((country === 'México') ? "1": 9))
                return false;
         

            
            let final = ""
            for(let idx = 0; idx < (2+parseInt(country === 'España')).toString().length;idx++)
                final+="1"
        
            if(final === phoneNumber.substring(3).split("").map(Number).join(""))
            
                return true;
        }
      
        
    }
}
    //Validamos para todos los países.
    for(let country in countries)
    
        if(phoneNumber.substring(0, (2+parseInt(country))).localeCompare(phoneNumber.substring(0, (2+parseInt(country))))){

        
       let final = ""
                
            for(let idx = 0; idx < (2+parseInt(country)).toString().length;idx++)
                final+="1"
                
        if(final === phoneNumber.substring((2+parseInt(country))),phoneNumber.length-(3+parseInt(countries[country])))
            return true;
         
        } 

    

    // Por defecto, un número de teléfono válido tiene al menos 6 dígitos (si está vacío o cualquier valor en blanco lo ignoramos)
    else if(phoneNumber && phoneNumber.length > 5){
        
        //Si la longitud del string no supone un número con longitud mayor a diez caracteres. Si es mayor, redimenziónalozo y luego verifico.
        let tmp = 0
        for(let idx = 0; idx < 10; idx++){
            tmp+=parseInt(phoneNumber[idx])
        }

        
        //Si la suma de todos los digitos da como resultado un número entre el 9, y 1. En ese caso considerarlo invalido. En otro caso validado como telefono.
        if(tmp >= 1 && tmp <= 9)
            
                
            return false
                
        else
            return true
        
    } 
    return false;
}

let countries = {
    "Argentina": 54,
    "Australia": 61,
    "Austria": 43,
    "Bélgica": 32,
    "Belice": 501,
    "Benín": 229,
    "República de Bosnia y Herzegovina": 387,
    "Brasil": 55,
    "Bulgaria": 359,
    "Burkina Faso": 226,
    "Bután": 975,
    "Camboya": 855,
    "Camerún": 237,
    "Canada": 1,
    "República Centroamericana": 503,
    "Chad": 235,
    "China": 86,
    "Colombia": 57,
    "Comoras": 269,
    "Costa Rica": 506,
    "Côte d'Ivoire": 225,
    "Croacia": 385,
    "Cuba": 53,
    "Dinamarca": 45,
    "Republica Dominicana": 1,
    "Ecuador": 593,
    "Emiratos Árabes Unidos": 971,
    "Ecuador": 593,
    "Egipto": 20,
    "El Salvador": 503,
    "Guinea Ecuatorial": 240,
    "Estados Unidos": 1,
    "Estonia": 372,
    "Fiyi": 679,
    "Filipinas": 63,
    "Finlandia": 358,
    "Francia": 33,
    "Gabón": 241,
    "Gambia": 220,
    "Georgia": 995,
    "Alemania": 49,
    "Ghana": 233,
    "Grecia": 30,
    "Groenlandia": 299,
    "Guadalupe": 590,
    "Guatemala": 502,
    "Guinea": 224,
    "Guinea-Bissau": 245,
    "Haití": 509,
    "Hungría": 36,
    "India": 91,
    "Indonesia": 62,
    "Irak": 964,
    "Irán": 98,
    "Irlanda": 353,
    "Islandia": 354,
    "Israel": 972,
    "Italia": 39,
    "Jamaica": 1,
    "Japón": 81,
    "Jordania": 962,
    "Kazajistán": 7,
    "Kenia": 254,
    "Kirguistán": 996,
    "Kiribati": 686,
    "Corea del Norte": 850,
    "Corea del Sur": 82,
    "Kuwait": 965,
    "Laos": 856,
    "Letonia": 371,
    "Libia": 218,
    "Líbano": 961,
    "Lesoto": 266,
    "Lituania": 370,
    "Luxemburgo": 352,
    "Macao (China)": 853,
    "Macedonia (FYROM)": 389,
    "Madagascar": 261,
    "Malasia": 60,
    "Malawi": 265,
    "Maldivas": 960,
    "Malí": 223,
    "Malta": 356,
    "Marruecos": 212,
    "Martes": 30 -1,
    "Mauricio": 230,
    "Mauritania": 222,
    "Mayotte": 262,
    "Mexicanos":593
}

let country_code = [
"+", "011",
"00", "",
"0"]
countriesFixed = {
    "España" : 34, 
"México": 52}
