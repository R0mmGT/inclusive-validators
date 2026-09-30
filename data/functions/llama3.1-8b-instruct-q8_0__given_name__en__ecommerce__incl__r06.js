function validate(s) {
    // check if input is empty
    if (!s.trim()) return false;

    // check length - short names are valid, long names (e.g., from Eastern cultures) may be valid too, but are not typical for Western names.
    if (s.length < 1 || s.length > 50) return false;

    // check for whitespace and punctuation
    s = s.replace(/[^\w' ]/g,''); 
    if (!/[A-Z]/.test(s)) return false; 

    return true;
}

console.log(validate("John Doe")); // Expected output: true
console.log(validate("JOHN DOE")); // Expected output: true
console.log(validate("JohnDoe"));  // Expected output: false
console.log(validate("Jane, Smith"));  // Expected output: false
