function validate(s) {
    // The string should contain at least 1 and no more than 20 characters.
    if (!(1 <= s.length && s.length <= 20)) {
        return false;
    }
    
    // Check for the presence of any non-alphabetic character (except the apostrophe).
    for (let i = 0; i < s.length; i++) {
        let c = s[i];
        if ((c < 'a' || c > 'z') && (c != "'")) {
            return false;
        }
    }
    
    // No apostrophes inside the name.
    if (s.indexOf("'") !== -1) {
        return false;
    }
    
    return true;
}
