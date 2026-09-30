function validate(nombre) {
    // Expresión regular que representa un nombre completo válido.
    const regex = /^[a-zA-ZàáâäæèéêëìíîïòóôöùúûüñçABCDEFGHIJKLMNOPQRSTUVWXYZ', .-]+ [a-zA-ZàáâäæèéêëìíîïòóôöùúûüñçABCDEFGHIJKLMNOPQRSTUVWXYZ', .-]+$/;

    // Verificar si el nombre se ajusta a la expresión regular.
    return regex.test(nombre);
}

console.log(validate("Juan Pérez"));  // true
console.log(validate("Juan"));  // false (falta apellido)
console.log(validate("Pérez, Juan"));// false (apellido no puede tener coma al principio)
console.log(validate("juan perez")); // false (nombre y apellido deben estar en mayúsculas o minúsculas)
console.log(validate("Pérez Juan, 'México' D.F., México. Tél.: 9988-9999"))); // false (apellidos no pueden haber comillas al final del nombre)
