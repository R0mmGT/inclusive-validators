function validate(fullName) {
    // Define regular expressions for common name patterns
   let firstNamePattern = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
   let lastNamePattern = /^[a-zA-Z]+/;

    // Check if the input string matches any of the defined name patterns
    return firstNamePattern.exec(fullName) && (fullName.split(' ').length >= 2 ? lastNamePattern.test(fullName.split(' ')[1]) : false);
}

// Test the function with some examples
console.log(validate('John Peter Doe')); // Expected output: true
console.log(validate('Jane'));           // Expected output: true
console.log(validate('123 John Doe'));   // Expected output: false
console.log(validate('Jane Doe 2'));     // Expected output: false
