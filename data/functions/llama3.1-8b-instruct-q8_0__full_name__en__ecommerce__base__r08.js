function validate(fullName) {
    // A valid name should consist of at least 2 words.
    let parts = fullName.trim().split(/\s+/);
    
    if (parts.length < 2) return false;
    
    for (let part of parts) {
        // Remove any leading or trailing punctuation marks
        let cleanPart = part.replace(/^[.,!?;:"' ]+|['",.;!?']+$/g, '');
        
        // Check the validity of the word based on its length and characters.
        if (cleanPart.length < 1 || cleanPart.length > 20) return false;
        for (let char of cleanPart.toLowerCase()) {
            if (!('abcdefghijklmnopqrstuvwxyz'.includes(char))) return false;
        }
    }

    // If none of the above conditions are true, then it is a valid full name.
    return true;
}

console.log(validate("John John"));  // Returns: False
console.log(validate("James, Smith"));  // Returns: True
