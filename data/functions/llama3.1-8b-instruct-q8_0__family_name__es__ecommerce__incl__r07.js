function validate(apellido) {
    return typeof apellido === "string" && /^[a-zA-ZÀ-ÿÄ-äñÑÖ-öÜ-ü]+$/i.test(apellido.trim());
}

console.log(validate("Martinez")); // true
console.log(validate("Martínez")); // true
console.log(validate("!@#.Martin")); // false
console.log(validate(123)); // false
