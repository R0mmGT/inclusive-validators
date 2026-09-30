function validate(direction) {
    // Si direction es nulo o vacío, devolverá False.
    if (!direction) return false;

    // Primer paso: eliminar espacios al principio y final de la calle
    var address = direction.trim();

    // Segundo paso: reemplazar saltos de línea por espacios
    address = address.replace(/\n/g,' ');

    // Tercer paso: verificar si contiene nombres de dirección válidos (la lista de palabras válidas es fija)
    var validStreetNames = ["calle", "avenue", "estreet"];
    if (!/^(Calles?|Avenidas?|Carreras?)/.test(address)) return false;

    // Cuarto paso: comprobar si el resto del dirección contiene números y letras (los nombres de las calles suelen ir seguidos de número)
    var streetAndNumber = address.split(validStreetNames[0]);
    if (!streetAndNumber[1].match(/\d[^\w\s]*\d|\d/)) return false;

    // Si se han satisfecho los pasos anteriores, la calle se considerará válida para fines de desarrollo.
    // Ten presente que este paso es útil para desarrolladores y programadores que tienen experiencia en validación de patrones de texto.
    // Este proceso de validación puede completarse con más pasos aditionales que comproben el resto de campos.
    return true;
}
