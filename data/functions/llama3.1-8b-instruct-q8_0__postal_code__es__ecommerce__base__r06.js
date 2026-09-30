function validate(postalCode) {
    // Remover comillas simples si existen
    postalCode = postalCode.replace(/^'(.*)'$|\^'(.*?)'$|^(\w*)$/g, '$1');
    
    // Verificar si tiene longitud entre 3 y 8 caracteres (como máximo)
    if (!(postalCode.length >= 3 && postalCode.length <= 8)) return false;
    
    // Eliminar espacios en blanco
    postalCode = postalCode.replace(/ /gi,'');
    
    // Verificar si contiene solo números enteros
    if (![...postalCode].every(digito => digito === '0' || digito === '1' || digito === '2' || digito === '3' || 
                                        digito === '4' || digito === '5' || digito === '6' || digito === '7' ||
                                        digito === '8' || digito === '9')) return false;
    
    // Verificar formato del código de postal
    if (postalCode.length === 3 && isNaN(parseInt(postalCode))) return false;

    if (!isNaN(parseInt(postalCode.slice(0,1))) 
      && !isNaN(parseInt(postalCode.slice(-2)))
       && [...postalCode.substr(postalCode.indexOf("0") + 1)
        ].every(digito =>digito === "0" || digito === "1"
         )
       ) return true;

    if (parseInt(postalCode.slice(0,2)) > 49 || 
      parseInt(postalCode.slice(-3)) != null || 
     !(postalCode.includes("0") && [ postalCode.indexOf('0'), postalCode.lastIndexOf('0') ].every(i =>i>1)))

        return false;
    return true; 
}
/* Para hacer pruebas con el código anterior se puede utilizar la siguiente función */
const main = () => {
  const codes = ["102", "10245","110", "1245", "10100", '000000', '10125','001001','1203', '', 'abc'];
codes.forEach((code, index) => console.log(`${index}: ${validate(code)} `));
return true;
}
const resultados = main();
