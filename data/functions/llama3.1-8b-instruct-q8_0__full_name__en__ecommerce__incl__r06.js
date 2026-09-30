function validate(fullName) {
    // Empty string is not a valid full name
    if (fullName.length === 0) return false;

    // Check if input contains at least two and no more than three words
    let words = fullName.split(' ');
    
    // Only non-empty strings are allowed as words in the full name
    for (let word of words) {
        if (!word.trim()) return false;
    }
    
    // The first word should start with a capital letter and at least two characters long
    if (words[0] && !/^[A-Z]/.test(words[0]) || words[0].length < 2) return false;

    // All other words must begin with uppercase letters too.
    for (let i = 1; i < words.length; ++i) {
        if (!/[A-Z]/.test(words[i])) return false;
    }
 
    return true;
}
