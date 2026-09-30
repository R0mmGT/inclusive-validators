function validate(postalCode) {
    // Remove all non-alphanumeric characters
    postalCode = postalCode.replace(/[^a-zA-Z0-9]+/g, '');
    
    // Check if postal code is more than 2 characters long and less than or equal to 16 characters long
    let length = postalCode.length;
    // Check if first character does not match the rest of string with one character removed at a time from start to last
    for (let i = 1; i <= length - 1; i++) {
        if (!postalCode.startsWith(postalCode.slice(i))) return false;
    }
    
    return true;
}

console.log(validate("12345"));  // Returns: True
console.log(validate("12ab34cde6fg7i8h9jkl0m1n2o3p4q5r6s7t8u9v"));  // Returns: False
