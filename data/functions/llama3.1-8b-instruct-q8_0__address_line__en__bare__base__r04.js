function validate(s) {
    // Check if input is null or undefined.
    if (s === null || s === undefined) {
        return false;
    }

    // The street address does not have to be numeric, but it must start with a numeric value followed by letters and/or spaces. It can also have symbols such as dash, dot, etc 
    let firstChar = s[0];
    
    if (!firstChar.match(/^[0-9]$/i)) {
        return false;
    }
    for (let char of s.trim()) {
        // Check if character is a letter or a number
        if (!(char.match(/[a-zA-Z]/) || char.match(/[0-9]/))) { 
            return false;   
        }
    
    }

    // Split the string into substrings with multiple spaces in between using split function
    let sSplit = s.split('  ');
    
    // Since the street address may be provided with extra spaces for readability, if there is only one substring (i.e., no extra spaces), return true 
    return sSplit.length === 1;
}
