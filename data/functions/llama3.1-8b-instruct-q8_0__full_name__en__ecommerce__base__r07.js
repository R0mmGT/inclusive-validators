function validate(fullName) {
    // Split the string into individual words
    let words = fullName.split(' ');
    
    // Check if the input string was split into at least two parts (a first name and a last name)
    if (words.length < 2) {
        return false;
    }
    
    // Iterate over each word in the input string
    for (let word of words) {
        // Check if any character in the word is not either an alphabetic letter or a whitespace
        if (!/^[a-zA-Z\s]+$/.test(word)) {
            return false;
        }
        
        // Check if any word contains only one alphanumeric character and it's less than 2 characters long (e.g. 'A' or './.')
        if (/^\S$/.test(word) && word.length < 2) {
            return false;
        }
    }
    
    // Check if the last element is not a surname
    if (!fullName.endsWith(words[words.length-1])) {
        return false;
    }
    
    // If none of the conditions above are met, it's a valid full name
    return true;
}

console.log(validate("John Doe"));  // Expected output: true
console.log(validate("Jane Smith123"));  // Expected output: false
console.log(validate("   Hello World!  "));  // Expected output: true
console.log(validate("Not Valid"));  // Expected output: false
