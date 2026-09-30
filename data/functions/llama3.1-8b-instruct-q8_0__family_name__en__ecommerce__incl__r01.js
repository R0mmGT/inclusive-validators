function validate(lastName) {
    // First, we check if the input is empty or null.
    if (!lastName) return false;
    
    // Then, we remove non-alphanumeric characters from the first and last name.
    lastName = lastName.replace(/[^a-zA-Z0-9]/g, '');
    
    // Now, we split the string into words.
    let words = lastName.split(' ');
    
    // A valid last name can have several forms: 'Single last name', 
    // 'Double barreled last names' like 'Smith Johnson', or a combination. 
    if (words.length > 2) return false;  // More than two words is not allowed.
    
    // Remove single letters
    for (let i = 0; i < words.length; i++) {
        if (words[i].length <= 1) return false;
    }
    
    // First word has to be 'Single last name' but we don't need to check it since we removed non-alphanumeric characters above.
    // Now, the second part can start with a capital letter and the rest of letters can be any (lower or upper case).
    for (let i = 1; i < words.length; i++) {
        if (!words[i].slice(0, 1).match(/[A-Z]/)) return false;
        
        // Now check that the rest of the letters in the word are not non-alphabetic and that they can be any upper/lower case.
        for (let j = 1; j < words[i].length; j++) {
            if (!words[i].slice(j).match(/[a-zA-Z]/)) return false;
        }
    }
    
    // Now, the function returns true, i.e., we are certain that the input is a valid last name.
    return true;
}
