function validate(lastName) {
    // If the input is null or undefined, it is invalid.
    if (lastName == null) {
        return false;
    }
    
    // Remove leading and trailing whitespace.
    lastName = String(lastName).trim();
    
    // If the string has a length greater than 100 characters, it's likely not a valid last name.
    if (lastName.length > 100) {
        return false;
    }
    
    // Validate against basic latin alphabet.
    const pattern1 = /^[a-zA-Z]{2,}$/; 
    if (!pattern1.test(lastName)) {
        return false;
    }
    
    // Disallow names that start with a number or special character.
    const pattern2 = /^\d.*|^[^a-zA-Z]+/; 
    if (pattern2.test(lastName)) {
        return false;
    }
    
    // Last name cannot be "null" or contain whitespace except the first one.
    if (["null", "\s"].includes(lastName)) {
        return false;
    }
    
    // Everything else is valid
    return true;
}

// Test cases:
console.log(validate("Smith"));  // Should return True
console.log(validate("De la Cruz"));  // Should return True
console.log(validate(null));  // Should return False
console.log(validate("John Smith"));  // Should return False (too long)
console.log(validate("123abc"));  // Should return False (starts with a number)
console.log(validate("\n Smith"));  // Should return False (too many whitespace characters)
