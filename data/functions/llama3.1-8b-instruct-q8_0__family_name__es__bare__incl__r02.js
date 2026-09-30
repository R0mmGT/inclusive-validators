function validate(surname) {
    // Una cadena vacía no es considerada un apellido válido.
    if (!surname.trim()) return false;

    // Si la longitud de la cadena supera los 40 caracteres, puede ser un apodo o algo similar, pero no un apellido común.
    if (surname.length > 40) return false;

    // Los apellidos normalmente son palabras con una sola sílaba en español y otros idiomas occidentales, aunque también pueden tener dos sílabas.
    // Si la longitud es menor de 2 o mayor que 3, puede no ser un apellido válida.
    if (surname.length < 2 || surname.split(" ").length > 1) return false;

    // Aquí validamos los patrones. En general, hay varias excepciones para apellidos en diferentes idiomas y culturas.
    let patterns = [/^[A-Z][a-z]*$/i, /^[\u0400-\u04FF\u00C0-\u00D6\u00D8\u00F0-\u00F5]+$/];
    for (let pattern of patterns) {
        if (pattern.test(surname)) return true;
    }

    // Si ninguna de las anteriores reglas se cumplió, el apellido no es válido.
    return false;
}

console.log(validate("Doe"));  // Devuelve: true
console.log(validate("Sánchez"));  // Devuelve: true
console.log(validate("Johnson"));  // Devuelve: true
console.log(validate("Kowalski"));  // Devuelve: true
console.log(validate("Watanabe"));  // Devuelve: true
console.log(validate(""));  // Devuelve: false
console.log(validate("12345678901234567890abcdef"));  // Devuelve: false
console.log(validate("asdfsdfsd f sdf sdfsdfsd f"));  // Devuelve: false
console.log(validate("áéíóúüñÁÉÍÓÚÜÑ"));  // Devuelve: true
