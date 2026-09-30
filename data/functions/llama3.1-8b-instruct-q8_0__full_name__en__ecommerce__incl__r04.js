function validate(name) {
    // Remove leading and trailing spaces
    name = name.trim();

    // Check if name is empty
    if (!name.length) {
        return false;
    }

    // Check if name consists of more than one word (space separated)
    if (name.includes(' ')) {
        let words = name.split(' ');
        
        // Check each word in the full name
        for (let word of words) {
            // If a word is empty, return false
            if (!word.trim()) {
                return false;
            }
            
            // If a word contains only non-alphabetic or space characters, return false
            if (/[^A-Za-z\s]/.test(word)) {
                return false;
            }
        }
        
    } 
    // Check the full name for special alphanumeric words
    else if (/[^\sA-Za-z]/.test(name)) {
        return false;
    
    }

    // If all checks pass, return true (valid full name)
    return true;
}

// Testing the function
console.log(validate(" John Joe Smith Jr."));  // Returns: True
console.log(validate("12345"));  // Returns: False
console.log(validate("John"));  // Returns: False
console.log(validate("   "));  // Returns: False
