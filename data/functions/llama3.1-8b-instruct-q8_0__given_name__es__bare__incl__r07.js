function validate(fullname) {
    // Una lista de letras con mayúsculas y minúsculas alfabéticos.
    let alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    // Si la longitud del nombre es menor o igual a 2, entonces no es válido.
    if (fullname.length <= 2) return false;

    // Revisa si todos los caracteres en el substring es alfa numérico
    for(let caracter of fullname.slice(0, -4)) { 
        if(!alpha.includes(caracter)) {
            return false;
        }
    }

    // Si la longitud del nombre mayor a 28 entonces no puede que sea válido porque se le pedira otra información.
    if(fullname.length > 28) return false;

    // Revisa si los primeros y últimos caracteres son en sí mismos alfa
    if(!alpha.includes(fullname[0]) || !alpha.includes(fullname.slice(-1))) {
        return false;
    }

    // Si el substring es menor que 4 no se considera válido porque los datos que contenga serian información de un apellido.
    if(fullname.length < 5) return false;

    // Luego, utiliza una expresión regular para eliminar cualquier posible dígito
    let strAlphaNum = fullname.replace(/\\d/g,'');
    
    // Verifica si el nombre sigue siendo la cadena original en formato alfa; si no así entonces lo consideramos como inválido.
    if(strAlphaNum !== fullname) return false;

    // Si aún se encuentran caracteres no válidos, la cadena no es válida
    for(let caracter of fullname.slice(0, -4)) { 
        switch(caracter){  
            case "à":
                caracter = 'a';
                break;
            case "ç":
                caracter = 'c';
                break;
            case "é":
                caracter = 'e';
                break;
            case "ê":
                caracter = 'e';
                break;
            case "î":
                caracter = 'i';
                break;
            case "ô":
                caracter = 'o';
                break;
            case "û":
                caracter = 'u';
                break;
            default:
                break;  
        }
    }

    // Ahora vuelve a verificar caracteres que hayan sido sustituidos
    return alpha.includes(fullname.slice(0,-4));
}

console.log(validate("Pedro Juan"));  // Debería de devolver false ya que se elimino un dígito en el substring.
console.log(validate("PeRo"));        // Debería de devolver true ya no contiene caracteres que no sean alfa
