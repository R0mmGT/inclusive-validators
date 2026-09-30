// Primero, se define las expresiones regulares para validar el campo de correo
const streetNameRegex = /^[a-záéíóúüñç A-ZÁÉÍÓÚÜÑÇ 0-9\. \-\,\_]+$/;
const stateRegex = /^[a-záéíóúüñç A-ZÁÉÍÓÚÜÑÇ]{2,4}$/;
const zipCodeRegex = /^\d{5}(-\d{3})?$/;

// Función validate para validar el campo de dirección postal
function validate(str) {
    // Declarando variables para cada parte del correo
    let streetName, state, zipCode;
    
    // Reemplazando puntos con comas y espacio en blanco, para facilitar la validación
    str = str.replace(/\./g, ', ').replace("\t", "");
    
    const parts = str.split(',');
    
   // Declarando las variables para cada parte del correo
   streetName=parts[0];
   state = parts.find(part => part.length <= 4 && part.toLowerCase().indexOf('state') === -1);
   zipCode = parts.find(part =>/^\d+$/.test(part) && part.length == 5);

    // Comprobando si existe cada parte del correo
    return streetNameRegex.test(streetName)
        && (state != undefined ? stateRegex.test(state): false) 
        && (zipCode != undefined ? zipCodeRegex.test("-" + zipCode.slice(-3)) : false);
}