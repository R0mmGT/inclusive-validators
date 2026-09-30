function validate(name) {
    // Check if the input is null or undefined.
    if (name === null || name === undefined) {
        return false;
    }

    // Check if the string is empty or contains any non-alphabetic characters.
    return /^[a-zA-Z\s]+$/.test(name);
}

console.log(validate("Smith"));  // should print: true
console.log(validate("Smith Jr."));  // should print: false
