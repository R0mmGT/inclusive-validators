function validate(fullName) {
    // split the string into names
    let names = fullName.split(" ");
    
    // check if there is at least one first name and one last name
    if (names.length < 2) {
        return false;
    }
    
    // check each name for any non-alphabetic characters
    for (let i of names) {
        // Check for alphabets only, ignore case sensitivity
        if (/[^a-zA-Z]/.test(i)) {
            return false;
        }
        
        // check if the name is too long or too short
        if (!(1 <= i.length && i.length <= 20)) {
            return false;
        }
    }
    
    // If everything checks out, it's a valid full name
    return true;
}

console.log(validate("John Doe"));  // True
console.log(validate("John  Doe"));  // False
console.log(validate("JohnDoe"));   // False
console.log(validate("12345 John Doe"));   // False
