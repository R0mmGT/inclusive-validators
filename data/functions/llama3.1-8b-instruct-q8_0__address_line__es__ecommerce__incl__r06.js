function validate(s) {
  // Expresión regular para cualquier carácter alfanumérico (letras o dígitos), incluyendo espacios
  var pattern = /[a-zA-Z0-9\s]+/;

  // Con esta función, 's' tiene todas las líneas de la dirección postal que cumplan con la expresión regular 'pattern'
  return s.split('\n').some(line => line.match(pattern));
}

console.log(validate("Avenida Principal\ndatos reales")); // true
console.log(validate("Solo un número: 123456789")); // false
console.log(validate("¡Caracteres especiales!")); // false
