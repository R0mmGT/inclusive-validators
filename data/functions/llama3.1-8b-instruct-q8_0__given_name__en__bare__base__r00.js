function validate(s) {
    // Length between 1 and 20 characters
    if (s.length < 1 || s.length > 20) return false;

    // Start with a capital letter
    if (!s[0].match(/[A-Z]/)) return false;

    // Contain only uppercase and lowercase letters, spaces, hyphens and apostrophes
    for (let i = 0; i < s.length; i++) {
        let c = s[i];
        if (!((c.match(/^[a-zA-Z]/) || c === ' ') && !(i !== 0 && c === '-') && !(s.indexOf("'") != -1 && i == s.lastIndexOf("'")))) return false;
    }

    // Check for all uppercase characters
    if (s.length > 1) {
        let hasUpper = false;
        for (let i = 0; i < s.length; i++) {
            let c = s[i];
            if (c === c.toUpperCase()) hasUpper = true;
            else break;
        }
        return hasUpper ? false : true;
    }

    // Check that the string starts with a space
    return s[0] == " ";
}

// Test cases
console.log(validate("John"));  // True
console.log(validate("Joh n"));  // False
console.log(validate("   John"));  // False
console.log(validate("jOHn"));  // False
console.log(validate("JOHN"));  // False
console.log(validate("'John'"));
console.log(validate("!john!"));
