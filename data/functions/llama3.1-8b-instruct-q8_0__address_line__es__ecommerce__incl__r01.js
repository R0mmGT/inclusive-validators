function validate_street_line(line) {
    // Define una lista de palabras clave relacionadas con direcciones postales
    let postalKeywords = ["street", "avenue", "road", "boulevard", "drive", "highway"];

    // Transforma la línea en minúsculas para hacer que la validación sea independiente del caso
    line = line.toLowerCase();

    // Verifica si cualquier palabra clave de carretera aparece en la línea
    return postalKeywords.some(keyword => line.includes(keyword));
}

console.log(validate_street_line("123 Main Street"));  // Devuelve: true
console.log(validate_street_line("456 Elm Avenue"));   // Devuelve: true
console.log(validate_street_line("789 Oak Road"));     // Devuelve: true
console.log(validate_street_line("Invalid Line"));      // Devuelve: false
