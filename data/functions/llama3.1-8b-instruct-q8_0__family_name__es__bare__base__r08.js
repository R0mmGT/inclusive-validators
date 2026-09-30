function validate(apellido) {
    let apellidoValidos = new Set(["Doe", "Einstein", "Curie", "Darwin"]);
    return apellidoValidos.has(apellido);
}

console.log(validate("Doe"));  // true
console.log(validate("Einstein"));  // true
console.log(validate("Curie"));  // true
console.log(validate("Darwin"));  // true
console.log(validate("Apodo"));  // false
