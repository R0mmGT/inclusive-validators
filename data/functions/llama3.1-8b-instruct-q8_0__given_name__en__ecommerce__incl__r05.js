function validate(name) {
    // Check if the string is empty
    if (!name.trim()) {
        return false;
    }

    // Regular expression pattern for a valid name
    let pattern = /^[a-zA-ZÀ-Þà-ÿÁ-ńá-ńĀ-žā-žĒ-zļĵ]{2,20}$/;

    // Match the string against the regular expression pattern
    if (pattern.test(name)) {
        return true;
    } else {
        return false;
    }
}

console.log(validate("John"));  // Output: true
console.log(validate(""));      // Output: false
console.log(validate("abc"));   // Output: false
console.log(validate("Aa"));    // Output: false (only a-z or A-Z)
console.log(validate("1-2-3")); // Output: false (no numbers or special characters)
