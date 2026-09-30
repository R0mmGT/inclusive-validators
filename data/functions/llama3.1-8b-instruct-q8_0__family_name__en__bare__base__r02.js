function validate(lastName) {
    // Use regular expression to match the given pattern. The pattern should include:
    // - At least 2 alphanumeric characters (but the first character can be either alphabets or special characters like dots, hyphens).
    // - Allow optional dot, dash and apostrophe.
    let regex = /^[a-zA-Z\.\'\-\s]{1}[a-zA-Z0-9\.\'\-]{2,}$/;
    
    return regex.test(lastName);
}

console.log(validate('Smith'));  // true
console.log(validate('John-Smith'));  // true
console.log(validate('.Doe.'));  // true
console.log(validate('--'));  // false
console.log(validate('?e?n'));  // true
console.log(validate('S-mith-Smith'));  // true

