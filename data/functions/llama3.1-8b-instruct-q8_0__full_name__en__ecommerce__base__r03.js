function validate(fullName) {
    // Check if the full name is empty or null
    if (fullName === "" || fullName === null) return false;

    let names = fullName.split(" ");

    // A valid full name should have at least two parts: first and last name.
    if (names.length < 2) return false;

    // Check each part of the full name to see if it contains only letters
    for (let name of names) {
        let hasNonLetter = false;
        for (let char of name) {
            if (!char.match(/[a-zA-Z]/)) {
                hasNonLetter = true;
                break;
            }
        }

        // If any part has a non-letter character, return False
        if (hasNonLetter) return false;
    }

    return true;
}

console.log(validate("John Doe"));  // Expected output: true
console.log(validate("Jane Doe Jr."));  // Expected output: false
console.log(validate(""));      // Expected output: false
console.log(validate(null));   // Expected output: false
