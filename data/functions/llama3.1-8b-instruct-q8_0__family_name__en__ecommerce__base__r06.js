function validate(lastName) {
    let validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' -";
    
    if (typeof lastName !== 'string') return false;
    
    for (let char of lastName) {
        if (!validChars.includes(char)) {
            return false;
        }
    }
        
    if (lastName.length < 2 || lastName.length > 50) {
        return false;
    }
        
    let hasApostrophe = false;
    let consecutiveWhitespaceOrDash = false;
    
    for (let i = 0; i < lastName.length - 1; i++) {
        const currentChar = lastName[i];
        const nextChar = lastName[i + 1];
        
        if (!([' ', '-'].includes(currentChar) && ![' ', '-'].includes(nextChar))) {
            hasApostrophe = hasApostrophe || (currentChar === "'" && nextChar !== " ");
            consecutiveWhitespaceOrDash = consecutiveWhitespaceOrDash || [' ', '-'].includes(currentChar) && [' ', '-'].includes(nextChar);
        }
    }
            
    return !hasApostrophe && !consecutiveWhitespaceOrDash;
}
