function validate(name) {
    // Basic check for emptiness
    if (!name.trim()) return false;

    // Split the name into parts
    let nameParts = name.split(' ');

    // Check if there are at least two parts
    if (nameParts.length < 2) return false;

    // Check each part of the name
    for (let part of nameParts) {
        // Check if it contains only alphabetic characters or spaces
        let valid = /^[a-zA-Z\s]+$/.test(part);
        
        // If not, return false
        if (!valid) return false;
    
        // Remove any leading or trailing whitespace from the part
        part = part.trim();
    
        // If the part is empty after removing whitespace, it's invalid
        if (part.length === 0) return false;
    }

    // If all checks pass, return true
    return true;
}

console.log(validate("John Doe"));  // Expected: true
console.log(validate(" Jane Smith"));  // Expected: false (leading space in the name)
console.log(validate("Jane ));  // Expected: false (trailing non-alphabetic character)
