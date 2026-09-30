function validate(lastName) {
    // Define a regular expression pattern for valid last name
    let pattern = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
    
    // Check if the input matches the pattern
    return Boolean(lastName.match(pattern));
}

console.log(validate("Doe"));  // true
console.log(validate("DoeSmith"));  // true
console.log(validate("!@#"));  // false
console.log(validate("@#$"));  // false
