function validate(lastName) {
    // Remove leading/trailing spaces
    lastName = lastName.trim();
    
    // Check if last name is empty
    if (!lastName.length) {
        return false;
    }
    
    // Special characters (,.-_ ' are allowed)
    let specialChars = [...',.-_', "'"];
    
    // ASCII codes for non-English letters
    let nonEnglish = [192, 193, 194, 195, 196, 197, 198, 199, 200,
              202, 203, 204, 205, 206, 207, 210,
              211, 212, 213, 214, 216, 217, 218,
             222, 224, 226, 228, 230, 231, 232,
             233, 234, 235, 236, 237, 238, 239];
    
    // Last name should have at least two characters and a maximum of 50
    if (lastName.length < 2 || lastName.length > 50) {
        return false;
    }
    
    for (let char of lastName) {
        
        // Allow English letters
        let asciiCode = char.charCodeAt(0);
        if ((asciiCode >= 65 && asciiCode <= 90) || (asciiCode >= 97 && asciiCode <= 122)) {
            continue;
            
        // Allow digits and special characters if last character is not all caps.
        } else if ((char.match(/^[0-9]$/) !== null || specialChars.includes(char)) &&
                   !lastName.endsWith(lastName.toUpperCase())) {
            continue;
            
        // Non-English chars are allowed for last names but not from some European cultures
        } else if (nonEnglish.includes(asciiCode)) {
            continue;
            
        // If none of the above conditions are met, it's invalid
        } else {
            return false;
        }
    }
    
    // Last name looks good!
    return true;
}
