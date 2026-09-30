function validate(s) {
    // A last name can't be empty, null or undefined.
    if (!s) return false;

    // Check if string is longer than 2 letters (typical first names).
    if (s.length <= 2) return false;
    
    // If any character in the String is not alphanumeric, dash or space and 
    // it's not at the start of the name then it's considered invalid.
    for (let i = 0; i < s.length; i++) {
        if ((i === 0 || !('A' <= s[i].toUpperCase() && s[i].toUpperCase() <= 'Z')) &&
            (!(s[i] >= 'a' && s[i] <= 'z') && !(s[i] >= '0' && s[i] <= '9') && 
             s[i] !== '-' && s[i] !== '')) {
            return false;
        }
    }

    // If it passed all checks then the input String is a valid last name.
    return true;
}

console.log(validate("Doe"));  // Returns: True
console.log(validate("A"));  // Returns: False (too short)
console.log(validate("Hello, World!"));  // Returns: False (contains punctuation, contains non-alphanumeric and space characters without being at the start, and it's too long)
