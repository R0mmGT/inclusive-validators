function validate(name) {
    // We'll check if the name is at least 2 characters long.
    if (name.length < 2) return false;

    // We'll assume that a valid first name only contains letters and spaces.
    for (let char of name) {
        if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char == ' ')) {
            return false;
        }
    }

    // We'll assume that a valid first name doesn't contain consecutive spaces.
    for (let i = 0; i < name.length - 1; i++) {
        if (name[i] == ' ' && name[i+1] == ' ') return false;
    }

    // If we haven't returned False by now, it means the name is a valid first name.
    return true;
}

console.log(validate("John Smith"));  // Expected output: true
console.log(validate("S"));          // Expected output: false
console.log(validate("John"));       // Expected output: true
