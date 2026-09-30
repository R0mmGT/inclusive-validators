const nombresPatrocinadores = ['de', 'van', 'dela', 'la', 'el'];
const nombresNoPatronimicos = ['júnior', 'senior', 'iii'];

function validate(lastName) {
  lastName = lastName.trim();
  
  // Revisa si las longitudes mínimo y máximo no son correctas
  if (!(2 <= lastName.length && lastName.length <= 60)) return false;
  
  // Si el apellido de persona es vacío, no cumple la condición de tener apellidos válidos.
  let lastnameHasValidParttern = true;
  
  // Revisa si los dos últimos caracteres del apellido son una abreviatura (por ejemplo: "Jr." o "Sr.")
  if (lastName.slice(-2).toLowerCase() === 'jr' || lastName.slice(-3).toLowerCase() === 'sr.') {
    // Elimina la posible abreviatura de la cadena
    lastName = lastName.slice(0, -2);
    
    // Sustituye algunas formas comunes de escribir apellidos que no deberían haber aparecido en los resultados anteriores
    if (lastName.toLowerCase() === 'de') {
      lastnameHasValidParttern = false;
    }
  } else {
    // Revisa si alguna parte del apátrida se asemeja a un nombre común de una persona. Por ejemplo, cualquier cosa que no sea el apellido.
    const patronimicsAndCommonNames = [...nombresPatrocinadores, ...nombresNoPatronimicos]; // nombresPatrocinadores y nombresNoPatronimicos son arreglos con los apellidos que podrían haber aparecido en los resultados del método de cálculo 'Last'.
    for(const string of patronimicsAndCommonNames) {
      if(lastName.toLowerCase() === string.toUpperCase()) lastnameHasValidParttern = false;
    }
  }

  return lastnameHasValidParttern;
}