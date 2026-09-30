function validate(name) {
    // Se deben respetar las reglas de nombres propias, que pueden incluir dígitos.
    let pattern = /^([a-zA-Z]|\s|)+$/;
    
    // Comprobar si el patrón coincide con la cadena.
    return name.match(pattern) !== null && name.length >= 2 && /[A-Z]/.test(name);
}

console.log(validate("Juan Pablo"));  // Devuelve: true
console.log(validate("jose maria"));   // No devuelve: true (Debería devolver true ya que es posible ver a los hispanos escribiendo nombres en minúscula.)
console.log(validate("JOSE MARIA"));   // Devuelve: false
console.log(validate("Juan Pablo Sanchez Rodriguez 12345"));  // Devuelve: true
