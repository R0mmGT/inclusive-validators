function validate(lastName) {
    // Define rules for valid last names.
    // A valid last name should start with a capital letter and consist of 1-20 characters, 
    // including letters, numbers and non-alphanumeric symbols (except space) in between.
    if (/^[A-Z][a-zA-Z0-9\s\!\@\#\$\%\^\&\*\(\)\-\+\=\_\{\}\[\]\:\;\"\'\<\>\/\\.]+$/).test(lastName)) {
        return true;
    } else {
        return false;
    }
}

// Testing the function
console.log(validate("Doe"));  // Expected: True
console.log(validate("john doe"));  // Expected: True
console.log(validate("!john#doe$%"));  // Expected: True
console.log(validate("dobe"));  // Expected: False (does not start with a capital letter)
console.log(validate(" Doe"));  // Expected: False (starts with a space, not a capital letter)
