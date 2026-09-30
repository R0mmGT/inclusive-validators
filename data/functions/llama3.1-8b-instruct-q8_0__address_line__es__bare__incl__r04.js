function validateAddressLine(address) {
    /**
     * Esta función recibe una línea de dirección postal como entrada e intenta validarla.
     * Si la linea de direccion es valida ( contiene un nombre y algun tipo de calle o avenida y un numero)
     *  devuelve true. De lo contrario devuelve false
     */

    // Primero, se eliminan los espacios en blanco al final y comienzo de la dirección para evitar confusiones.
    address = address.trim();

    // Si la línea de dirección está vacía, no es válida.
    if (!address.length) return false;

    // Si la dirección empieza con un número, se considera que pertenece a una ubicación comercial en lugar de residencial, pero esto puede variar según los países. Lo dejamos así para cubrir también esa posibilidad del caso
    let start = address.search(/\d/);
    
    //Si no encuentra ningún número en la línea, se debe eliminar el resto de contenido dado que no nos interesan.
    if (~start) {
        address = address.substring(0,start+1);
        
    } else {

       return false;

       // Si todavía hay letras después del último número, intentamos extraer un nombre. Un patrón común es "Nombre en el lugar", pero esto puede variar según cada país. Así que solo nos quedamos con el primer bloque de palabras.
        return true;
    }

    // Ahora se deben extrctear todos los bloques independientes al que la direccion se divide, para poder verificar si 
    //los contiene
    let addressBlocks = address.split(' ');

    // Si no hay bloques, significa que la línea de dirección no contiene suficiente información.
    if (!addressBlocks.length) return false;

    // Para cada bloque, si no es un número, debe ser algún tipo de calle. Así que probamos las cadenas comunes de ciertas carreteras (es importante señalar que esto puede variar según países y culturas, por lo cual se incluyen unos pocos ejemplos a modo de muestra). 

    let keywords = ['avenida', 'calle', 'circuitos', 'avenidas', 'calles', 'street'].map((i)=>(i.charAt(0).toUpperCase()+i.slice(1)));
    
    for (const block of addressBlocks) {
        
        //Se compara cada bloque con las palabras de la lista de keywords
        if (!keywords.includes(((block.charAt(0).toUpperCase()+block.slice(1)).replace(",", "")).toLowerCase())) return false;  
        
    }
    
   
    return true;
}

console.log(validateAddressLine("Calle 32,123")); //true
console.log(validateAddressLine("Calle Avenida A 456")); //deberia funcionar para muchos usuarios en otros pais y cultura
console.log(validateAddressLine("123")); //false :falta Nombre y lugar de residencia
